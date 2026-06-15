# Sprint Contract (L11)

> A short agreement negotiated **before** coding, so rejection criteria are explicit up
> front instead of discovered at evaluation. Front-loaded alignment = fewer blind retries.

## Template
```
## <date> — <goal>
- In scope:      <components/files this change may touch>
- Per-item validation: <what command proves each item>
- Out of scope (explicit exclusions): <what will NOT change>
- Definition of done: <make check + feature verification + independent verifier>
```

## How we've been using it (implicit → now explicit)
Each lecture has effectively been a one-feature sprint contract:
- **In scope:** that lecture's artifact(s) + (when relevant) one feature in `feature_list.json`.
- **Validation:** `make check` + the feature's verification + independent verifier.
- **Exclusions:** other features stay `not_started` (WIP=1, L7) — e.g. L9 touched only F01.

## Worked example (L9)
```
## 2026-06-15 — implement F01 POST /tasks
- In scope:      example-app/src/store.ts, src/app.ts (POST /tasks), test/tasks.test.ts
- Per-item validation: make check; curl POST /tasks -> 201 {done:false}; empty title -> 400
- Out of scope: F02-F05 (stay not_started), persistence engine, refactors
- Definition of done: 3-layer gate + independent verifier PASS, then feature_list -> passing
```
