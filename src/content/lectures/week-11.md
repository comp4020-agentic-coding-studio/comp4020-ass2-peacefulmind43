---
title: Bankroll management and the Kelly criterion
description:
  Why the size of a bet matters even when its EV is fixed and positive,
  formalized as maximizing long-run exponential growth rather than
  per-bet expectation
week: 11
date: 2027-05-03
teachers:
  - renata-sokal
related:
  - sessions/11-kelly-workshop
  - assessments/weekly-assignments
---

## A question EV alone can't answer

Every week so far has asked "is this bet positive-EV?" This week asks a
different question about a bet that's already known to be positive-EV:
**how much of the bankroll should go on it?** Betting more of a fixed edge
doesn't just scale the reward — it changes the *shape* of the risk, in a
way per-bet EV doesn't capture at all.

## Why per-bet EV isn't the right target for a repeated bet

A bankroll compounds: a loss doesn't just cost the amount staked, it costs
the ability to stake that amount again. Week 4 already showed that a
positive-EV bet can lose most individual attempts. Repeated many times,
what matters isn't the average of the outcomes — it's the *product*, since
each bet is sized off whatever the bankroll has become. That means the
right long-run objective is the expected **log** of bankroll growth, not
the expected bankroll itself.

## The Kelly criterion

For a bet that wins with probability *p* and pays *b* to 1 on a win, the
fraction of bankroll that maximizes expected log-growth per bet is:

**f\* = (b·p − q) / b**, where q = 1 − p

## A concrete repeated bet

A bet with a 60% win probability, paying even money (b = 1):

**f\* = (1×0.6 − 0.4) / 1 = 0.2** — bet 20% of the bankroll each time.

The per-bet growth rate at fraction f is g(f) = p·ln(1 + b·f) + q·ln(1 − f).
At f\* = 0.2:

**g(0.2) = 0.6·ln(1.2) + 0.4·ln(0.8) ≈ +2.01%** bankroll growth per bet,
compounding.

## Overbetting a real edge

Doubling the stake to f = 0.4 (still a smaller-than-full bankroll bet, and
every individual wager is still +EV in raw dollar terms):

**g(0.4) = 0.6·ln(1.4) + 0.4·ln(0.6) ≈ −0.24%** — the bankroll now
*shrinks* on average, despite every single bet remaining favorable. Betting
too large converts a real edge into long-run ruin; this is the actual
content behind "size matters," not just a caution.

## Half-Kelly, and the trade this course keeps finding

At f = 0.1 (half of f\*): g(0.1) ≈ +1.50% per bet — lower growth than full
Kelly, but (a fact this course doesn't re-derive in full, but is a direct
consequence of the same growth-rate function) meaningfully lower variance
in the path bankroll actually takes to get there. The same pattern week 8
found between GTO and exploitative play shows up again: the
growth-maximizing size and the size a real bankroll can survive holding
aren't automatically the same choice.

## What Kelly assumes, and doesn't cover

Kelly assumes *p* and *b* are known exactly and the bet is repeated
independently. Real poker decisions rarely offer either — win probabilities
are estimated (week 6's whole subject), and results within a single session
are correlated, not independent draws. Kelly is the right tool for sizing a
known repeatable edge (a poker player's overall session or bankroll
allocation across games), not a substitute for estimating the edge itself.

## Before next week

The course now has, in order: how to price a single decision (weeks 1–3),
how to reason about the size and reliability of that price (weeks 4–6),
how two rational players settle on a stable joint strategy (weeks 7–8), how
more players and a tournament structure change the calculation (weeks
9–10), and now how much of a bankroll a known edge is actually worth
risking. Week 12 closes the course by putting all five pieces to work: it
grades the claims week 1 opened with, then solves a real game outright.
