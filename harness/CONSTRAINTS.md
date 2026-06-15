# CONSTRAINTS.md

> Non-negotiable rules for working in this repo. Explicit **MUST / MUST NOT** so an
> agent never has to guess an unwritten convention (the L3 e-commerce failure).

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

## State / ACID
- One logical unit of work = one commit (**Atomicity**). No half-done states committed.
- **MUST** keep `README.md` progress checklist and `AGENTS.md` §5 in sync with reality
  (**Durability** — "paper doesn't lie").

## Authority
- The **repository is the single source of record**. If chat history, memory, or any
  external source conflicts with the repo, the **repo wins** (anti-pattern: *External
  Authority*).
