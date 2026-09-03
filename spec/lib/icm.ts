// The Independent Chip Model (ICM), computed via the standard recursive
// (Malmuth-Harville) definition: the probability a player finishes best
// among a remaining group is proportional to their chip stack, applied
// recursively to whoever is left for the next-best remaining place.

import { mulberry32 } from "./poker";

/**
 * Placement-probability matrix for `stacks`. Returns M where M[i][k] is the
 * probability player i finishes in place k+1 (k=0 is 1st).
 */
export function icmPlacementMatrix(stacks: number[]): number[][] {
  const n = stacks.length;
  const result: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  function distribution(indices: number[]): number[][] {
    const m = indices.length;
    if (m === 1) return [[1]];
    const total = indices.reduce((s, i) => s + stacks[i], 0);
    const sub: number[][] = Array.from({ length: m }, () => new Array(m).fill(0));
    for (let w = 0; w < m; w++) {
      const pWin = stacks[indices[w]] / total;
      if (pWin === 0) continue;
      sub[w][0] += pWin;
      const rest = indices.filter((_, idx) => idx !== w);
      const subDist = distribution(rest);
      for (let r = 0; r < rest.length; r++) {
        const localPos = indices.indexOf(rest[r]);
        for (let k = 0; k < rest.length; k++) {
          sub[localPos][k + 1] += pWin * subDist[r][k];
        }
      }
    }
    return sub;
  }

  const full = distribution(stacks.map((_, i) => i));
  for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) result[i][k] = full[i][k];
  return result;
}

/** Expected tournament winnings for each player, given a payout array (payouts[0] = 1st place, etc.). */
export function icmEquity(stacks: number[], payouts: number[]): number[] {
  const matrix = icmPlacementMatrix(stacks);
  return matrix.map((placeProbs) =>
    placeProbs.reduce((acc, p, k) => acc + p * (payouts[k] ?? 0), 0),
  );
}

/**
 * Monte Carlo verification of the same underlying model: repeatedly draw a
 * stack-proportional "winner" of whoever remains for each successive place,
 * independent of the recursive closed-form algorithm above.
 */
export function simulateIcmPlacementMatrix(
  stacks: number[],
  trials: number,
  seed: number,
): number[][] {
  const n = stacks.length;
  const counts: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const rng = mulberry32(seed);

  for (let t = 0; t < trials; t++) {
    const remaining = stacks.map((s, i) => ({ i, s }));
    for (let place = 0; place < n; place++) {
      const total = remaining.reduce((sum, p) => sum + p.s, 0);
      let r = rng() * total;
      let chosen = 0;
      for (; chosen < remaining.length; chosen++) {
        r -= remaining[chosen].s;
        if (r <= 0) break;
      }
      if (chosen >= remaining.length) chosen = remaining.length - 1;
      counts[remaining[chosen].i][place]++;
      remaining.splice(chosen, 1);
    }
  }

  return counts.map((row) => row.map((c) => c / trials));
}
