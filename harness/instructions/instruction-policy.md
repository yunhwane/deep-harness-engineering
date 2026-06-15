# Instruction Policy

> From Lecture 4. How instruction files in this repo must be written so they don't rot
> into one bloated, ignored monolith. Consult **before adding or editing any rule**.

## Limits
- **Router** (`AGENTS.md`): 50-200 lines. Overview + quick-start + ≤15 hard constraints
  + a routing table. It points; it does not inline detail.
- **Topic docs** (e.g. `CONSTRAINTS.md`, `ARCHITECTURE.md`, `*-standards.md`): 50-150
  lines each, one concern per file, loaded only when its *when* condition matches.

## Positioning (Lost in the Middle — Liu et al. 2023)
- Put the rules most likely to be violated at the **top or bottom** of a file, never the
  middle. The router's hard constraints sit at the end of `AGENTS.md` for this reason.
- Prefer encoding a rule **in the code** (types, interface comments, config) over
  repeating it in prose.

## Metadata every rule needs
A rule with no rationale can't be audited or retired. Each instruction should carry:
1. **Source / rationale** — why it exists (e.g. "L3: avoids Knowledge Decay").
2. **Applicability** — when it applies (the *when* in the routing table).
3. **Sunset** — the condition under which it should be deleted (e.g. "remove once the
   Feedback subsystem provides automated validation, L9-L11").

## Anti-patterns to refuse
- Adding a rule reactively after every failure (long-term toxicity). First ask: does it
  belong in a topic doc, or in a test, or nowhere?
- Refusing to delete stale/contradictory rules. Deletion is maintenance, not loss.
- Treating instruction files as reference encyclopedias instead of navigation tools.

## Audit cadence
Periodically (or when a file nears its line limit), audit each rule against its three
metadata fields. Anything past its sunset, contradicted, or rationale-less gets cut.
