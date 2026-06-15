# feature_list.json — schema (the harness primitive, L8)

> Irreducible foundational data structure. The Scheduler, Verifier, Handoff Reporter, and
> Progress Tracker all read it. It is the **single source of truth** for scope — if it
> disagrees with the conversation or a code comment, **this file wins**.

## Per-feature triple structure (all fields required)
| Field | Meaning |
|-------|---------|
| `id` | unique (`F00`, `F01`, …) |
| `behavior` | precise **end-to-end** behavior — what "done" means |
| `verification` | an **executable** command/test that objectively proves the behavior |
| `state` | one of `not_started` / `active` / `blocked` / `passing` |
| `evidence` | commit hash / test log proving a `passing` state (empty until then) |

## State machine (harness-controlled)
```
not_started --(scheduler picks)--> active --(verification succeeds)--> passing
                                      |                                   ^
                                      +--(dependency/issue)--> blocked ---+
```
- `active → passing` **only** when `verification` actually succeeds (Pass-State Gating).
- `passing` is **irreversible** — no regressions back to `not_started`.
- An agent proposes transitions and runs verification; it **never** self-marks `passing`.

## Granularity
One feature ≈ one session (~2-4h). Too narrow ("add a field") and too broad ("build
payments") are both anti-patterns. Our CRUD features (F01-F05) are sized one-per-session.

## Derived metrics
- **VCR** = passing ÷ activated (L7). Block new activation when VCR < 1.0.
- **Back-pressure** = count of non-`passing` features. Zero ⇒ project complete.
- Current: 1 passing, 5 not_started, 0 active (validated with `node -e`).

## Note on verification commands
F00-F03 use `curl`; F04-F05 point to e2e tests that the **Feedback subsystem builds in
L10**. They are written as *targets* (state = `not_started`, evidence empty), not claims —
so this is scope definition, not aspirational documentation.
