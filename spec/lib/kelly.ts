// The Kelly criterion: the bankroll fraction that maximizes the long-run
// exponential growth rate of repeated favorable bets. `b` is net odds (bet
// pays b:1 on a win), `p` the win probability.

/** The Kelly-optimal fraction of bankroll to wager, for a bet paying b:1 with win probability p. */
export function kellyFraction(p: number, b: number): number {
  const q = 1 - p;
  return (b * p - q) / b;
}

/**
 * Expected per-bet log-growth rate of bankroll when betting fraction f of it
 * on a bet paying b:1 with win probability p. Wagering f=0 always gives 0;
 * f above the point where 1-f<=0 is nonsensical (bets more than the
 * bankroll) and returns -Infinity.
 */
export function growthRate(f: number, p: number, b: number): number {
  const q = 1 - p;
  if (f >= 1) return Number.NEGATIVE_INFINITY;
  return p * Math.log(1 + b * f) + q * Math.log(1 - f);
}
