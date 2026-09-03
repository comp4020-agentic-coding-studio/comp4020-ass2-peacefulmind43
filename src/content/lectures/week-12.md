---
title: "Capstone: how much of good poker intuition can be formalized"
description:
  Grading the semester's own four promises, solving the real Kuhn poker
  equilibrium and checking it against the published result, and naming
  what stayed outside every tool this course built
week: 12
date: 2027-05-10
teachers:
  - renata-sokal
related:
  - sessions/12-capstone-review
  - assessments/weekly-assignments
---

## The question this course opened with

Week 1 asked how much of good poker intuition can be turned from a slogan
into a computation — "a stated assumption, a derivation or enumeration from
that assumption, and a number at the end that could in principle be
wrong." Four folk claims were catalogued there specifically so this page
could be honest about how each one actually landed.

## A scorecard, not a highlight reel

- **"Rule of 4 and 2"** (week 3): fully resolved. The exact hypergeometric
  equity was derived directly, and the rule's own error was quantified
  against it — the strongest resolution of the four, because the claim was
  already a numeric approximation and had an exact target to be measured
  against.
- **"Position is power"** (week 5): fully resolved. A toy game gave the
  slogan an exact number — a value of information, in dollars, rather than
  a direction.
- **"Play tight early, loosen up as the tournament goes on"** (week 10):
  partially resolved. ICM didn't track one hand across tournament stages —
  it showed the mechanism the slogan is gesturing at: a stack's dollar
  value depends on the payout structure it's up against, not just its chip
  count, which is exactly why the correct amount of risk to take changes
  as the money and the bubble get closer. The slogan's *direction* is
  explained; a stage-by-stage number was not computed.
- **"Never slowplay a big hand"** (week 8): the weakest resolution. Week 8
  didn't evaluate a slowplay decision directly — it built the
  exploitability formula that any such claim would have to be run through.
  Whether a specific slowplay is safe or leaky is a question that formula
  can answer; this course asked the question but didn't run this
  particular case through it. Naming that gap here rather than quietly
  counting it as resolved.

## A method too small to matter, and one too big to do by hand

Week 7 solved a toy game with three pure strategies by writing down two
indifference equations and solving them on paper. Real Kuhn poker — the
smallest *fully* solved poker game, named in week 7 but deliberately not
derived there — has twelve information sets, each a hero-or-villain
decision with its own mix of check/bet or call/fold. Writing that system
of indifference equations out by hand is possible but not something to do
live in a lecture. What scales is the *idea* behind week 7's method, not
the by-hand algebra: **regret minimization** — at every decision point,
track how much better each action would have done than what was actually
played, and shift probability toward whatever has been regretted most.
Run for enough iterations, this converges to the same kind of indifference
week 7 solved directly.

## Solving the real Kuhn poker equilibrium

Kuhn poker (Kuhn, 1950) deals one of three ranks to each of two players
from a three-card deck; a single round of check/bet, call/fold decides the
hand. Its published equilibrium ([Kuhn poker,
Wikipedia](https://en.wikipedia.org/wiki/Kuhn_poker)) is a one-parameter
family indexed by α ∈ [0, 1/3] — the lowest card bets (bluffs) with
probability α, the highest card bets with probability 3α and always
calls, the middle card never opens but calls a bet with probability
1/3 + α — with a fixed game value: the first player loses exactly
**−1/18 ≈ −0.0556** per hand at equilibrium, regardless of which α is
played.

Running a from-scratch regret-minimization solver — the same idea as week
7's indifference equations, automated — for 300,000 iterations over Kuhn
poker's actual game tree gives a game value of **−0.05555**, matching the
published −1/18 to within 0.0001, and reproduces every piece of the
published strategy: the lowest card never calls after a check-raise, the
highest card always calls, the middle card never opens betting and calls
roughly a third of the time facing one, exactly as the cited result
describes. The gap between "solved by hand" and "solved by a general
method, checked against what's already known" is close to zero here — the
method is trustworthy precisely because it was checked against a case
where the real answer was already published.

## A bigger toy game nobody has published

The same solver, unchanged, run on a four-rank extension of Kuhn poker —
a game no textbook states the equilibrium for — converges to a stable game
value of **−0.04167** (curiously close to −1/24, though this course
doesn't attempt to prove that pattern holds for a general number of
ranks — flagging the observation rather than claiming the theorem). The
resulting strategy is **polarized**: both the lowest and the highest rank
open betting more often than either of the two middle ranks, which mostly
check — the same "bet the very strong and the very weak, check the
middle" shape week 7's toy game assumed as its starting setup, except here
it emerged from the solver rather than being assumed.

## What no tool this semester captured

Every model this course built assumed a fixed, known, or at worst a
Bayesian-updatable opponent. Three things a real table has that none of
that captures: **table talk and physical tells** (information no
probability distribution over hole cards was ever going to represent),
**opponent non-stationarity** (week 8's whole distinction between GTO and
exploitative play exists because a real opponent's tendencies drift
mid-session in a way a fixed frequency x never does), and the **meta-game
across an entire session or tournament** (a player's image, table
history, and what opponents remember about earlier hands shape a decision
this course only ever modeled one hand at a time).

## Real players versus solvers

A solver returns the equilibrium of whatever game was handed to it — the
answer is only as good as the abstraction. A real player is working with a
worse model of the game (nobody carries twelve exact information sets'
worth of mixed frequencies to the table) but a better model of the
specific opponent sitting across from them, updated continuously the way
week 6 formalized. Solvers win at removing the possibility of being
exploited; they cannot, by construction, exploit a specific opponent more
than the equilibrium already does. That trade is precisely what week 8
made numeric.

## Answering week 1's question

How much of good poker intuition can be formalized: a lot of the
*probability* side completely (weeks 1–4, 9–10), a fair amount of the
*strategic* side once the game is simplified enough (weeks 5–8, and this
week's Kuhn poker solve), and close to none of the *psychological* side —
not because it's unimportant, but because it was never this course's
subject. The folk claims that survived best were the ones that were
already, secretly, claims about numbers. The ones that survived worst were
about people.
