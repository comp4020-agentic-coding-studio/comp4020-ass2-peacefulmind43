import { describe, expect, it } from "vitest";
import { fullDeck, rankOf, suitOf } from "./lib/poker";

// Independently re-derive the week 2 lecture's counts by brute-force
// enumeration over the actual 52-card deck, rather than re-typing the
// closed-form arithmetic the lecture shows.
describe("week 2: starting-hand combo and class counts", () => {
  const deck = fullDeck();

  let combos = 0;
  let pairCombos = 0;
  let suitedCombos = 0;
  let offsuitCombos = 0;
  const pairClasses = new Set<number>();
  const suitedClasses = new Set<string>();
  const offsuitClasses = new Set<string>();

  for (let i = 0; i < deck.length; i++) {
    for (let j = i + 1; j < deck.length; j++) {
      combos++;
      const a = deck[i];
      const b = deck[j];
      const rankA = rankOf(a);
      const rankB = rankOf(b);
      const sameSuit = suitOf(a) === suitOf(b);

      if (rankA === rankB) {
        pairCombos++;
        pairClasses.add(rankA);
      } else {
        const key = [rankA, rankB].sort((x, y) => x - y).join("-");
        if (sameSuit) {
          suitedCombos++;
          suitedClasses.add(key);
        } else {
          offsuitCombos++;
          offsuitClasses.add(key);
        }
      }
    }
  }

  it("totals 1,326 combos, matching C(52,2)", () => {
    expect(combos).toBe(1326);
  });

  it("splits into 78 pair, 312 suited, and 936 offsuit combos", () => {
    expect(pairCombos).toBe(78);
    expect(suitedCombos).toBe(312);
    expect(offsuitCombos).toBe(936);
  });

  it("collapses to 169 hand classes (13 pair + 78 suited + 78 offsuit)", () => {
    expect(pairClasses.size).toBe(13);
    expect(suitedClasses.size).toBe(78);
    expect(offsuitClasses.size).toBe(78);
    expect(pairClasses.size + suitedClasses.size + offsuitClasses.size).toBe(169);
  });
});
