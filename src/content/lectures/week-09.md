---
title: Multi-way pots
description:
  Which of this course's two-player results survive a third player at the
  table, tested against a real Monte Carlo simulation rather than assumed
week: 9
date: 2027-04-19
teachers:
  - renata-sokal
related:
  - sessions/09-multiway-equity
  - assessments/weekly-assignments
---

## An audit, not a new formula

Every result so far — pot odds, Bayesian updating, MDF — was built for
exactly one opponent. Adding a second doesn't invalidate all of it; it
invalidates the parts that quietly assumed "one opponent" without saying
so. This week is that audit.

## What survives unchanged

The pot-odds formula itself — required equity = call / (pot + call) — never
assumed a player count. It only needs hero's *true* equity to beat
everyone still in the hand. Bayes' rule is the same: nothing about it
requires exactly one hidden variable, only that updating now happens over
a joint distribution of multiple opponents' likely holdings instead of
one. Both formulas survive; what changes is how expensive the equity or
the update is to actually compute.

## What doesn't survive cleanly: MDF

Week 7's minimum defense frequency came from a single indifference
equation between exactly one bettor and one caller. With a second player
still to act behind hero, hero's own calling frequency now interacts with
what *that* player does too — a call correct against one opponent can
invite a squeeze from the other. A clean single-equation multi-way MDF is
not something this course derives; flagging that gap here rather than
quietly reusing the two-player formula as if it still applied.

## The one folk shortcut this week actually tests

A natural guess for multi-way equity: if a hand has 50.4% equity against
one random hand (week 1's own pocket-2s number), a tempting shortcut is
squaring that figure for two opponents, cubing it for three — treating
each opponent as an independent 50.4%-equity coin flip.

## What the simulation actually says

Running the same seeded Monte Carlo harness from week 1 (300,000 trials,
seed 42), extended to deal multiple opponents from the same board:

| Opponents | Naive (equity^n) | Simulated | Gap |
|---|---|---|---|
| 1 | — | 50.4% | — |
| 2 | 25.4% | 30.7% | +5.3 pp |
| 3 | 12.8% | 21.8% | +9.0 pp |

The independence shortcut **underestimates** multi-way equity, and by a
growing margin — the same "the shortcut isn't wrong, it's the wrong shape"
pattern week 3 found in the rule of 4 and 2.

## Why the shortcut misses

Opponents' hands aren't independent trials once they share a board: when
the board doesn't help hero, it often doesn't help every opponent equally
either. Treating each opponent as an independent coin flip throws that
correlation away, and it happens to throw away equity hero actually has.

## Before next week

Multi-way equity is still a *single-hand* snapshot — one pot, decided by
one showdown. Week 10 moves to a setting where winning a hand isn't the
same as winning value: a tournament, where chips are worth less than their
face count once elimination is on the table.
