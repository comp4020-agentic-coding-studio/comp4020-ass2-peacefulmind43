import { describe, expect, it } from "vitest";

function bayesPosterior(
  prior: number,
  likelihoodGivenH: number,
  likelihoodGivenNotH: number,
): number {
  const numerator = likelihoodGivenH * prior;
  const denominator = numerator + likelihoodGivenNotH * (1 - prior);
  return numerator / denominator;
}

describe("week 6: the flagship Bayesian update", () => {
  const prior = 0.6; // P(Value)
  const likelihoodValue = 0.8; // P(big bet | Value)
  const likelihoodBluff = 0.5; // P(big bet | Bluff)

  it("posterior P(Value | big bet) is about 70.6%", () => {
    const posterior = bayesPosterior(prior, likelihoodValue, likelihoodBluff);
    expect(posterior * 100).toBeCloseTo(70.6, 1);
  });

  it("posterior derived directly from the raw numerator/denominator matches the helper", () => {
    const numerator = 0.8 * 0.6;
    const denominator = 0.8 * 0.6 + 0.5 * 0.4;
    expect(numerator).toBeCloseTo(0.48, 10);
    expect(denominator).toBeCloseTo(0.68, 10);
    expect(numerator / denominator).toBeCloseTo(
      bayesPosterior(prior, likelihoodValue, likelihoodBluff),
      10,
    );
  });

  it("EV(call) with the updated posterior is about -$5.88, flipping week 5's +$10 call", () => {
    const posteriorValue = bayesPosterior(prior, likelihoodValue, likelihoodBluff);
    const posteriorBluff = 1 - posteriorValue;
    const ev = posteriorValue * -50 + posteriorBluff * 100;
    expect(ev).toBeCloseTo(-5.88, 1);
    expect(ev).toBeLessThan(0);

    // week 5's flat-prior EV, for contrast
    const evFlatPrior = 0.6 * -50 + 0.4 * 100;
    expect(evFlatPrior).toBeCloseTo(10, 6);
    expect(ev).toBeLessThan(evFlatPrior);
  });
});

describe("week 6: Bayes' rule general sanity checks", () => {
  it("posterior P(H|S) + posterior P(not H|S) sum to 1 for an arbitrary prior/likelihood pair", () => {
    const prior = 0.35;
    const likelihoodH = 0.9;
    const likelihoodNotH = 0.2;
    const posteriorH = bayesPosterior(prior, likelihoodH, likelihoodNotH);
    const posteriorNotH = bayesPosterior(1 - prior, likelihoodNotH, likelihoodH);
    expect(posteriorH + posteriorNotH).toBeCloseTo(1, 10);
  });

  it("a perfectly diagnostic signal (likelihoodNotH = 0) drives the posterior to 1, regardless of prior", () => {
    for (const prior of [0.01, 0.3, 0.5, 0.7, 0.99]) {
      const posterior = bayesPosterior(prior, 0.9, 0);
      expect(posterior).toBeCloseTo(1, 10);
    }
  });

  it("an uninformative signal (equal likelihoods) leaves the posterior equal to the prior", () => {
    for (const prior of [0.1, 0.4, 0.6, 0.9]) {
      const posterior = bayesPosterior(prior, 0.7, 0.7);
      expect(posterior).toBeCloseTo(prior, 10);
    }
  });
});
