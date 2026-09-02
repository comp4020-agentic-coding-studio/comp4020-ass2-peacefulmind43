---
title: Expected value and variance
description:
  Formalizing EV beyond one hand, why a correct call still loses most of
  the time it's made, and why sample size is doing more work than it looks
week: 4
date: 2027-03-15
teachers:
  - renata-sokal
related:
  - sessions/04-variance-workshop
  - assessments/weekly-assignments
---

## Formal EV

Week 3 used EV(call) = equity × pot − (1 − equity) × call for one specific
hand without naming the general pattern behind it. In general, for a
decision with outcomes worth x₁, x₂, … xₙ occurring with probabilities p₁,
p₂, … pₙ:

**EV = Σᵢ pᵢ · xᵢ**

Week 3's formula is this sum with exactly two outcomes: win the pot, or
lose the call. Everything below stays inside that same two-outcome shape,
because it's the shape a single street's calling decision always has.

## A profitable version of the flagship hand

Reuse week 3's flush draw (9 outs, 19.6% equity, one card to come), but
raise the stakes so the call is actually worth making: pot $300, call $50.

Required equity = 50 / (300 + 50) ≈ 14.3%. Hero's 19.6% clears that
comfortably:

> **EV(call) ≈ +$18.48** — a genuinely profitable call, this time.

## Why a correct call still loses most of the time

"Profitable" describes an average over many repetitions, not this one
hand. This call wins $300 only 19.6% of the time; the other 80.4% of the
time it loses the $50 call outright. The spread between those two outcomes
— not just their average — is what variance measures:

> This call's standard deviation is about **$139**, roughly **7.5 times**
> its own $18.48 edge.

A correct, positive-EV call losing money on any single attempt isn't bad
luck defeating good strategy — the numbers above say it's the *expected*
short-run experience of a play whose edge is small relative to its spread.

## The sample-size fallacy

If variance is large relative to EV, then judging a play from a handful of
results is judging noise. Concretely: this hand's true win rate is 19.6%.
The standard error of an *observed* win rate over N repetitions is

√(p(1−p) / N)

At N = 10 repetitions, that's about **±12.5%** — wide enough that a
perfectly correct play can look badly wrong, or a bad one can look great,
purely from the sample size. At N = 300,000 — the trial count week 1's
harness actually used for its equity claim — the same formula gives about
**±0.07%**, which is why that number was trustworthy and ten hands' worth
of results never would be.

## Risk-adjusted EV

Raw EV treats a $1 win and a $1 loss as exact opposites, which is a fine
assumption for a single hand and a bad one for a whole session or a whole
bankroll: losing a stack you can't rebuy hurts more than the mirror-image
win helps. One common formalization discounts EV by how much variance
comes with it — a *certainty equivalent* of EV minus some multiple of
variance, for a risk-aversion parameter chosen by the player's actual
stakes and bankroll. Week 11 makes a specific, principled version of this
precise, once there's a bankroll to protect and a growth rate to optimize
instead of a free-floating risk parameter.

## Before next week

The variance figure above was for one hand in isolation. Week 5 changes
what's being measured — not the spread of one decision's outcomes, but the
value of the *information* a player in position gets to see before making
it.
