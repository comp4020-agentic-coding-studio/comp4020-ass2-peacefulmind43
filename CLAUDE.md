# Your harness

Verification-first. This course makes a lot of specific numeric claims (combo
counts, equity percentages, EV, pot-odds thresholds, Nash-equilibrium
frequencies, MDF, ICM figures, Kelly fractions). Every one of them is a place
the course can be quietly wrong, so every one of them is a place this harness
checks.

## The rule

**Any numeric claim that appears in course content (a lecture page, a worked
example, a deck slide) must have a matching spec test in `spec/` that computes
the expected value independently and asserts the content matches it.**
"Independently" means from first principles (combinatorics formula,
hypergeometric enumeration, the stated EV/Kelly formula, brute-force
enumeration for a toy game's equilibrium) — not by re-typing the number the
content already shows. A claim with no test attached does not ship.

When a test catches a real mismatch, fix the root cause (a wrong formula, a
mis-stated assumption, a stale number left behind after an edit elsewhere) —
not just the one number. If the same class of number keeps needing hand
fixes, that is a sign the harness is missing a shared helper, not a sign to
keep patching call sites.

## Content integrity

Claims about real poker theory or its history (who introduced a concept, what
a named result says, what a real solver's known output is) get checked
against a citable real source before they ship. Don't invent plausible-sounding
attributions or numbers to fill a gap — flag the gap instead.

## What the platform already covers

`pnpm build` already runs axe over every page and checks that internal links
and refs resolve inside the base path — don't re-implement either. This
harness is additive to that, focused on the course-specific claim-checking
the platform can't know to do.

## Commits

Small commits, one real change each, pushed as they happen — not batched.
Prefix with what kind of change it is (`content:`, `harness:`, `spec:`,
`process:`, `fix:`) so the history itself is legible without opening every
diff.
