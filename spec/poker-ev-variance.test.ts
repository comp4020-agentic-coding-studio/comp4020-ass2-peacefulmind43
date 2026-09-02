import { describe, expect, it } from "vitest";

// Exact integer nCr, independent of any other module's implementation.
function nCr(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let num = 1;
  let den = 1;
  for (let i = 0; i < k; i++) {
    num *= n - i;
    den *= i + 1;
  }
  return num / den;
}

describe("week 4: a profitable version of the flagship hand", () => {
  const equity = 9 / 46; // exact, one card to come — same draw as week 3
  const pot = 300;
  const call = 50;

  it("exact equity via hypergeometric complement, independent of poker.ts", () => {
    const unseen = 46;
    const outs = 9;
    const exact = 1 - nCr(unseen - outs, 1) / nCr(unseen, 1);
    expect(exact).toBeCloseTo(equity, 10);
  });

  it("required equity to call drops to 14.3% at this bet sizing, well under 19.6%", () => {
    const requiredEquity = call / (pot + call);
    expect(requiredEquity * 100).toBeCloseTo(14.3, 1);
    expect(equity).toBeGreaterThan(requiredEquity);
  });

  it("EV(call) is +$18.48 — a genuinely profitable call", () => {
    const ev = equity * pot - (1 - equity) * call;
    expect(ev).toBeCloseTo(18.48, 1);
  });
});

describe("week 4: variance of that same call", () => {
  const equity = 9 / 46;
  const pot = 300;
  const call = 50;
  const ev = equity * pot - (1 - equity) * call;

  it("standard deviation is about $139, roughly 7.5x the $18.48 edge", () => {
    const variance =
      equity * (pot - ev) ** 2 + (1 - equity) * (-call - ev) ** 2;
    const sd = Math.sqrt(variance);
    expect(sd).toBeCloseTo(138.83, 1);
    expect(sd / ev).toBeCloseTo(7.51, 1);
  });

  it("the call loses money on the single most likely outcome (80.4% of the time)", () => {
    expect(1 - equity).toBeGreaterThan(0.5);
    expect((1 - equity) * 100).toBeCloseTo(80.4, 1);
  });
});

describe("week 4: the sample-size fallacy", () => {
  const p = 9 / 46;

  it("standard error of the observed win rate at N=10 is about ±12.5%", () => {
    const se = Math.sqrt((p * (1 - p)) / 10);
    expect(se * 100).toBeCloseTo(12.5, 1);
  });

  it("standard error at N=300,000 — week 1's actual trial count — is about ±0.07%", () => {
    const se = Math.sqrt((p * (1 - p)) / 300_000);
    expect(se * 100).toBeCloseTo(0.07, 2);
  });

  it("the N=300,000 standard error is smaller by exactly sqrt(30,000)", () => {
    const seSmall = Math.sqrt((p * (1 - p)) / 10);
    const seLarge = Math.sqrt((p * (1 - p)) / 300_000);
    expect(seSmall / seLarge).toBeCloseTo(Math.sqrt(30_000), 6);
  });
});
