import { describe, expect, it } from "vitest";
import {
  simulateEquityVsNRandomHands,
  simulateEquityVsRandomHand,
} from "./lib/poker";

const POCKET_TWOS: [number, number] = [0 * 4 + 0, 0 * 4 + 1]; // 2c, 2h

describe("harness: simulateEquityVsNRandomHands specializes correctly", () => {
  it("with numOpponents=1, matches simulateEquityVsRandomHand's equityPct exactly (same seed/trials)", () => {
    const trials = 20_000;
    const seed = 7;
    const single = simulateEquityVsRandomHand(POCKET_TWOS, trials, seed);
    const generalized = simulateEquityVsNRandomHands(POCKET_TWOS, 1, trials, seed);
    expect(generalized.equityPct).toBeCloseTo(single.equityPct, 6);
  }, 20_000);
});

describe("week 9: multi-way equity vs the naive independence shortcut", () => {
  const trials = 300_000;
  const seed = 42;

  it("pocket 2s vs 1 random hand: ~50.4% (week 1's own figure, reproduced)", () => {
    const result = simulateEquityVsRandomHand(POCKET_TWOS, trials, seed);
    expect(result.equityPct).toBeCloseTo(50.4, 1);
  }, 20_000);

  it("pocket 2s vs 2 random hands: simulated ~30.7%, naive square ~25.4% — simulation is higher", () => {
    const oneOpp = simulateEquityVsRandomHand(POCKET_TWOS, trials, seed);
    const twoOpp = simulateEquityVsNRandomHands(POCKET_TWOS, 2, trials, seed);
    const naive = (oneOpp.equityPct / 100) ** 2 * 100;

    expect(twoOpp.equityPct).toBeCloseTo(30.7, 1);
    expect(naive).toBeCloseTo(25.4, 1);
    expect(twoOpp.equityPct).toBeGreaterThan(naive);
    expect(twoOpp.equityPct - naive).toBeCloseTo(5.3, 1);
  }, 20_000);

  it("pocket 2s vs 3 random hands: simulated ~21.8%, naive cube ~12.8% — the gap has grown", () => {
    const oneOpp = simulateEquityVsRandomHand(POCKET_TWOS, trials, seed);
    const twoOpp = simulateEquityVsNRandomHands(POCKET_TWOS, 2, trials, seed);
    const threeOpp = simulateEquityVsNRandomHands(POCKET_TWOS, 3, trials, seed);
    const naiveTwo = (oneOpp.equityPct / 100) ** 2 * 100;
    const naiveThree = (oneOpp.equityPct / 100) ** 3 * 100;

    expect(threeOpp.equityPct).toBeCloseTo(21.8, 1);
    expect(naiveThree).toBeCloseTo(12.8, 1);
    expect(threeOpp.equityPct).toBeGreaterThan(naiveThree);

    const gapTwo = twoOpp.equityPct - naiveTwo;
    const gapThree = threeOpp.equityPct - naiveThree;
    expect(gapThree).toBeGreaterThan(gapTwo);
  }, 20_000);
});
