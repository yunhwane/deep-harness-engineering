# CONSTRAINTS.md

> Non-negotiable rules for working in this repo. Explicit **MUST / MUST NOT** so an
> agent never has to guess an unwritten convention (the L3 e-commerce failure).
> Per `instructions/instruction-policy.md` (L4), each rule carries its **source** (why)
> and, where it's temporary, a **sunset** (when to delete it).

## Documentation honesty
- **MUST NOT** write aspirational docs — no documenting commands, tests, or features
  that don't exist yet (anti-pattern: *Knowledge Decay*). Docs describe what *is*.
- **MUST** update docs in the same change as the code/state they describe (principle #4).

## Harness discipline
- Every artifact added under `harness/` **MUST** map to one of the five L1 failure
  layers (or be explicitly meta, like `diagnostics/`). If it reduces no known failure
  mode, it **MUST NOT** be added (it's decoration — see `diagnostics/failure-layers.md`).
- Instruction files **MUST** stay maps, not manuals: AGENTS.md ~100 lines, pointing
  to detail rather than inlining it (L2 principle #2).

## Scope (WIP=1)
- **MUST** keep Work-in-Progress = 1: exactly one task `active`; finish + verify before
  starting the next. No multi-tasking as "optimization". _(source: L7)_
- "Done" **MUST** mean **executable evidence** (a passing command), never "looks right".
  _(source: L7 — full policy: `scope/scope-policy.md`)_
- Task state **MUST** live in a file (the scope surface), not only in the conversation. _(source: L7)_

## State / ACID
- One logical unit of work = one commit (**Atomicity**). No half-done states committed.
- **MUST** keep `README.md` progress checklist and `AGENTS.md` §5 in sync with reality
  (**Durability** — "paper doesn't lie").

## Authority
- The **repository is the single source of record**. If chat history, memory, or any
  external source conflicts with the repo, the **repo wins** (anti-pattern: *External
  Authority*).  _(source: L3)_

## Session completion (L12)
- A session is complete **only if** the task passes validation **AND** `make clean-state`
  passes (build, test, progress committed, no stray artifacts). Both non-negotiable.
  _(source: L12)_

## Harness simplification log (L12)
- **2026-06-15 — retired the interim Cold-Start-as-primary-validation rule.** Its sunset
  (set at L3/L4) has arrived: automated validation now exists (`make check`). Primary
  validation is `make check`; the Cold-Start Test (`diagnostics/cold-start-test.md`)
  remains a *complementary* repo-completeness check, no longer the gate. This is the
  monthly "remove a constraint that capability/tooling made redundant" practice in action.
