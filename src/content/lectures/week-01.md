---
title: What formalizing an instinct even means
description:
  Orientation — a short history of poker theory, what this course means by
  "formalize," and the folk claims we'll spend the semester cashing in
week: 1
date: 2027-02-22
teachers:
  - renata-sokal
related:
  - sessions/01-getting-started
---

## A short history

Poker strategy used to travel as folklore: rules of thumb passed between
players, refined by table experience and argument, rarely written down as
anything you could check. David Sklansky's *The Theory of Poker* (1987) was
an early attempt to state some of that folklore as general principles — the
Fundamental Theorem of Poker among them. Bill Chen and Jerrod Ankenman's
*The Mathematics of Poker* (2006) pushed further, applying real game theory
to betting and bluffing rather than just probability. Then the game theory
stopped being aspirational: in 2015 a Cepheus computer program built at the
University of Alberta essentially solved heads-up limit hold 'em, and by
2019 Carnegie Mellon and Facebook AI's Pluribus was beating elite
professionals at six-player no-limit
— not by simulating intuition, but by computing an equilibrium.

That is the arc this course walks in reverse. Solvers now exist that can
tell you, for a given spot, exactly what a game-theoretically optimal player
would do. What they don't automatically tell you is which pieces of the
older folklore they vindicate, which they quietly correct, and which turn
out to be about a different game than the one being played. That's the
gap this course lives in.

## What "formalize" means here

A claim is formalized, for this course's purposes, when it has been turned
from an assertion into a computation: a stated assumption, a derivation or
enumeration from that assumption, and a number at the end that could in
principle be wrong. "Position is power" is not formalized. "In this toy
game, the button's equilibrium EV is 0.5 big blinds higher than the
big blind's, holding ranges fixed" is. The second one is smaller and more
annoying to state — that shrinkage is the whole exercise.

## Four claims we will cash in later

These are stated now, deliberately, so that when each is resolved it's
recognisably an answer to a question this page asked in week 1:

- **"Use the rule of 4 and 2 to estimate your equity on a draw."**
  Resolved in week 3, where we derive the exact equity it's approximating
  and measure how far off the approximation actually runs.
- **"Position is power."**
  Resolved in week 5, where a toy game gives that claim an exact EV rather
  than a slogan.
- **"Play tight early, loosen up as the tournament goes on."**
  Resolved in week 10, once ICM gives us a way to price a chip differently
  depending on the stage of the tournament.
- **"Never slowplay a big hand."**
  Resolved in week 8, by comparing an exploitative line against what an
  unexploitable strategy actually recommends.

## Worked example: how good is 22, really?

Pocket twos is the weakest possible starting pocket pair, and table
folklore treats it as barely worth playing. Against a *specific* strong
hand it's a clear underdog. But "how good is a hand" is usually asked
implicitly against the field — against a hand no better or worse than
average. So: what is 22's equity against a uniformly random two-card hand,
run to the river?

There's no shortcut formula for this — it depends on the full distribution
of possible opponent hands and every possible five-card board, which is too
large a space to enumerate exactly inside a fast test (billions of
board/opponent combinations). So this course's harness computes it the
honest approximate way: a seeded Monte Carlo simulation, deterministic and
reproducible, not eyeballed and not copied from somewhere else.

> **22 holds ≈50.4% equity against a random hand** (Monte Carlo, 300,000
> simulated hands, seed 42, 95% confidence interval ±0.2 percentage
> points).

Two things worth sitting with. First, the number is close to a coin flip —
"the worst pocket pair" is still a very slight favourite against an
unweighted random hand, because most random hands are unpaired and a made
pair starts ahead of most of those. Second, notice what the claim actually
is and isn't: it says nothing about 22 against a hand that *isn't* random —
against a range a real opponent would actually play, the answer moves, and
by how much is exactly the kind of question week 6 comes back to.

## Before next week

Read the syllabus outline on the [assessments](/assessments/) page and come
to [the first Problem Session](/sessions/01-getting-started/) able to state,
in your own words, what would have to be true for a folk poker claim to
count as "formalized" under this course's definition.
