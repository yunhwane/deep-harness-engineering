# L8 — Why feature lists are harness primitives

## Thesis
A feature list is not optional planning — it's the **irreducible data structure** every
other harness component depends on (scheduler, verifier, handoff reporter, progress
tracker). Like a DB schema, it can't be bypassed.

## Triple structure (all required)
`id` · `behavior` (end-to-end) · `verification` (executable) · `state` · `evidence`.
Missing any → incomplete feature.

## States (harness-controlled, agent cannot self-mark)
not_started → active → passing (only via verification success; **irreversible**); blocked
as a side state. Pass-State Gating + no regressions.

## Authority split
Agent: run verification, mark active, submit evidence, *propose* transitions.
Harness: read state, execute verification, authorize transitions, block regressions.

## Connects three things
scope (behavior) + objective validation (verification) + progress visibility (state
distribution) → a fresh session reads state in ~3 min, not ~20.

## Terms / data
Harness primitive, Triple Structure, Single Source of Truth, Back-pressure, Granularity
(~one session/feature). Structured feature lists → +45% completion, no duplicate impls.

## Applied in this repo
- `harness/scope/feature_list.json` — Task API scope: F00 `/health` **passing**
  (evidence: commit + test), F01-F05 CRUD **not_started** (targets, not claims).
- `harness/scope/feature-list-schema.md` — schema, state machine, VCR/back-pressure.
- Validated with `node -e`: 6 features, 1 passing, 0 active (WIP=1 holds).

## Dogfooding insight
WIP=1 (L7) constrained us right now: we wrote the *spec* for 5 CRUD features but
implemented **none** — implementing all would be the overreach L7 names. Each feature
moves active→passing in a later lecture, one at a time, gated by its verification. The
file is also our own externalized scope surface: it, not this chat, is the source of truth.
