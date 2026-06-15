# Evaluator Rubric (L11)

> Makes the independent verifier (L9 worker≠evaluator) **reproducible**: different
> evaluators score the same work the same way. Used when deciding whether a feature may
> flip to `passing`. Score every dimension; any **FAIL** blocks `passing`.

> Dimensions merge our automation-focused checks with the official curriculum rubric
> (Reliability, Maintainability, Handoff readiness). Any **FAIL** blocks `passing`.

| Dimension | PASS | WEAK | FAIL |
|-----------|------|------|------|
| **Behavioral correctness** | the feature's `verification` command succeeds against a live server | passes only via mocks/inject, not live | command fails or not run |
| **Failure paths** | error cases (404/400) verified, not just happy path | partial | unchecked |
| **Architecture compliance** | `make arch` clean | — | boundary violation |
| **Test evidence** | `make check` green incl. relevant test | tests exist but flaky/skipped | no test |
| **Independence** | verified by a separate agent/run, not the author's say-so | — | self-assessed only |
| **Reliability** _(official)_ | result holds after restart/rerun with no edits | flaky | regresses |
| **Maintainability** _(official)_ | code + docs understandable by the next session | unclear | undocumented |
| **Handoff readiness** _(official)_ | a fresh session can continue from repo artifacts alone | partial | needs verbal context |

## Verdict (official Accept / Revise / Block)
- **Accept** — all dimensions PASS (no FAIL). Harness authorizes `state: passing`, records
  the verdict + evidence in `verification-log.md`.
- **Revise** — only WEAK dimensions, no FAIL. Generator fixes the named items; re-evaluate.
- **Block** — any FAIL, or an external blocker. Feature stays `active`/`blocked`; name the
  failing dimension and required follow-up.

## How to use
1. Verifier runs `make check` + live verification for the feature.
2. Verifier scores each dimension with the **observed evidence** cited (not opinion).
3. Map scores → verdict above. Only **Accept** flips the feature to `passing`.
