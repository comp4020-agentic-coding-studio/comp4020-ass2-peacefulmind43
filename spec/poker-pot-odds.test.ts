import { describe, expect, it } from "vitest";
import { RANK_NAMES, hypergeometricAtLeastOne, rankOf, suitOf } from "./lib/poker";

// Our own suit labelling for readability in this file — poker.ts assigns no
// semantics to suit identity beyond "same number = same suit."
const SUITS = ["s", "h", "d", "c"] as const;
type Suit = (typeof SUITS)[number];

function card(rank: (typeof RANK_NAMES)[number], suit: Suit): number {
  const rankIndex = RANK_NAMES.indexOf(rank);
  return rankIndex * 4 + SUITS.indexOf(suit);
}

/** Count deck cards, excluding `known`, matching a (rank, suit) predicate. */
function countUnseenMatching(
  known: number[],
  predicate: (rank: number, suit: number) => boolean,
): number {
  const knownSet = new Set(known);
  let count = 0;
  for (let c = 0; c < 52; c++) {
    if (knownSet.has(c)) continue;
    if (predicate(rankOf(c), suitOf(c))) count++;
  }
  return count;
}

// Exact integer nCr, independent of hypergeometricAtLeastOne's own log-based
// implementation — small n here, so plain integer arithmetic is exact.
function nCr(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let num = 1;
  let den = 1;
  for (let i = 0; i < k; i++) {
    num *= n - i;
    den *= i + 1;
  }
  return num / den;
}

describe("week 3: outs counting by draw type", () => {
  it("counts the flagship nut-flush draw as 9 outs", () => {
    const known = [
      card("A", "s"), card("K", "s"), // hero
      card("5", "s"), card("9", "s"), card("2", "h"), card("Q", "d"), // board
    ];
    const outs = countUnseenMatching(known, (_r, s) => s === SUITS.indexOf("s"));
    expect(outs).toBe(9);
  });

  it("counts a gutshot straight draw as 4 outs", () => {
    const known = [
      card("Q", "c"), card("J", "d"),
      card("9", "h"), card("8", "s"), card("2", "c"),
    ];
    const outs = countUnseenMatching(known, (r) => r === 10); // Ten
    expect(outs).toBe(4);
  });

  it("counts an open-ended straight draw as 8 outs", () => {
    const known = [
      card("9", "d"), card("8", "c"),
      card("7", "s"), card("6", "h"), card("2", "d"),
    ];
    const outs = countUnseenMatching(known, (r) => r === 5 || r === 10); // 5 or Ten
    expect(outs).toBe(8);
  });

  it("counts a combo (flush + open-ended) draw as 15 outs, not 17", () => {
    const known = [
      card("J", "s"), card("10", "s"),
      card("9", "s"), card("8", "h"), card("2", "s"),
    ];
    const spadeIdx = SUITS.indexOf("s");
    const outs = countUnseenMatching(
      known,
      (r, s) => s === spadeIdx || r === 12 /* Queen */ || r === 7,
    );
    expect(outs).toBe(15);
    // the naive sum double-counts the Q-of-spades and 7-of-spades outs
    const flushOuts = countUnseenMatching(known, (_r, s) => s === spadeIdx);
    const straightOuts = countUnseenMatching(known, (r) => r === 12 || r === 7);
    expect(flushOuts + straightOuts).toBe(17);
  });
});

describe("week 3: the card-removal miscount", () => {
  const known = [
    card("A", "s"), card("K", "s"),
    card("5", "s"), card("9", "s"), card("2", "h"), card("Q", "d"),
  ];

  it("the naive board-only count (13 minus board spades) gives 11", () => {
    const boardSpades = 2; // 5s and 9s
    expect(13 - boardSpades).toBe(11);
  });

  it("the correct count, removing hero's own spades too, gives 9", () => {
    const outs = countUnseenMatching(known, (_r, s) => s === SUITS.indexOf("s"));
    expect(outs).toBe(9);
  });
});

describe("week 3: exact hypergeometric equity vs the rule of 4 and 2", () => {
  it("9 outs, one card to come: exact 9/46, rule of 2 underestimates by ~1.6pp", () => {
    const unseen = 46;
    const outs = 9;
    const exact = 1 - nCr(unseen - outs, 1) / nCr(unseen, 1);
    expect(exact).toBeCloseTo(9 / 46, 10);
    expect(hypergeometricAtLeastOne(outs, unseen, 1)).toBeCloseTo(exact, 10);

    const ruleOfTwo = outs * 2;
    const errorPp = exact * 100 - ruleOfTwo;
    expect(exact * 100).toBeCloseTo(19.6, 1);
    expect(errorPp).toBeCloseTo(1.57, 1);
  });

  it("9 outs, two cards to come: exact ~35.0%, rule of 4 overestimates by ~1.0pp", () => {
    const unseen = 47;
    const outs = 9;
    const exact = 1 - nCr(unseen - outs, 2) / nCr(unseen, 2);
    expect(hypergeometricAtLeastOne(outs, unseen, 2)).toBeCloseTo(exact, 10);

    const ruleOfFour = outs * 4;
    const errorPp = ruleOfFour - exact * 100;
    expect(exact * 100).toBeCloseTo(35.0, 1);
    expect(errorPp).toBeCloseTo(1.0, 1);
  });

  it("15 outs, two cards to come: exact ~54.1%, rule of 4 overestimates by ~5.9pp — a bigger gap than the 9-out case", () => {
    const unseen = 47;
    const outs = 15;
    const exact = 1 - nCr(unseen - outs, 2) / nCr(unseen, 2);
    expect(hypergeometricAtLeastOne(outs, unseen, 2)).toBeCloseTo(exact, 10);

    const ruleOfFour = outs * 4;
    const errorPp = ruleOfFour - exact * 100;
    expect(exact * 100).toBeCloseTo(54.1, 1);
    expect(errorPp).toBeCloseTo(5.9, 1);

    const errorAt9Outs = 4 * 9 - (1 - nCr(47 - 9, 2) / nCr(47, 2)) * 100;
    expect(errorPp).toBeGreaterThan(errorAt9Outs);
  });

  it("the naive 11-out miscount overestimates the correct 9-out equity by ~4.3pp", () => {
    const unseen = 46;
    const correctEquity = (1 - nCr(unseen - 9, 1) / nCr(unseen, 1)) * 100;
    const naiveEquity = (1 - nCr(unseen - 11, 1) / nCr(unseen, 1)) * 100;
    expect(correctEquity).toBeCloseTo(19.6, 1);
    expect(naiveEquity).toBeCloseTo(23.9, 1);
    expect(naiveEquity - correctEquity).toBeCloseTo(4.3, 1);
  });
});

describe("week 3: pot odds, implied odds, and EV(call) for the flagship hand", () => {
  const equity = 9 / 46; // exact, one card to come
  const pot = 100;
  const call = 50;

  it("requires 33.3% equity to call with no implied odds — a clear fold", () => {
    const requiredEquity = call / (pot + call);
    expect(requiredEquity).toBeCloseTo(1 / 3, 10);
    expect(requiredEquity * 100).toBeCloseTo(33.3, 1);
    expect(equity).toBeLessThan(requiredEquity);
  });

  it("with $60 implied winnings, required equity drops to 23.8% — still a fold", () => {
    const implied = 60;
    const requiredEquity = call / (pot + call + implied);
    expect(requiredEquity * 100).toBeCloseTo(23.8, 1);
    expect(equity).toBeLessThan(requiredEquity);
  });

  it("would need about $106 of implied winnings to make the call break even", () => {
    // solve call / (pot + call + X) = equity for X
    const breakEvenImplied = call / equity - pot - call;
    expect(breakEvenImplied).toBeCloseTo(105.56, 1);
  });

  it("prices the call at -$20.65 in EV, vs -$23.00 using the rule-of-2 estimate", () => {
    const evExact = equity * pot - (1 - equity) * call;
    expect(evExact).toBeCloseTo(-20.65, 1);

    const ruleOfTwoEquity = 0.18;
    const evRuleOfTwo = ruleOfTwoEquity * pot - (1 - ruleOfTwoEquity) * call;
    expect(evRuleOfTwo).toBeCloseTo(-23.0, 1);

    expect(evExact - evRuleOfTwo).toBeCloseTo(2.35, 1);
  });
});
