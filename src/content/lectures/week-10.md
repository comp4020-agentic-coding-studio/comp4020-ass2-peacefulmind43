---
title: Tournament equity and the Independent Chip Model
description:
  Why a chip isn't worth a dollar once elimination is on the table, made
  precise with the standard recursive ICM calculation and checked against
  the naive chip-proportional model it's often confused with
week: 10
date: 2027-04-26
teachers:
  - renata-sokal
related:
  - sessions/10-icm-workshop
  - assessments/weekly-assignments
---

## A different kind of pot

Every EV calculation so far has priced a single hand in dollars won or lost
at that showdown. A tournament changes what's being priced: chips have no
cash value on their own — only finishing position pays, according to a
fixed payout structure. Two players with equal stacks and different payout
structures ahead of them can have very different dollar equity, even though
their chip counts say they're identical.

## The naive model, and why it's tempting

A natural first guess: a player's share of the total prize pool should
equal their share of the total chips in play. It's simple, and it's what a
lot of players do in their heads at a final table. This week checks it
against a real model rather than assuming it.

## The Independent Chip Model, defined

The standard model (Malmuth–Harville) makes one assumption: the
probability a specific player finishes **best among whoever's left**
equals their share of the chips remaining in play. Formally, for a set of
players still in the tournament:

**P(player *i* finishes 1st) = stack\_i / (sum of all remaining stacks)**

Places beyond 1st are computed the same way, recursively: P(player *i*
finishes in the next-best remaining place) is the probability someone else
takes the place ahead of them, times the probability *i* finishes best
among whoever's left after that. This is a real, well-defined recursive
calculation — not a heuristic — and it's what the rest of this page
computes directly rather than quoting a solver's output.

## A three-player final table

Three players remain, 10,000 total chips, a $1,000 prize pool paying
$600 / $300 / $100 for 1st / 2nd / 3rd:

| Player | Stack | Chip share |
|---|---|---|
| A | 5,000 | 50% |
| B | 3,000 | 30% |
| C | 2,000 | 20% |

Running the recursive ICM calculation gives each player's probability of
finishing in each place:

| Player | P(1st) | P(2nd) | P(3rd) |
|---|---|---|---|
| A | 50.0% | 33.9% | 16.1% |
| B | 30.0% | 37.5% | 32.5% |
| C | 20.0% | 28.6% | 51.4% |

(Every row sums to 100%, and so does every column — each place is assigned
to exactly one player's probability mass, in expectation.)

## The dollar figures

Multiplying each row by the payouts gives each player's **$EV**:

| Player | ICM $EV | Naive chip share | Difference |
|---|---|---|---|
| A | $417.86 | $500.00 | **−$82.14** |
| B | $325.00 | $300.00 | +$25.00 |
| C | $257.14 | $200.00 | **+$57.14** |

(Both columns sum to exactly $1,000 — the whole prize pool, split two
different ways.)

## Reading the gap

The naive model overvalues the chip leader by $82.14 and undervalues the
short stack by $57.14. The reason isn't a rounding quirk — it's the shape
of the payout structure. A's extra chips over B and C are only worth their
*proportional* share if finishing 1st and finishing 3rd paid proportionally
too, but here 1st pays 6x what 3rd pays while having only ~2.4x the chips.
Once C busts, a large share of the remaining prize pool is still locked
into 1st and 2nd — money A can't guarantee just by holding more chips now.
Symmetrically, C's stack under-represents C's dollar equity because C is
already guaranteed *some* placement money simply by being one of three
players left, a floor the linear chip-share model doesn't see.

## What survives from earlier weeks, and what doesn't

Pot odds and Bayesian updating (week 9's audit) still price a single hand
in chips won or lost. ICM is the layer on top: it's what converts those
chip swings into dollar value once elimination is possible. A chip-EV
positive call can be a dollar-EV negative call near the bubble, if it risks
busting out of guaranteed money — the two are no longer the same
calculation, and conflating them is the single most common tournament
mistake this model is built to catch.

## Before next week

ICM prices *tournament* chips against a payout structure. Week 11 goes
back to a cash-game setting and asks a related but different question:
given a bankroll instead of a fixed prize pool, how much of it should a
positive-EV bet actually risk?
