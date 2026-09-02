---
title: Bayesian updating workshop
description:
  Rebuilding the flagship Bayes update from scratch, then updating on a
  second signal to see the posterior move again
week: 6
date: 2027-03-29
teachers:
  - dashiell-okafor
spec:
  - given a prior and two conditional likelihoods, you can compute the
    Bayesian posterior and re-derive EV(call) from it
  - you can update a posterior a second time on a new signal, using the
    first posterior as the new prior
related:
  - lectures/week-06
  - assessments/weekly-assignments
---

## Before the session

Read the lecture page. Bring the 60% prior, the 0.8 / 0.5 bet-sizing
likelihoods, and the ≈70.6% posterior — the session rebuilds all three
numbers by hand.

## In the session

The group recomputes the flagship posterior from the raw prior and
likelihoods, then recomputes EV(call) from that posterior, checking that it
lands near −$5.88 and flips the week 5 call into a fold.

Then a second signal is introduced (villain also checks their timing tell
a fixed way depending on hand strength), and everyone updates *again* —
using the first posterior as the new prior — to see a range narrow over
two signals instead of one, which is closer to how a real hand actually
plays out street by street.

## Afterwards

Nothing is marked this week. Going into week 7: comfort computing a
Bayesian posterior from a prior and a likelihood pair without the lecture's
numbers already in front of you.
