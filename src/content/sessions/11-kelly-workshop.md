---
title: Kelly criterion workshop
description:
  Computing Kelly fractions and growth rates for bets not covered in
  lecture, then locating the actual peak of the growth-rate curve by hand
week: 11
date: 2027-05-03
teachers:
  - dashiell-okafor
spec:
  - given a win probability and payout odds, you can compute the Kelly
    fraction and the resulting per-bet growth rate from the formulas
  - you can explain why doubling a Kelly-optimal stake can turn positive
    long-run growth negative even though every single bet stays +EV
related:
  - lectures/week-11
  - assessments/weekly-assignments
---

## Before the session

Read the lecture page. Bring the f\* = 0.2 and g(0.2) ≈ +2.01% figures —
the session recomputes both for a bet with different win probability and
payout odds.

## In the session

The group computes f\* and g(f\*) for a new (p, b) pair, then evaluates
g(f) at several multiples of that f\* (0.5x, 1x, 1.5x, 2x) to locate by
hand where growth turns from positive to negative — checking that it isn't
exactly at f\*×2 in general, since the growth curve isn't symmetric around
its peak.

Second half: starting from a blank page, the group re-derives why expected
*log* growth is the right objective for a repeated, bankroll-compounding
bet, rather than expected bankroll itself — connecting back to week 4's
variance content on the same page.

## Afterwards

Nothing is marked this week. Going into week 12: the course's own list of
what's been formalized so far, and — just as importantly — what's been
explicitly flagged as a gap along the way (multi-way MDF, real Kuhn poker
equilibria, estimating p and b from actual play) rather than quietly
assumed solved.
