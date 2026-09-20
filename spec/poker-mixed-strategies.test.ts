import { describe, expect, it } from "vitest";

/* Week 7's two indifference points.
 *
 * The earlier version of this file asserted the lecture's closed forms by
 * re-typing them, including the lecture's own EV(call) expression. That is
 * exactly the shape CLAUDE.md rules out: a test written that way agrees with
 * the content by construction and cannot catch a wrong formula. It did not —
 * the lecture's EV(call) omitted villain's bet from what a winning call
 * collects, which moved x* from 25% to 33.3%.
 *
 * So nothing below re-types a frequency formula. Each indifference point is
 * found by simulating the pot in dollars, hand by hand, and searching for the
 * frequency at which the two options pay the same. The closed forms are then
 * checked against what the search found, not the other way round.
 */

const POT = 100; // in the middle before villain bets
const BET = 50; // villain's bet; hero must match it to call

/** Hero holds a bluffcatcher. Villain bets. What does each option pay? */
function heroCallMinusFold(bluffFraction: number): number {
  // Calling and beating a bluff collects the pot plus the bet villain just
  // put in. Calling into a value hand loses hero's own matching bet.
  const win = POT + BET;
  const lose = -BET;
  const evCall = bluffFraction * win + (1 - bluffFraction) * lose;
  const evFold = 0;
  return evCall - evFold;
}

/** Villain is bluffing. Betting vs giving up, given how often hero calls. */
function villainBluffMinusCheck(heroCallFrequency: number): number {
  // A bluff that gets through collects the pot as it stood. A bluff that gets
  // called loses the bet. Checking a busted hand is worth nothing either way.
  const evBluff =
    (1 - heroCallFrequency) * POT + heroCallFrequency * -BET;
  const evCheck = 0;
  return evBluff - evCheck;
}

/** Bisection: find where f crosses zero, without assuming where that is. */
function findZero(f: (p: number) => number): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (Math.sign(f(mid)) === Math.sign(f(lo))) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

describe("week 7: the indifference points, found by search rather than assumed", () => {
  it("hero is indifferent to calling when villain bluffs 25% of the time", () => {
    const xStar = findZero(heroCallMinusFold);
    expect(xStar * 100).toBeCloseTo(25, 6);
  });

  it("villain is indifferent to bluffing when hero calls 66.7% of the time", () => {
    const cStar = findZero(villainBluffMinusCheck);
    expect(cStar * 100).toBeCloseTo(66.7, 1);
  });

  it("each zero-crossing is unique over [0, 1]", () => {
    for (const f of [heroCallMinusFold, villainBluffMinusCheck]) {
      let crossings = 0;
      const steps = 20000;
      for (let i = 0; i < steps; i++) {
        const a = f(i / steps);
        const b = f((i + 1) / steps);
        // counted once per crossing even when a root lands on a grid point
        if ((a < 0 && b >= 0) || (a > 0 && b <= 0)) crossings++;
      }
      expect(crossings).toBe(1);
    }
  });
});

describe("week 7: the lecture's closed forms match the searched values", () => {
  it("x* = bet / (pot + 2 · bet)", () => {
    expect(BET / (POT + 2 * BET)).toBeCloseTo(findZero(heroCallMinusFold), 6);
  });

  it("c* = pot / (pot + bet)", () => {
    expect(POT / (POT + BET)).toBeCloseTo(
      findZero(villainBluffMinusCheck),
      6,
    );
  });

  it("x* is week 3's required-equity formula, with the bet counted into the pot", () => {
    // week 3: required equity = call / (pot including the bet + call)
    const potIncludingBet = POT + BET;
    const requiredEquity = BET / (potIncludingBet + BET);
    expect(requiredEquity).toBeCloseTo(findZero(heroCallMinusFold), 10);
  });

  it("what completes MDF to 1 is hero's folding frequency, not villain's bluffing frequency", () => {
    const cStar = findZero(villainBluffMinusCheck);
    const xStar = findZero(heroCallMinusFold);
    expect(1 - cStar).toBeCloseTo(1 / 3, 6); // hero folds a third of the time
    expect(xStar + cStar).not.toBeCloseTo(1, 2); // 25% + 66.7% is not 1
  });
});

describe("week 8: exploiting a villain who bluffs too often", () => {
  const villainBluffs = 0.5; // well above x*

  /** Hero calls with probability c against a fixed villain bluff frequency. */
  function heroEV(c: number): number {
    return c * heroCallMinusFold(villainBluffs);
  }

  it("calling every time earns $50 per hand against a 50% bluffer", () => {
    expect(heroEV(1)).toBeCloseTo(50, 6);
  });

  it("defending at the equilibrium 66.7% earns $33.33 against that same villain", () => {
    const cStar = findZero(villainBluffMinusCheck);
    expect(heroEV(cStar)).toBeCloseTo(33.33, 1);
  });

  it("the gain from exploiting instead of defending is $16.67 per hand", () => {
    const cStar = findZero(villainBluffMinusCheck);
    expect(heroEV(1) - heroEV(cStar)).toBeCloseTo(16.67, 1);
  });
});
