import { describe, expect, it } from "vitest";
import { icmEquity, icmPlacementMatrix, simulateIcmPlacementMatrix } from "./lib/icm";

const STACKS = [5000, 3000, 2000]; // A, B, C — total 10,000
const PAYOUTS = [600, 300, 100]; // 1st, 2nd, 3rd — total prize pool $1,000

describe("week 10: ICM placement matrix — closed form", () => {
  const matrix = icmPlacementMatrix(STACKS);

  it("1st-place probabilities equal chip share (the one place ICM agrees with the naive model)", () => {
    expect(matrix[0][0]).toBeCloseTo(0.5, 6);
    expect(matrix[1][0]).toBeCloseTo(0.3, 6);
    expect(matrix[2][0]).toBeCloseTo(0.2, 6);
  });

  it("matches the hand-derived placement probabilities for 2nd and 3rd", () => {
    expect(matrix[0][1]).toBeCloseTo(0.339286, 5);
    expect(matrix[0][2]).toBeCloseTo(0.160714, 5);
    expect(matrix[1][1]).toBeCloseTo(0.375, 5);
    expect(matrix[1][2]).toBeCloseTo(0.325, 5);
    expect(matrix[2][1]).toBeCloseTo(0.285714, 5);
    expect(matrix[2][2]).toBeCloseTo(0.514286, 5);
  });

  it("every player's placement probabilities sum to 1", () => {
    for (const row of matrix) {
      expect(row.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 9);
    }
  });

  it("every place is assigned to exactly one player in expectation (columns sum to 1 too)", () => {
    for (let k = 0; k < 3; k++) {
      const col = matrix.reduce((sum, row) => sum + row[k], 0);
      expect(col).toBeCloseTo(1, 9);
    }
  });
});

describe("week 10: ICM placement matrix — independent Monte Carlo check", () => {
  it("simulated placement frequencies match the closed form within sampling error", () => {
    const closed = icmPlacementMatrix(STACKS);
    const simulated = simulateIcmPlacementMatrix(STACKS, 200_000, 11);
    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) {
        expect(simulated[i][k]).toBeCloseTo(closed[i][k], 2);
      }
    }
  }, 20_000);
});

describe("week 10: ICM $EV vs the naive chip-share model", () => {
  const equity = icmEquity(STACKS, PAYOUTS);

  it("ICM equity sums to the full prize pool", () => {
    expect(equity.reduce((a, b) => a + b, 0)).toBeCloseTo(1000, 6);
  });

  it("matches the hand-derived flagship figures", () => {
    expect(equity[0]).toBeCloseTo(417.857, 2);
    expect(equity[1]).toBeCloseTo(325.0, 2);
    expect(equity[2]).toBeCloseTo(257.143, 2);
  });

  it("diverges from the naive chip-proportional split, in the direction ICM theory predicts", () => {
    const totalChips = STACKS.reduce((a, b) => a + b, 0);
    const totalPrize = PAYOUTS.reduce((a, b) => a + b, 0);
    const naive = STACKS.map((s) => (s / totalChips) * totalPrize);

    expect(naive).toEqual([500, 300, 200]);
    // chip leader's real $EV is worth LESS than its chip share
    expect(equity[0]).toBeLessThan(naive[0]);
    // the short stack's real $EV is worth MORE than its chip share
    expect(equity[2]).toBeGreaterThan(naive[2]);
    expect(equity[0] - naive[0]).toBeCloseTo(-82.14, 1);
    expect(equity[2] - naive[2]).toBeCloseTo(57.14, 1);
  });
});

describe("week 10: ICM sanity checks independent of the recursive algorithm's correctness", () => {
  it("equal stacks split every payout equally, by symmetry", () => {
    const equalStacks = [1000, 1000, 1000];
    const payouts = [500, 300, 200];
    const equity = icmEquity(equalStacks, payouts);
    const expected = payouts.reduce((a, b) => a + b, 0) / 3;
    for (const e of equity) expect(e).toBeCloseTo(expected, 6);
  });

  it("2-player ICM reduces to the direct linear formula", () => {
    const stacks = [7000, 3000];
    const payouts = [800, 200];
    const equity = icmEquity(stacks, payouts);
    const pFirstA = stacks[0] / (stacks[0] + stacks[1]);
    const directA = pFirstA * payouts[0] + (1 - pFirstA) * payouts[1];
    const directB = (1 - pFirstA) * payouts[0] + pFirstA * payouts[1];
    expect(equity[0]).toBeCloseTo(directA, 6);
    expect(equity[1]).toBeCloseTo(directB, 6);
  });
});
