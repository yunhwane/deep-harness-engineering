# PROGRESS.md — session journal

> State subsystem (L5). The handoff document: a fresh session reads this first to reach
> working state in minutes, not by re-exploring. Keep it current — stale = worse than none.

## Current status
- **Latest commit:** `0b9c98b` (L4: distribute instructions)
- **Tests:** none yet (no app code; Feedback subsystem arrives L9-L11)
- **Lint:** none yet
- **Cold-Start Test:** passing — `AGENTS.md` answers all 5 questions

## Completed
- [x] L1 — five failure layers + Diagnostic Loop
- [x] L2 — five-subsystem harness map + slot layout
- [x] L3 — git init, AGENTS.md, CONSTRAINTS.md, cold-start test
- [x] L4 — routing table + instruction policy
- [x] L5 — PROGRESS.md + DECISIONS.md + session routines

## In progress
- (nothing — between lectures)

## Known issues
- None. (When the app exists, failing tests get named here with *why*.)
- The "Latest commit" line lags one checkpoint by design: offboarding writes it, next
  onboarding reconciles it to the just-made commit. Reconcile at start of L6.

## Next steps (priority order)
1. L6 — initialization phase; **decide example-app stack/runtime** (currently undecided).
2. L7 — scope control (overreach/under-finish).
3. L8 — feature_list.json (then example-app gets its first real spec).

## How to resume (onboarding)
Read this file → read `harness/state/DECISIONS.md` → check `README.md` progress →
continue from "Next steps". Full routine in `AGENTS.md`.
