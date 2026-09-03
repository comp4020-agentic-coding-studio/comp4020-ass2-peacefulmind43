import { describe, expect, it } from "vitest";
import { growthRate, kellyFraction } from "./lib/kelly";

const P = 0.6;
const B = 1; // even-money bet

describe("week 11: Kelly fraction for a 60%-favorite even-money bet", () => {
  it("f* = 20% of bankroll", () => {
    expect(kellyFraction(P, B)).toBeCloseTo(0.2, 6);
  });

  it("per-bet EV (in units staked) is positive at every f>0, including the ones that hurt growth", () => {
    // EV per unit bet, independent of the log-growth machinery: f*(p*b - q)
    const evPerUnit = (f: number) => f * (P * B - (1 - P));
    expect(evPerUnit(0.2)).toBeGreaterThan(0);
    expect(evPerUnit(0.4)).toBeGreaterThan(0);
    expect(evPerUnit(0.1)).toBeGreaterThan(0);
  });
});

describe("week 11: growth rate at full, half, and double Kelly", () => {
  const fStar = kellyFraction(P, B);

  it("full Kelly (f=0.2): growth ≈ +2.01% per bet", () => {
    expect(growthRate(fStar, P, B)).toBeCloseTo(0.0201355, 6);
  });

  it("half Kelly (f=0.1): growth ≈ +1.50% per bet — positive but lower than full Kelly", () => {
    const g = growthRate(0.1, P, B);
    expect(g).toBeCloseTo(0.0150419, 6);
    expect(g).toBeLessThan(growthRate(fStar, P, B));
  });

  it("double Kelly (f=0.4): growth turns NEGATIVE despite every individual bet still being +EV", () => {
    const g = growthRate(0.4, P, B);
    expect(g).toBeCloseTo(-0.0024469, 6);
    expect(g).toBeLessThan(0);
  });

  it("f=0 (never betting) gives exactly zero growth", () => {
    expect(growthRate(0, P, B)).toBeCloseTo(0, 12);
  });
});

describe("week 11: f* actually maximizes growth rate (verified by a numeric sweep, not just the formula)", () => {
  it("a fine sweep over f in (0,1) peaks within one step of the closed-form f*", () => {
    const fStar = kellyFraction(P, B);
    const step = 0.0005;
    let bestF = 0;
    let bestG = Number.NEGATIVE_INFINITY;
    for (let f = step; f < 1; f += step) {
      const g = growthRate(f, P, B);
      if (g > bestG) {
        bestG = g;
        bestF = f;
      }
    }
    expect(bestF).toBeCloseTo(fStar, 3);
  });

  it("growth strictly decreases moving away from f* in either direction (local max, checked directly)", () => {
    const fStar = kellyFraction(P, B);
    const gStar = growthRate(fStar, P, B);
    expect(growthRate(fStar - 0.05, P, B)).toBeLessThan(gStar);
    expect(growthRate(fStar + 0.05, P, B)).toBeLessThan(gStar);
  });
});
