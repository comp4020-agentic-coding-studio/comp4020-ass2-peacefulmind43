import { describe, expect, it } from "vitest";

describe("week 7: optimal bluff frequency and minimum defense frequency", () => {
  const pot = 100;
  const bet = 50;

  it("optimal bluff frequency x* = bet / (pot + bet) = 33.3%", () => {
    const xStar = bet / (pot + bet);
    expect(xStar * 100).toBeCloseTo(33.3, 1);
  });

  it("minimum defense frequency c* = pot / (pot + bet) = 66.7%", () => {
    const cStar = pot / (pot + bet);
    expect(cStar * 100).toBeCloseTo(66.7, 1);
  });

  it("the two frequencies sum to exactly 1 (two mutually exclusive outcomes)", () => {
    const xStar = bet / (pot + bet);
    const cStar = pot / (pot + bet);
    expect(xStar + cStar).toBeCloseTo(1, 10);
  });

  it("x* has the identical algebraic form as week 3's required-equity formula", () => {
    const requiredEquity = bet / (pot + bet); // week 3: call / (pot + call), call === bet here
    const xStar = bet / (pot + bet);
    expect(xStar).toBeCloseTo(requiredEquity, 10);
  });
});

describe("week 7: independent numeric verification of both indifference points", () => {
  const pot = 100;
  const bet = 50;

  function hero_evCallMinusFold(x: number): number {
    // hero calls with equity x (probability villain is bluffing)
    return x * pot - (1 - x) * bet;
  }

  function villain_evBluffMinusCheck(c: number): number {
    // villain bets as a bluff; hero calls with probability c
    return (1 - c) * pot - c * bet - 0;
  }

  it("EV(call) - EV(fold) crosses zero exactly at x* = 1/3, and is negative below / positive above", () => {
    const xStar = bet / (pot + bet);
    expect(hero_evCallMinusFold(xStar)).toBeCloseTo(0, 6);
    expect(hero_evCallMinusFold(xStar - 0.05)).toBeLessThan(0);
    expect(hero_evCallMinusFold(xStar + 0.05)).toBeGreaterThan(0);
  });

  it("EV(bet-as-bluff) - EV(check) crosses zero exactly at c* = 2/3, and is positive below / negative above", () => {
    const cStar = pot / (pot + bet);
    expect(villain_evBluffMinusCheck(cStar)).toBeCloseTo(0, 6);
    expect(villain_evBluffMinusCheck(cStar - 0.05)).toBeGreaterThan(0);
    expect(villain_evBluffMinusCheck(cStar + 0.05)).toBeLessThan(0);
  });

  it("a fine-grained sweep confirms x* is the unique zero-crossing of hero's indifference curve", () => {
    const xStar = bet / (pot + bet);
    let crossings = 0;
    const steps = 2000;
    for (let i = 0; i < steps; i++) {
      const a = i / steps;
      const b = (i + 1) / steps;
      if (hero_evCallMinusFold(a) <= 0 && hero_evCallMinusFold(b) > 0) crossings++;
    }
    expect(crossings).toBe(1);
    // and that unique crossing is within one sweep-step of the closed form
    expect(Math.round(xStar * steps) / steps).toBeCloseTo(xStar, 3);
  });
});
