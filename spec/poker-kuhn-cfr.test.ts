import { describe, expect, it } from "vitest";
import { solveKuhnCFR } from "./lib/kuhn-cfr";

// Real, published result (Kuhn, 1950; reproduced at
// https://en.wikipedia.org/wiki/Kuhn_poker): player 1's equilibrium game
// value is exactly -1/18, and the equilibrium is a one-parameter family
// indexed by alpha in [0, 1/3], with a fixed strategy for player 2. These
// tests check the from-scratch CFR solver reproduces that real result
// before trusting the same code on the unpublished R=4 extension below.

describe("week 12: CFR solver reproduces the real, published Kuhn poker equilibrium (R=3)", () => {
  const { gameValueP1, averageStrategy } = solveKuhnCFR(3, 300_000);

  it("game value converges to the cited -1/18", () => {
    expect(gameValueP1).toBeCloseTo(-1 / 18, 3);
  });

  it("player 1 with the lowest card (J) bets with some alpha in [0, 1/3] at the start, and never calls after check-bet", () => {
    const atStart = averageStrategy.get("0|")!;
    const alpha = atStart[1];
    expect(alpha).toBeGreaterThanOrEqual(0);
    expect(alpha).toBeLessThanOrEqual(1 / 3 + 0.02);
    expect(averageStrategy.get("0|pb")![1]).toBeCloseTo(0, 1); // never calls
  });

  it("player 1 with the highest card (K) bets at the start with probability ~= 3*alpha, and always calls when facing a bet", () => {
    const alpha = averageStrategy.get("0|")![1];
    expect(averageStrategy.get("2|")![1]).toBeCloseTo(3 * alpha, 1);
    expect(averageStrategy.get("2|pb")![1]).toBeCloseTo(1, 1); // always calls
  });

  it("player 1 with the middle card (Q) never opens betting, and calls after check-bet with probability ~= 1/3 + alpha", () => {
    const alpha = averageStrategy.get("0|")![1];
    expect(averageStrategy.get("1|")![1]).toBeCloseTo(0, 1);
    expect(averageStrategy.get("1|pb")![1]).toBeCloseTo(1 / 3 + alpha, 1);
  });

  it("player 2's strategy matches the published fixed profile: bluffs J ~1/3, checks Q, always bets/calls K", () => {
    expect(averageStrategy.get("0|p")![1]).toBeCloseTo(1 / 3, 1); // bluffs with J after hero checks
    expect(averageStrategy.get("0|b")![1]).toBeCloseTo(0, 1); // never calls a bet with J
    expect(averageStrategy.get("1|b")![1]).toBeCloseTo(1 / 3, 1); // calls a bet with Q ~1/3
    expect(averageStrategy.get("2|p")![1]).toBeCloseTo(1, 1); // always bets K
    expect(averageStrategy.get("2|b")![1]).toBeCloseTo(1, 1); // always calls K
  }, 20_000);
}, 20_000);

describe("week 12: the same validated solver, applied to a bigger toy game with no published answer (R=4)", () => {
  const { gameValueP1, averageStrategy } = solveKuhnCFR(4, 300_000);

  it("converges to a stable game value", () => {
    expect(gameValueP1).toBeCloseTo(-1 / 24, 3);
  });

  it("the equilibrium is polarized: both extreme ranks bet more at the start than either middle rank", () => {
    const betAtStart = [0, 1, 2, 3].map((card) => averageStrategy.get(`${card}|`)![1]);
    const extremes = Math.min(betAtStart[0], betAtStart[3]);
    const middles = Math.max(betAtStart[1], betAtStart[2]);
    expect(extremes).toBeGreaterThan(middles);
  });

  it("the very lowest and very highest cards still play the same 'never call, always call' extremes as R=3", () => {
    expect(averageStrategy.get("0|pb")![1]).toBeCloseTo(0, 1);
    expect(averageStrategy.get("3|pb")![1]).toBeCloseTo(1, 1);
  });
}, 20_000);
