// A from-scratch vanilla Counterfactual Regret Minimization (CFR) solver for
// Kuhn-poker-family games: R ranks, one card each dealt to two players from
// a shared deck, a single betting round (check/bet, then call/fold on a
// bet), ante 1, bet size 1. R=3 is the standard, published Kuhn poker;
// larger R is a novel extension with no textbook closed form, solved here
// by the same method once that method is checked against the real R=3
// result.

interface Node {
  regretSum: [number, number]; // index 0 = pass/fold, 1 = bet/call
  strategySum: [number, number];
}

function isTerminal(history: string): boolean {
  return (
    history === "pp" ||
    history === "bp" ||
    history === "bb" ||
    history === "pbp" ||
    history === "pbb"
  );
}

/** Player 1's payoff (chips won, positive, or lost, negative) at a terminal history. */
function p1Payoff(history: string, cards: [number, number]): number {
  const higherIsP1 = cards[0] > cards[1];
  switch (history) {
    case "pp":
      return higherIsP1 ? 1 : -1;
    case "bp":
      return 1; // player 2 folded to player 1's bet
    case "bb":
      return higherIsP1 ? 2 : -2;
    case "pbp":
      return -1; // player 1 folded to player 2's bet
    case "pbb":
      return higherIsP1 ? 2 : -2;
    default:
      throw new Error(`not a terminal history: ${history}`);
  }
}

function regretMatchedStrategy(regretSum: [number, number]): [number, number] {
  const pos0 = Math.max(regretSum[0], 0);
  const pos1 = Math.max(regretSum[1], 0);
  const norm = pos0 + pos1;
  if (norm > 0) return [pos0 / norm, pos1 / norm];
  return [0.5, 0.5];
}

export interface KuhnSolution {
  gameValueP1: number;
  averageStrategy: Map<string, [number, number]>; // infoset key -> [P(pass/fold), P(bet/call)]
}

/**
 * Solve the R-rank Kuhn-poker-family game via vanilla CFR: `iterations` full
 * passes over every equally-likely ordered (player1Card, player2Card) deal,
 * deterministic (no RNG — the deck is small enough to enumerate exactly).
 */
export function solveKuhnCFR(numRanks: number, iterations: number): KuhnSolution {
  const nodes = new Map<string, Node>();
  const deals: [number, number][] = [];
  for (let a = 0; a < numRanks; a++) {
    for (let b = 0; b < numRanks; b++) {
      if (a !== b) deals.push([a, b]);
    }
  }

  function getNode(key: string): Node {
    let node = nodes.get(key);
    if (!node) {
      node = { regretSum: [0, 0], strategySum: [0, 0] };
      nodes.set(key, node);
    }
    return node;
  }

  // Returns player 1's EV from this node under the current (regret-matched) strategies.
  function cfr(cards: [number, number], history: string, reach0: number, reach1: number): number {
    if (isTerminal(history)) return p1Payoff(history, cards);

    const player = history.length % 2; // 0 = player 1 to act, 1 = player 2
    const infoKey = `${cards[player]}|${history}`;
    const node = getNode(infoKey);
    const ownReach = player === 0 ? reach0 : reach1;
    const strategy = regretMatchedStrategy(node.regretSum);
    node.strategySum[0] += ownReach * strategy[0];
    node.strategySum[1] += ownReach * strategy[1];

    const actionUtilP1: [number, number] = [0, 0];
    for (const a of [0, 1] as const) {
      const nextHistory = history + (a === 0 ? "p" : "b");
      const nextReach0 = player === 0 ? reach0 * strategy[a] : reach0;
      const nextReach1 = player === 1 ? reach1 * strategy[a] : reach1;
      actionUtilP1[a] = cfr(cards, nextHistory, nextReach0, nextReach1);
    }
    const nodeValueP1 = strategy[0] * actionUtilP1[0] + strategy[1] * actionUtilP1[1];

    const sign = player === 0 ? 1 : -1; // convert P1 utility to the acting player's own utility
    const opponentReach = player === 0 ? reach1 : reach0;
    node.regretSum[0] += opponentReach * sign * (actionUtilP1[0] - nodeValueP1);
    node.regretSum[1] += opponentReach * sign * (actionUtilP1[1] - nodeValueP1);

    return nodeValueP1;
  }

  for (let t = 0; t < iterations; t++) {
    for (const deal of deals) {
      cfr(deal, "", 1, 1);
    }
  }

  const averageStrategy = new Map<string, [number, number]>();
  for (const [key, node] of nodes) {
    const total = node.strategySum[0] + node.strategySum[1];
    averageStrategy.set(
      key,
      total > 0 ? [node.strategySum[0] / total, node.strategySum[1] / total] : [0.5, 0.5],
    );
  }

  // Re-derive the game value from the converged average strategy alone (a
  // second, independent computation from the CFR loop's own running values).
  function valueUnderAverage(cards: [number, number], history: string): number {
    if (isTerminal(history)) return p1Payoff(history, cards);
    const player = history.length % 2;
    const key = `${cards[player]}|${history}`;
    const strategy = averageStrategy.get(key) ?? [0.5, 0.5];
    return (
      strategy[0] * valueUnderAverage(cards, history + "p") +
      strategy[1] * valueUnderAverage(cards, history + "b")
    );
  }

  const gameValueP1 =
    deals.reduce((sum, deal) => sum + valueUnderAverage(deal, ""), 0) / deals.length;

  return { gameValueP1, averageStrategy };
}
