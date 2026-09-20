---
title: Mixed strategies and the algebra of bluffing
description:
  Deriving optimal bluffing frequency and minimum defense frequency from
  indifference conditions, in the simplest toy game that has both
week: 7
date: 2027-04-05
teachers:
  - renata-sokal
related:
  - sessions/07-indifference-practice
  - assessments/weekly-assignments
---

## Why a strategy needs randomness at all

Every decision so far this course has had a single correct answer: call,
fold, whatever the numbers said. Mixed strategies show up when *always*
doing the numerically-best thing becomes exploitable — if villain could
predict "hero only ever bluffs with nothing," villain just calls
everything. Game theory's answer is to randomize, and the question this
week formalizes is: randomize **how much**?

## The smallest toy game with a real bluff

Simplify a single betting round to its bones: villain either has a **value
hand** (always wins) or is **bluffing** (always loses) — no in-between.
Hero holds a **bluffcatcher**: loses to the value hand, beats the bluff.
Villain bets; hero calls or folds. There is no more betting after this.

Let **pot** be the amount already in the middle *before* villain's bet
(unlike week 3, where "pot" included the bet already — here the bet needs
to be separated out to track each player's own contribution). Let **bet**
be villain's bet size, which hero must match to call.

## Hero's side: when is calling worth it?

If x is the fraction of villain's betting range that's a bluff, hero's
equity when calling is exactly x (call only beats a bluff). Using the same
two-outcome EV formula from weeks 3–4:

EV(call) = x · pot − (1 − x) · bet

Setting this to zero — the fraction of bluffs that makes hero exactly
indifferent between calling and folding:

**x\* = bet / (pot + bet)**

This is week 3's required-equity formula, algebraically unchanged — just
read from the other player's seat. There, it told hero the equity needed
to call. Here it tells villain the bluff frequency that keeps hero from
being able to profitably exploit either "always call" or "always fold."

## Villain's side: how often must hero defend?

Now flip it. Suppose hero calls with probability c. Is villain's bluff
profitable? Relative to checking (worth $0, since a bluff loses at
showdown either way):

EV(bet as bluff) = (1 − c) · pot − c · bet

Setting this to zero — the calling frequency that makes villain exactly
indifferent between bluffing and giving up:

**c\* = pot / (pot + bet)**

This is the **minimum defense frequency** (MDF): the least often hero must
call to stop villain's bluff from being automatically profitable.

## Plugging in week 3's own numbers

Pot = $100, bet = $50 — the flagship hand's own bet sizing, reused so the
numbers are already familiar:

- Optimal bluff frequency: x\* = 50 / 150 ≈ **33.3%**
- Minimum defense frequency: c\* = 100 / 150 ≈ **66.7%**

Same bet sizing, and the two numbers add to 100% — not a coincidence, but a
feature of a toy game with exactly two outcomes on each side.

## Kuhn poker, named but not fully derived

This two-hand-type toy game is a simplification of **Kuhn poker** — a
three-card game (Kuhn, 1950) usually credited as the smallest poker
variant ever completely solved. Kuhn poker's real equilibrium lets a
player hold a *middle* hand too, which must sometimes call, sometimes
fold, sometimes even bet — a richer system of indifference equations than
the one just solved here. Deriving it fully is beyond this week's scope;
naming it correctly, and knowing it's the next rung up from what was just
built by hand, is the goal for now. Week 1 catalogued folk claims to be
cashed in later; this is the same move for a method, not a claim — the
capstone in week 12 is where Kuhn poker's real equilibrium finally gets
solved, checked against the published result, and reused on a game bigger
than anything solved by hand in this course.

## Before next week

Both numbers above came from a single simplifying assumption: exactly two
mutually exclusive hand strengths, and one opponent. Week 8 asks what
"optimal" even means once a strategy has to hold up against *any* opponent
strategy, not just the polarized one assumed here — the actual definition
of a GTO strategy.
