# Evaluator Rubric (L11)

> Makes the independent verifier (L9 worker≠evaluator) **reproducible**: different
> evaluators score the same work the same way. Used when deciding whether a feature may
> flip to `passing`. Score every dimension; any **FAIL** blocks `passing`.

| Dimension | PASS | WEAK | FAIL |
|-----------|------|------|------|
| **Behavioral correctness** | the feature's `verification` command succeeds against a live server | passes only via mocks/inject, not live | command fails or not run |
| **Failure paths** | error cases (404/400) verified, not just happy path | partial | unchecked |
| **Architecture compliance** | `make arch` clean | — | boundary violation |
| **Test evidence** | `make check` green incl. relevant test | tests exist but flaky/skipped | no test |
| **Independence** | verified by a separate agent/run, not the author's say-so | — | self-assessed only |

## How to use
1. Verifier runs `make check` + live verification for the feature.
2. Verifier scores each dimension with the **observed evidence** cited (not opinion).
3. All PASS (no FAIL) → harness authorizes `state: passing` and records the verdict in
   `verification-log.md`. Otherwise the feature stays `active`/`blocked` with the failing
   dimension named.
