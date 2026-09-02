import { describe, expect, it } from "vitest";
import { simulateEquityVsRandomHand } from "./lib/poker";

// A card is rankIndex*4 + suit, rankIndex 0 = "2" .. 12 = "Ace" (see spec/lib/poker.ts).
const TWO_OF_CLUBS = 0 * 4 + 0;
const TWO_OF_DIAMONDS = 0 * 4 + 1;

describe("week 1: equity of 22 vs a random hand", () => {
  it("matches the figure stated on the week 1 lecture page", () => {
    // Independently re-run the same seeded simulation the content number came
    // from. This isn't testing "is 22 really ~50%" against some outside
    // ground truth (a genuinely exact answer would need a runout enumeration
    // too slow to run in CI) — it's testing that the stated figure hasn't
    // drifted from what this code actually computes.
    const result = simulateEquityVsRandomHand(
      [TWO_OF_CLUBS, TWO_OF_DIAMONDS],
      300_000,
      42,
    );
    // 95% CI at n=300,000 is roughly the true proportion ± 0.18 percentage
    // points; 0.3 gives a small margin without hiding a real drift.
    expect(Math.abs(result.equityPct - 50.4)).toBeLessThan(0.3);
  }, 20_000);
});
