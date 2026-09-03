---
title: ICM workshop
description:
  Running the recursive ICM calculation on a payout structure and stack
  distribution nobody has seen, then a two-player sanity check by hand
week: 10
date: 2027-04-26
teachers:
  - dashiell-okafor
spec:
  - given stacks and a payout structure, you can compute each player's
    finish-placement probabilities and $EV using the recursive definition,
    not the naive chip-proportional shortcut
  - you can explain, in words, why a short stack's ICM $EV usually exceeds
    its chip-proportional share and a chip leader's usually falls short
related:
  - lectures/week-10
  - assessments/weekly-assignments
---

## Before the session

Read the lecture page. Bring the $417.86 / $325.00 / $257.14 flagship $EV
figures and the naive $500 / $300 / $200 comparison — the session runs the
same calculation on a different stack distribution and payout structure to
see if the same pattern (chip leader loses value, short stack gains it)
still holds.

## In the session

The group works through the recursive calculation by hand for a new
four-player final table with a top-heavy payout structure, computing each
player's placement probabilities one place at a time before converting to
$EV — checking along the way that every row and every column of the
placement matrix still sums to 1.

Second half: a two-player special case, where ICM collapses to a simple
linear formula (P(1st) for the chip leader, weighted against the two
payouts) — confirming that the general recursive method and the direct
two-player formula agree, as a sanity check on the general method rather
than a new result.

## Afterwards

Nothing is marked this week. Going into week 11: the difference between
"chip EV," "tournament dollar EV" (this week), and a bankroll that has to
survive many such tournaments — the question week 11 actually asks.
