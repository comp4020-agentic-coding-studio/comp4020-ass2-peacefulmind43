---
title: Counting practice
description:
  The second Problem Session — deriving the week 2 combo and class counts
  by hand, then reusing the technique on a smaller counting problem
week: 2
date: 2027-03-01
teachers:
  - dashiell-okafor
spec:
  - you can independently derive the 1,326-combo and 169-class counts,
    not just recite them
  - given two specific starting cards, you can say which combo-count
    bucket (pair, suited, offsuit) they belong to and why
related:
  - lectures/week-02
  - assessments/weekly-assignments
---

## Before the session

Read the week 2 lecture and attempt the 1,326/169 derivation yourself before
seeing anyone else's version of it. Bring whichever step you got stuck on, if
any — a wrong attempt is more useful to compare than a blank page.

## In the session

The group rebuilds the combo and class counts together, case by case: pairs,
suited hands, offsuit hands, checking at each step that the running total
still adds to C(52, 2). Getting the case split right — deciding what counts
as a separate case at all — turns out to be the actual skill; the arithmetic
inside each case is easy once the split is correct.

Then the same technique gets pointed at a smaller, un-answered question:
how many three-card flops contain at least one ace? This isn't marked and
isn't in the lecture, but it's the same counting move week 3 needs, applied
somewhere the answer isn't already known going in.

## Afterwards

Nothing is marked this week. What should be settled going into week 3: fluent
use of C(n, k), and the combo/class distinction from lecture.
