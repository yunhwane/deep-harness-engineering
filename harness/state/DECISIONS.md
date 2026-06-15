# DECISIONS.md — design rationale log

> State subsystem (L5). Preserves the **"why"** that compaction discards. Append-only:
> decision · why · rejected alternatives · constraints · date. Newest at top.

## 2026-06-15: example-app is a minimal Task API
- **Why:** the harness needs something real to define, verify, and track; a CRUD Task
  API is the smallest thing that exercises feature lists (L8) and E2E (L10).
- **Rejected:** a larger/realistic app — would pull focus to app logic, not the harness.
- **Constraint:** stays tiny; features added only once the harness can govern them.

## 2026-06-15: example-app stack/runtime deliberately undecided
- **Why:** choosing now would be premature and risk aspirational docs. The Environment
  subsystem (L6) is where this decision belongs.
- **Rejected:** picking Node/Python now — no lecture-driven reason yet.
- **Constraint:** when chosen, record here and add lock + version files (L6).

## 2026-06-15: AGENTS.md lives at repo root, not harness/instructions/
- **Why:** agents auto-read a root `AGENTS.md`; putting it elsewhere breaks the convention.
- **Constraint:** root file stays a router (≤200 lines, L4); detail goes in topic docs.

## 2026-06-15: git on main, one commit per lecture
- **Why:** Atomicity (L3) — one logical unit = one checkpoint; clean history per concept.
- **Note:** the first commit bundled L1-L3 (work predated git init); one-per-lecture since.
