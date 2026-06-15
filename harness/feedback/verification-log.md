# Verification Log (L11)

> Decision-layer trace: the persisted evaluator evidence answering "**why was this
> accepted?**" Append a row when the harness flips a feature to `passing`. This is the
> record a future session reads instead of re-diagnosing.

| Date | Feature(s) | Verifier | Observed evidence | Verdict |
|------|-----------|----------|-------------------|---------|
| 2026-06-15 | F01 POST /tasks | sub-agent `ac6235` (independent) | `make check` green; live `curl POST → 201 {done:false}`; empty/whitespace/non-string title → 400 | PASS |
| 2026-06-15 | F02-F05 GET/list/PATCH/DELETE | sub-agent `ad737b` (independent) | `make check` green; live curl: list `[]`→`[{…}]`; GET/PATCH/DELETE unknown → 404; delete-then-GET → 404 | PASS |
| 2026-06-15 | F06 `?done` filter | **3-agent workflow** — planner `adcb38` → generator `a23512` → evaluator `a47cf8` | rubric all-PASS; live curl: `?done=true/false` exact filter, no-param all, `?done=maybe/1/`(empty)` → 400 JSON; F00/F03 regression OK; `make check` 14 tests | PASS |

## Notes
- F00 `/health` predates the verifier pattern; evidence is its unit test + `make check` (L6).
- Verdicts were scored against `evaluator-rubric.md`; all dimensions PASS.
- F06 was produced end-to-end by the three-agent workflow
  (`harness/workflows/three-agent-workflow.md`): the planner couldn't code, the generator
  couldn't self-mark passing, and an independent evaluator gated the transition.
