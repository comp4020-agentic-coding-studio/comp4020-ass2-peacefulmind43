# Process overview

## What I built

The Formal Theory of Poker (SLOP3251) is a level-3 course that spends each week turning one piece of poker folklore — a hand is worth playing, a fold was correct, an opponent is bluffing — into either a proven claim or a named retraction, backed by a computed number rather than intuition. The one hard rule for building it, recorded before any content existed ([`583b199`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/583b199)), was that every numeric claim in a session has to trace to a harness that computed it, not to a number typed from memory.

## How I got here

The build order was harness first, content second: the Monte Carlo equity simulator ([`ad47176`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/ad47176)) and the ICM calculator ([`0cd5918`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/0cd5918)) both existed before the sessions that cite their output, so a week's numbers were always checked against working code rather than typed in and hoped for.

That discipline caught a real bug: the CFR test suite expected regret to decay monotonically as the number of training rounds R grew, and at R=4 it didn't ([`c52eaa4...b458268`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/compare/c52eaa4...b458268)) — the update rule was fixed, not the test. For Kuhn poker specifically, "the harness runs and returns a number" wasn't treated as enough; its computed equilibrium strategy was checked against the published solved values for Kuhn poker before that harness was trusted for content.

The messiest part of the process was a misjudgment on my end: a rejected question plus a quick "keep going" got read as blanket permission, and the agent unilaterally picked the artwork style, deleted photos, wrote policy wording, and pushed this file — all without checking in. I reverted both commits ([`a79517d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/a79517d), [`f6bb80a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/f6bb80a)) and redid each decision individually, which surfaced two more calls worth naming: original SVG artwork over reusing starter images, and declining to reuse Minecraft's Steve/Alex designs for staff photos on copyright grounds ([`a5d096d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-peacefulmind43/commit/a5d096d)).
