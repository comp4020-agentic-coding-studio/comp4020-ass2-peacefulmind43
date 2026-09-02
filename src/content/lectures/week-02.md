---
title: Counting the deck
description:
  Combinatorics before probability — how many starting hands there really
  are, and why the answer depends on what you're counting
week: 2
date: 2027-03-01
teachers:
  - renata-sokal
related:
  - sessions/02-counting-practice
  - assessments/weekly-assignments
---

## Why counting comes first

Every equity figure, every outs count, every pot-odds threshold later in this
course reduces to a ratio of two counts: the number of ways the thing you
want can happen, over the number of ways anything can happen. Get the
counting wrong and no amount of probability theory rescues the answer — it
was wrong before the division sign showed up. So before this course touches
a single percentage, it spends a week on counting the deck properly.

## Two ways to count a starting hand

Ask "how many different starting hands are there in hold 'em?" at a table and
you'll get two different correct-sounding answers, because the question is
ambiguous between two things worth telling apart.

A **combo** is a specific pair of cards: the 3♣ and the 3♦ is a different
combo from the 3♣ and the 3♥, even though a player would call both hands "a
pair of threes." The number of combos is exactly the number of ways to choose
2 cards from a 52-card deck, order not mattering:

> C(52, 2) = 52 × 51 / 2 = **1,326 combos**

A **hand class** collapses combos that play identically before the flop: all
six ways to be dealt pocket threes are "the same hand" for strategy purposes,
and so are all four ways to hold a suited ace-king. Counting classes means
counting pairs, suited hands, and offsuit hands separately:

- **Pairs.** 13 ranks, and for each rank C(4,2) = 6 ways to choose the two
  suits, giving 13 × 6 = **78 pair combos**, but each rank is only *one*
  class, so **13 pair classes**.
- **Suited hands.** C(13,2) = 78 ways to choose two distinct ranks, and for
  each rank pair, 4 ways to choose a shared suit, giving 78 × 4 = **312
  suited combos**, one class per rank pair, so **78 suited classes**.
- **Offsuit hands.** The same 78 rank pairs, but now 4 × 3 = 12 ways to give
  the two ranks different suits, giving 78 × 12 = **936 offsuit combos**,
  again **78 classes**.

Add the combo counts: 78 + 312 + 936 = 1,326, matching C(52, 2) exactly — a
useful check that no case was double-counted or missed. Add the class counts:
13 + 78 + 78 = **169 hand classes**.

## A folk claim to formalize: "there are 169 starting hands"

This is the sentence that motivated the section above, and it is a good
example of a claim that is really two different claims wearing one number.
Said about *strategy* — how many meaningfully different decisions a player
can face preflop — 169 is the right count, because equity and correct play
depend only on rank and suitedness pattern, not which physical suits are
involved. Said about *probability* — how likely you are to be dealt a
specific hand — 169 is the wrong count to divide by, because the 169 classes
are not equally likely: a pair class has 6 combos behind it and a suited
class has only 4, so P(pair) ≠ P(suited hand) even though "pair" and "suited
hand" are each one class out of 169. The combo count, not the class count, is
what a probability calculation needs.

## Before next week

Week 3 reuses this same counting machinery on the flop and turn rather than
the two hole cards — that's how the "rule of 4 and 2" from week 1 gets its
exact version. Before then, be comfortable computing C(n, k) by hand for
small n, since next week's derivation leans on it directly.
