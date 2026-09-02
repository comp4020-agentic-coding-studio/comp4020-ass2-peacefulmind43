---
title: Position and the value of information
description:
  A clean decision-theory result — the value of perfect information — used
  to put a number on why acting last is worth something
week: 5
date: 2027-03-22
teachers:
  - renata-sokal
related:
  - sessions/05-value-of-information
  - assessments/weekly-assignments
---

## "Position is valuable" is a claim, not a fact

Every poker text says acting last is an advantage. This week formalizes
*why*, using a general decision-theory result before connecting it back to
the table.

## The value of information, generally

Suppose a decision has two possible actions, and the world is in one of two
states with known probabilities p and 1 − p. Each (action, state) pair has
a known payoff. Two ways to play it:

- **Blind**: commit to one action before the state is revealed. Best case:
  the single action with the highest *expected* payoff.
- **Informed**: see the true state first, then act. Best case: the best
  action *for that state*, every time.

**Value of information = E[best action per state] − E[best single blind
action]**

This difference can never be negative — seeing the true state and still
being free to take the blind-optimal action is always an option, so the
informed side can only match or beat the blind side.

## A toy number

Villain's river hand is Value 60% of the time, a Bluff 40% of the time.
Hero can Call (win $100 vs a bluff, lose $50 vs value) or Fold (always
$0):

| Hero's action | vs Value (60%) | vs Bluff (40%) |
|---|---|---|
| Call | −$50 | +$100 |
| Fold | $0 | $0 |

**Blind** (commit to one action for both states): EV(call) = 0.6×(−50) +
0.4×(100) = **+$10**; EV(fold) = $0. Best blind action is call, worth $10.

**Informed** (know villain's exact holding before acting): fold vs value
(0, beats −50), call vs bluff (100, beats 0). Expected value = 0.6×0 +
0.4×100 = **$40**.

> **Value of information ≈ $40 − $10 = $30 per hand**, in this toy model.

## Connecting it to position

Nobody gets to see villain's actual hole cards. But acting last means
seeing villain's *action* — a bet, a check, a sizing — before committing,
on every street of the hand, not just once. That's not the clean
perfect-information case above; it's a repeated, partial-information
version of it. The player who never has to act first never has to reveal a
decision before extracting whatever signal the other player's action
carries.

A general structural point sits underneath the numbers too: in any
sequential decision, the player choosing last can always fall back on
whatever the blind player would have done, and is never forced to do
worse. That's the same asymmetry the toy example measures in dollars.

## Before next week

The toy example assumed a *perfect* signal — hero simply knows villain's
state. Real betting actions are a *partial* signal: a big river bet is more
likely, not certain, to mean a strong hand. Week 6 formalizes how to turn a
partial signal like that into an updated probability, using Bayes' rule.
