---
title: Range reading and Bayesian updating
description:
  Turning a partial signal — a bet size, not a revealed hand — into an
  updated probability, and watching it flip last week's call into a fold
week: 6
date: 2027-03-29
teachers:
  - renata-sokal
related:
  - sessions/06-bayesian-updating
  - assessments/weekly-assignments
---

## From a perfect signal to a partial one

Week 5's toy example assumed hero simply *knew* villain's state — Value or
Bluff. Real information is partial: a bet size correlates with hand
strength without pinning it down. Bayes' rule is how a partial signal turns
into an updated probability instead of a certainty.

## Bayes' rule, stated

For a hidden state H and an observed signal S:

**P(H | S) = P(S | H) · P(H) / P(S)**

where P(S) = Σ over all possible states of P(S | state) · P(state). The
denominator just re-normalizes so the posterior probabilities across all
states still sum to 1.

## Applying it to the flagship signal

Same setup as week 5: villain is Value 60% of the time, Bluff 40% of the
time — the *prior*. Now add a signal: villain sizes big more often with
Value than with a Bluff:

- P(big bet | Value) = 0.8
- P(big bet | Bluff) = 0.5

Villain bets big. Updating:

P(Value | big bet) = (0.8 × 0.6) / (0.8 × 0.6 + 0.5 × 0.4) = 0.48 / 0.68 ≈
**70.6%**

The big bet doesn't reveal villain's hand — it moves hero's belief from a
60% prior to a 70.6% posterior.

## Why that number changes the decision

Week 5's blind-call EV used the 60/40 prior and came out +$10 — call was
correct. Recomputing EV(call) with the *updated* 70.6% / 29.4% split, same
payoffs (−$50 vs Value, +$100 vs Bluff):

EV(call) = 0.706 × (−50) + 0.294 × (100) ≈ **−$5.88**

The same call that was profitable against the flat prior is a loser once
the bet-sizing signal is folded in. Nothing about the payoffs changed —
only the belief did, and that was enough to flip fold-or-call.

## Ranges, generalized

A **range** is this same idea scaled up: instead of two states (Value,
Bluff), a full probability distribution over every hand class villain could
hold — the 169 classes week 2 counted, each carrying a weight. Every
observed action is a signal; Bayes' rule (applied class by class) is how a
starting range narrows into a smaller, reweighted range as a hand goes
through more betting rounds. The two-state version above is that same
machine with the smallest possible range.

## Before next week

This week's likelihoods — P(big bet | Value) = 0.8, and so on — were
assumed, not derived from any optimal strategy. Week 7 asks where numbers
like that should actually come from, starting with the simplest toy game
where a strategy can be solved for rather than guessed.
