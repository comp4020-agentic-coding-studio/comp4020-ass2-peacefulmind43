// Shared poker harness primitives: card/deck representation, a 5-card hand
// evaluator, and a seeded Monte Carlo equity simulator. Content pages state
// numbers computed with this code (or the closed-form helpers below); spec
// tests re-run the same computation to catch drift, not to re-type a number.

export type Card = number; // 0..51, card = rankIndex * 4 + suit, rankIndex 0=2 .. 12=Ace

export const RANK_NAMES = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",
] as const;

export function rankOf(card: Card): number {
  return Math.floor(card / 4) + 2; // 2..14
}

export function suitOf(card: Card): number {
  return card % 4;
}

export function fullDeck(): Card[] {
  const deck: Card[] = [];
  for (let c = 0; c < 52; c++) deck.push(c);
  return deck;
}

export function deckExcluding(...exclude: Card[]): Card[] {
  const excluded = new Set(exclude);
  return fullDeck().filter((c) => !excluded.has(c));
}

// Scratch buffers reused across calls so the hot path (millions of calls in
// a Monte Carlo run) doesn't allocate. Safe because evaluation is
// synchronous and single-threaded.
const rankCount = new Int8Array(15); // index by rank 2..14
const rankBuf = new Int8Array(5);
const suitBuf = new Int8Array(5);
const groupRank = new Int8Array(5);
const groupSize = new Int8Array(5);

/**
 * Score 5 cards (given as a 7-card array plus five indices into it) as a
 * single comparable integer: higher is stronger. Encoding: category (0-8)
 * as the most significant digit, then up to five base-15 tiebreak digits
 * (rank 2..14 fits comfortably in base 15) ordered by group size then rank,
 * as poker hand comparison requires.
 */
export function evaluate5At(
  cards: Card[],
  i0: number,
  i1: number,
  i2: number,
  i3: number,
  i4: number,
): number {
  rankBuf[0] = rankOf(cards[i0]);
  rankBuf[1] = rankOf(cards[i1]);
  rankBuf[2] = rankOf(cards[i2]);
  rankBuf[3] = rankOf(cards[i3]);
  rankBuf[4] = rankOf(cards[i4]);
  suitBuf[0] = suitOf(cards[i0]);
  suitBuf[1] = suitOf(cards[i1]);
  suitBuf[2] = suitOf(cards[i2]);
  suitBuf[3] = suitOf(cards[i3]);
  suitBuf[4] = suitOf(cards[i4]);

  // insertion sort, descending, 5 elements
  for (let i = 1; i < 5; i++) {
    const r = rankBuf[i];
    let j = i - 1;
    while (j >= 0 && rankBuf[j] < r) {
      rankBuf[j + 1] = rankBuf[j];
      j--;
    }
    rankBuf[j + 1] = r;
  }

  const isFlush =
    suitBuf[0] === suitBuf[1] && suitBuf[0] === suitBuf[2] &&
    suitBuf[0] === suitBuf[3] && suitBuf[0] === suitBuf[4];

  rankCount.fill(0);
  for (let i = 0; i < 5; i++) rankCount[rankBuf[i]]++;

  let straightHigh = -1;
  let distinct = 0;
  for (let r = 2; r <= 14; r++) if (rankCount[r] > 0) distinct++;
  if (distinct === 5) {
    if (rankBuf[0] - rankBuf[4] === 4) {
      straightHigh = rankBuf[0];
    } else if (
      rankBuf[0] === 14 && rankBuf[1] === 5 && rankBuf[2] === 4 &&
      rankBuf[3] === 3 && rankBuf[4] === 2
    ) {
      straightHigh = 5; // wheel: A-2-3-4-5, Ace plays low
    }
  }

  // groups sorted by count desc, then rank desc
  let g = 0;
  for (let r = 14; r >= 2; r--) {
    if (rankCount[r] > 0) {
      groupRank[g] = r;
      groupSize[g] = rankCount[r];
      g++;
    }
  }
  // g <= 5; insertion sort by (size desc, rank desc) — already rank-desc by
  // construction, so a stable sort on size alone preserves rank order within ties
  for (let i = 1; i < g; i++) {
    const sz = groupSize[i];
    const rk = groupRank[i];
    let j = i - 1;
    while (j >= 0 && groupSize[j] < sz) {
      groupSize[j + 1] = groupSize[j];
      groupRank[j + 1] = groupRank[j];
      j--;
    }
    groupSize[j + 1] = sz;
    groupRank[j + 1] = rk;
  }

  let category: number;
  if (straightHigh > 0 && isFlush) category = 8;
  else if (groupSize[0] === 4) category = 7;
  else if (groupSize[0] === 3 && groupSize[1] === 2) category = 6;
  else if (isFlush) category = 5;
  else if (straightHigh > 0) category = 4;
  else if (groupSize[0] === 3) category = 3;
  else if (groupSize[0] === 2 && groupSize[1] === 2) category = 2;
  else if (groupSize[0] === 2) category = 1;
  else category = 0;

  let score = category;
  if (category === 8 || category === 4) {
    // straight / straight flush: only the straight's own high card matters
    score = score * 15 + straightHigh;
    for (let k = 0; k < 4; k++) score = score * 15;
  } else if (isFlush && category === 5) {
    for (let i = 0; i < 5; i++) score = score * 15 + rankBuf[i];
  } else {
    for (let i = 0; i < 5; i++) score = score * 15 + (i < g ? groupRank[i] : 0);
  }
  return score;
}

const FIVE_CARD_SUBSETS: [number, number, number, number, number][] = (() => {
  const subsets: [number, number, number, number, number][] = [];
  for (let a = 0; a < 7; a++)
    for (let b = a + 1; b < 7; b++)
      for (let c = b + 1; c < 7; c++)
        for (let d = c + 1; d < 7; d++)
          for (let e = d + 1; e < 7; e++) subsets.push([a, b, c, d, e]);
  return subsets;
})();

/** Best 5-card score obtainable from 7 cards (2 hole + 5 board). */
export function bestOf7(cards: Card[]): number {
  if (cards.length !== 7) throw new Error("bestOf7 expects exactly 7 cards");
  let best = -1;
  for (const [a, b, c, d, e] of FIVE_CARD_SUBSETS) {
    const score = evaluate5At(cards, a, b, c, d, e);
    if (score > best) best = score;
  }
  return best;
}

/** Score a plain 5-card hand (array of exactly 5 cards). Used directly by tests. */
export function evaluate5(cards: Card[]): number {
  if (cards.length !== 5) throw new Error("evaluate5 expects exactly 5 cards");
  return evaluate5At(cards, 0, 1, 2, 3, 4);
}

/** Deterministic 32-bit PRNG (mulberry32) — same seed always gives the same stream. */
export function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface EquityResult {
  winPct: number;
  tiePct: number;
  lossPct: number;
  equityPct: number;
  trials: number;
  seed: number;
}

/**
 * Monte Carlo equity of a fixed hero hand against a uniformly random
 * opponent hand, over `trials` independent random boards. Seeded and
 * deterministic: the same (heroHand, seed, trials) always returns the same
 * result, so re-running this is a genuine independent recomputation, not a
 * restatement of a cached figure.
 */
export function simulateEquityVsRandomHand(
  heroHand: [Card, Card],
  trials: number,
  seed: number,
): EquityResult {
  const rng = mulberry32(seed);
  const deck = deckExcluding(...heroHand);
  const n = deck.length; // 50

  let wins = 0;
  let ties = 0;
  let losses = 0;

  // Scratch 7-card hands, reused every trial: [hole0, hole1, board0..4].
  const heroCards: Card[] = [heroHand[0], heroHand[1], 0, 0, 0, 0, 0];
  const villainCards: Card[] = [0, 0, 0, 0, 0, 0, 0];

  for (let t = 0; t < trials; t++) {
    // Partial Fisher-Yates: randomize the first 7 slots, draw from the full
    // remaining range each trial so every trial samples independently.
    for (let i = 0; i < 7; i++) {
      const j = i + Math.floor(rng() * (n - i));
      const tmp = deck[i];
      deck[i] = deck[j];
      deck[j] = tmp;
    }
    villainCards[0] = deck[0];
    villainCards[1] = deck[1];
    for (let b = 0; b < 5; b++) {
      heroCards[2 + b] = deck[2 + b];
      villainCards[2 + b] = deck[2 + b];
    }

    const heroScore = bestOf7(heroCards);
    const villainScore = bestOf7(villainCards);

    if (heroScore > villainScore) wins++;
    else if (heroScore === villainScore) ties++;
    else losses++;
  }

  const winPct = (100 * wins) / trials;
  const tiePct = (100 * ties) / trials;
  const lossPct = (100 * losses) / trials;
  return {
    winPct,
    tiePct,
    lossPct,
    equityPct: winPct + tiePct / 2,
    trials,
    seed,
  };
}

/** Exact hypergeometric P(at least one of `outs` cards appears in `draws` cards from `unseen` remaining). */
export function hypergeometricAtLeastOne(outs: number, unseen: number, draws: number): number {
  // P(none of the outs) = C(unseen-outs, draws) / C(unseen, draws)
  const logC = (n: number, k: number): number => {
    if (k < 0 || k > n) return Number.NEGATIVE_INFINITY;
    let acc = 0;
    for (let i = 0; i < k; i++) acc += Math.log(n - i) - Math.log(i + 1);
    return acc;
  };
  const pNone = Math.exp(logC(unseen - outs, draws) - logC(unseen, draws));
  return 1 - pNone;
}
