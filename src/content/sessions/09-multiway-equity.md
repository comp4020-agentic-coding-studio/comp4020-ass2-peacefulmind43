---
title: Multi-way equity workshop
description:
  Running the multi-opponent simulator on a hand nobody has seen, and
  auditing which other course results would need re-deriving with 3 players
week: 9
date: 2027-04-19
teachers:
  - dashiell-okafor
spec:
  - given a hand's 2-way equity, you can state the naive independence
    estimate for 2 and 3 opponents and explain why it's a lower bound, not
    an estimate, in the way this week's numbers show
  - you can identify, for a course result from an earlier week, whether it
    assumed exactly one opponent and if so what breaks with a second
related:
  - lectures/week-09
  - assessments/weekly-assignments
---

## Before the session

Read the lecture page. Bring the 50.4% / 30.7% / 21.8% simulated numbers —
the session runs the same simulator on a different starting hand to see if
the same-direction gap shows up again.

## In the session

The group runs the multi-opponent Monte Carlo simulator on a hand other
than pocket 2s, computing the naive independence estimate by hand first,
then comparing it to the simulated result — checking whether the gap is
still positive (simulation above naive) and still grows from 2 to 3
opponents.

Second half: an audit exercise. For each named result from weeks 3–8 (pot
odds, implied odds, Bayesian updating, optimal bluff frequency, MDF,
exploitability), the group decides together whether it silently assumed
one opponent, and if so, names the specific step that would need to change
with a second player at the table — rather than assuming everything just
scales.

## Afterwards

Nothing is marked this week. Going into week 10: comfort with the idea
that a formula's *shape* can survive more players while its *inputs*
(especially "equity") quietly get harder to compute.
