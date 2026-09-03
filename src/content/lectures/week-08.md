---
title: GTO versus exploitative play
description:
  What "unexploitable" actually means, formalized as a zero-exploitability
  property of week 7's equilibrium, versus the higher-EV but riskier
  alternative of deviating to exploit a fixed opponent
week: 8
date: 2027-04-12
teachers:
  - renata-sokal
related:
  - sessions/08-exploitability
  - assessments/weekly-assignments
---

## What "optimal" means once an opponent adapts

Week 7 derived x\* = 33.3% and c\* = 66.7% for one specific toy game, as
the frequencies that make each player indifferent. This week asks: what is
that indifference actually buying, and is it always the right target?

## GTO, defined

A pair of strategies is a **Nash equilibrium** — what "GTO" means here — if
neither player can raise their own EV by unilaterally changing their
strategy, given the other's strategy stays fixed. The defining property
that matters at the table: an equilibrium strategy's EV **cannot be pushed
below the game's value**, no matter what the opponent does. That's the
technical content behind "unexploitable."

## Best-responding to a fixed opponent

Contrast that with a different question: given a specific, *known*,
*fixed* bluffing frequency x from villain — not villain playing optimally —
what should hero actually do? Hero's EV(call) − EV(fold) is linear in x
(from week 7's own formula), which means the best response is almost never
a mix — it's **pure**:

- If x > x\* (villain overbluffs): call **always** (c = 100%), not 66.7%.
- If x < x\* (villain underbluffs): fold **always** (c = 0%), not 66.7%.
- Only exactly at x = x\* is hero indifferent, which is precisely the
  equilibrium case week 7 solved.

A known, fixed tendency is always more profitably exploited by a pure
strategy than by the equilibrium mix — the mix is only correct when the
opponent might also be adapting.

## Exploitability, formalized

Define the **exploitability** of hero's calling frequency c as the most
extra EV villain can extract by bluffing as often as profitable, given c:

**exploitability(c) = max(0, pot − c · (pot + bet))**

- At c = c\* = 66.7%: exploitability = 100 − 0.667×150 = **$0** — the
  equilibrium calling frequency cannot be exploited at all.
- At c = 50% (a hero who folds too much): exploitability = 100 − 0.5×150
  = **$25** per hand — the exact amount a villain willing to bluff 100%
  of the time can extract.

This is what "GTO guarantees the game's value regardless of opponent"
means numerically: zero exploitability is a property of one specific
frequency, and every other frequency has some fixed dollar cost attached
to it, computable in the same way.

## The actual trade-off

Exploitative play's appeal: against villain's real x = 50% (well above
x\* = 33.3%), calling 100% earns hero $25 per hand — strictly more than
the $0 the equilibrium mix guarantees. Its cost: that $25 depends entirely
on villain actually bluffing 50% of the time continuing to be true. If
villain notices hero calling too much and stops bluffing, hero's
$25-per-hand edge becomes hero's own exploitability instead — the same
formula, now pointed the other way. GTO play never needs that assumption
to hold; exploitative play is a bet that it will.

## Before next week

Every toy game this course has built has been exactly two players. Week 9
adds a third, and asks which parts of everything so far — pot odds,
Bayesian updating, MDF — survive that change and which quietly assumed
only two players all along.
