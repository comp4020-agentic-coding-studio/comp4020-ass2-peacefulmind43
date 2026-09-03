# Process overview

## What I built

SLOP3251, *The Formal Theory of Poker* — a fictional 12-week course at
"Slop University" that takes real poker-theory folklore (the rule of 4 and
2, "position is power," ICM, the Kelly criterion, Nash equilibria) and
requires every numeric claim in the content to be backed by a spec test
that derives the expected value independently, per the harness rule I
wrote into [`CLAUDE.md`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/583b199).

## How I got here

I worked with Claude Code as the agent, week by week, almost always in the
same order: write a harness (a spec-only helper plus tests that compute a
result from first principles), then write the lecture and Problem Session
content that cites it, then run `pnpm check` before moving on. Harness
commits and content commits stayed separate on purpose, so the diff for
"here is the math" and the diff for "here is the sentence citing it" can be
read one at a time — e.g. the Monte Carlo equity simulator
([`ad47176`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/ad47176))
feeding week 2's combinatorics content, or the ICM calculator
([`0cd5918`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/0cd5918))
feeding week 10.

The harness caught real mistakes rather than just documenting correct
answers. Solving a four-rank Kuhn poker extension for week 12, I first
asserted the equilibrium's opening-bet frequency was monotonic in card
rank; running the test against the actual solver output
([`c52eaa4...b458268`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/compare/c52eaa4...b458268))
showed that assumption was false — real Kuhn-family equilibria are
polarized, not monotonic — so I rewrote the assertion rather than the code.

Week 12 also needed a real published result to compare a from-scratch
solver against, which is exactly the claim `CLAUDE.md` says gets checked
against a citable source before it ships, not invented. I verified Kuhn
poker's actual equilibrium and game value against its Wikipedia article
before writing any content, confirmed a from-scratch CFR solver reproduced
it, and only then trusted the same solver on an unpublished extension. That
choice point was one I raised explicitly rather than deciding alone; the
answer authorized both the plan and a small addition to already-shipped
week 7 content ahead of it:

> I'll go with option 1 — but you should feel free to revise week 7 first,
> before building week 12, if that would help the mark.
>
> (translated; the original request was in Chinese)

The last pass replaced everything still marked `STARTER_CONTENT`
([`426d5df`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/426d5df)):
a real policies page, and original hero/social-card artwork generated as
SVG and rasterized with `sharp` to match the theme's existing gold-and-ink
brand palette, rather than leaving the shipped placeholders in place.
