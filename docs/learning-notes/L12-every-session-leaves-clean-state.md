# L12 — Why every session must leave a clean state

## Thesis
Clean state is a **mandatory completion requirement**, not a refinement. Long-term
reliability = operational discipline, not single-run success. Without cleanup, entropy
compounds across sessions.

## Clean state = 5 dimensions (all required)
Build (compiles), Test (all pass incl. pre-existing), Progress (machine-readable status),
Artifact (no stale temp/debug/TODO), Startup (standard init works, no manual steps).

## Entropy data
No discipline (12 wks): build 100%→68%, test 100%→61%, startup 5min→60min+. With cleanup:
97% / 95% / 9min. "Later" never happens (Lehman's laws).

## Strategy
- Dual-mode: immediate (every session end) + periodic (weekly scan, quality doc, drift).
- Idempotent cleanup (`-f`, restore known state, validate after).
- **Harness simplification:** monthly disable one constraint; remove if no degradation —
  yesterday's safeguard is today's overhead as capability grows.

## The redefinition ⭐
**Session Completion = task passes validation AND clean-state checks pass.** Both
non-negotiable. Belongs in AGENTS.md/CLAUDE.md. ACID-like: complete+clean, or rollback.

## Applied in this repo
- `scripts/clean.sh` (idempotent): stop stray dev servers, remove scratch logs.
- `scripts/clean-state.sh` + `make clean-state`: cleanup → `make check` → assert git tree
  clean. The 5 dimensions verified mechanically.
- AGENTS.md: §4 + offboarding now end with `make clean-state`; CONSTRAINTS.md encodes
  "Session Completion = validation AND clean state".
- **Harness simplification, for real:** the Cold-Start-as-primary-validation rule hit its
  sunset (automated `make check` now exists) → demoted to complementary; logged in
  CONSTRAINTS.md and the doc updated. (No stale docs.)
- `harness/feedback/quality-report.md`: per-module grades; flags `store.ts` lacking a
  direct unit test as the top (non-blocking) priority.

## Dogfooding insight
This lecture was triggered by a real failure we hit in L11: a cwd drift made `make check`
silently no-op, and a commit landed unverified. `make clean-state` + `clean.sh`'s
stray-process kill directly close that hole — the harness grew a defense from its own
incident. And the harness-simplification practice let us *delete* a rule (cold-start as
gate) instead of only ever adding — proof the harness can shrink as it matures.
