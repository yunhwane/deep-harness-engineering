# DECISIONS.md — design rationale log

> State subsystem (L5). Preserves the **"why"** that compaction discards. Append-only:
> decision · why · rejected alternatives · constraints · date. Newest at top.

## 2026-06-15: example-app stack = Node 26 + TypeScript + Fastify + vitest
- **Why:** chosen by the user at L6. Fastify gives a real server for E2E later (L10) with
  one dependency and good TS types; vitest is TS-native; `app.inject` enables fast tests.
- **Rejected:** Python+FastAPI (recommended but not chosen), Go (smaller ecosystem here).
- **Constraint:** module resolution = Bundler (extensionless imports work in tsc + tsx +
  vitest alike); Node pinned via `.nvmrc` (26) + `engines.node >=22`.

## 2026-06-15: defer the npm dev-dependency vulnerabilities
- **Why:** all 5 advisories live in the dev-only vitest/vite/esbuild chain, never shipped.
  Fixing needs `vitest@4` (breaking) and would destabilize a just-validated foundation —
  exactly the init churn L6 warns against.
- **Rejected:** `npm audit fix --force` now (risks breaking `make check`).
- **Constraint / sunset:** revisit if example-app is ever deployed or runs untrusted input.

## 2026-06-15: example-app is a minimal Task API
- **Why:** the harness needs something real to define, verify, and track; a CRUD Task
  API is the smallest thing that exercises feature lists (L8) and E2E (L10).
- **Rejected:** a larger/realistic app — would pull focus to app logic, not the harness.
- **Constraint:** stays tiny; features added only once the harness can govern them.

## 2026-06-15: example-app stack/runtime deliberately undecided  — SUPERSEDED at L6 (see top)
- **Why:** choosing at L3 would have been premature. Decision rightly belonged to the
  Environment subsystem (L6), where it was made: Node + TypeScript + Fastify.
- **Kept for history:** shows we deferred deliberately rather than forgot.

## 2026-06-15: AGENTS.md lives at repo root, not harness/instructions/
- **Why:** agents auto-read a root `AGENTS.md`; putting it elsewhere breaks the convention.
- **Constraint:** root file stays a router (≤200 lines, L4); detail goes in topic docs.

## 2026-06-15: git on main, one commit per lecture
- **Why:** Atomicity (L3) — one logical unit = one checkpoint; clean history per concept.
- **Note:** the first commit bundled L1-L3 (work predated git init); one-per-lecture since.
