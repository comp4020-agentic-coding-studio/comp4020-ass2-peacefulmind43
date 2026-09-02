import { describe, expect, it } from "vitest";

type PayoffTable = {
  probState1: number; // probability of state 1; state 2 has probability 1 - probState1
  action1: { state1: number; state2: number };
  action2: { state1: number; state2: number };
};

function blindEv(table: PayoffTable): number {
  const p = table.probState1;
  const ev1 = p * table.action1.state1 + (1 - p) * table.action1.state2;
  const ev2 = p * table.action2.state1 + (1 - p) * table.action2.state2;
  return Math.max(ev1, ev2);
}

function informedEv(table: PayoffTable): number {
  const p = table.probState1;
  const bestInState1 = Math.max(table.action1.state1, table.action2.state1);
  const bestInState2 = Math.max(table.action1.state2, table.action2.state2);
  return p * bestInState1 + (1 - p) * bestInState2;
}

function valueOfInformation(table: PayoffTable): number {
  return informedEv(table) - blindEv(table);
}

describe("week 5: the flagship value-of-information toy example", () => {
  const table: PayoffTable = {
    probState1: 0.6, // "vs Value"
    action1: { state1: -50, state2: 100 }, // Call
    action2: { state1: 0, state2: 0 }, // Fold
  };

  it("the best blind action (call) is worth +$10", () => {
    expect(blindEv(table)).toBeCloseTo(10, 6);
  });

  it("the informed strategy (fold vs value, call vs bluff) is worth $40", () => {
    expect(informedEv(table)).toBeCloseTo(40, 6);
  });

  it("the value of information is $30", () => {
    expect(valueOfInformation(table)).toBeCloseTo(30, 6);
  });
});

describe("week 5: value of information is never negative", () => {
  // Brute-force check over a grid of probabilities and payoffs, independent
  // of the closed-form helpers above — re-derives blind/informed EV inline.
  const payoffGrid = [-100, -50, -10, 0, 10, 50, 100];
  const probs = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];

  it("VoI >= 0 for every table in a grid sweep of payoffs and probabilities", () => {
    for (const p of probs) {
      for (const a1s1 of payoffGrid) {
        for (const a1s2 of payoffGrid) {
          for (const a2s1 of payoffGrid) {
            for (const a2s2 of payoffGrid) {
              const evBlindA1 = p * a1s1 + (1 - p) * a1s2;
              const evBlindA2 = p * a2s1 + (1 - p) * a2s2;
              const blind = Math.max(evBlindA1, evBlindA2);
              const informed =
                p * Math.max(a1s1, a2s1) + (1 - p) * Math.max(a1s2, a2s2);
              expect(informed - blind).toBeGreaterThanOrEqual(-1e-9);
            }
          }
        }
      }
    }
  });
});
