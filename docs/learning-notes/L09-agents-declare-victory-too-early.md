# L9 — Why agents declare victory too early

## Thesis
Agents are systematically overconfident ("modern neural networks are systematically
overconfident"). Completion must be judged by **execution**, externalized from the
agent's confidence.

## 3-layer termination gate (sequential, stop on first failure)
1. Static (tsc/lint) — cheapest, least info.
2. Runtime — tests run, app boots, core path executes. Execution is the evidence.
3. System/E2E — real server, full flow. Final defense.
All three required for `passing`.

## "Code written" ≠ "verified done"
Unit tests mock deps → miss interface mismatch, cross-layer state, env issues. Necessary, not sufficient.

## Rules
- No refactor before the core feature passes (Refactoring Trap). Priority: correctness → perf → style.
- **Worker ≠ evaluator** — same model judging its own output is biased. planner→generator→evaluator beats bare runs.
- Errors = teacher annotations (specific, actionable).

## Terms
Premature Completion Declaration, Confidence Calibration Bias, Termination Criteria,
Verification-Validation Dual Gate, Completion Priority.

## Applied in this repo — first feature driven active→passing
- `harness/feedback/definition-of-done.md` — the 3-layer gate + worker≠evaluator rule.
- Implemented **F01 POST /tasks** (generator role): `src/store.ts` (in-memory) + route in `src/app.ts`.
- `test/tasks.test.ts` — happy path + empty-title 400.
- Ran the gate for real:
  - L1 `tsc` clean; L2 `make check` → 3 tests green;
  - L3 booted server, `curl POST /tasks → 201 {done:false}`, empty title → 400.
- **Independent verifier sub-agent** (evaluator role) re-ran everything skeptically,
  added whitespace/non-string edge probes, returned VERDICT: PASS.
- Only THEN flipped `feature_list.json` F01 → `passing` with evidence. Now passing 2/6.
- Logged persistence decision (in-memory) in DECISIONS.md.

## Dogfooding insight
This is the whole loop in one lecture: scope (F01) → implement → 3-layer gate → an
**independent agent** verifies → harness authorizes `passing`. I never self-marked it
done; the verifier's PASS authorized the transition — exactly the worker/evaluator
separation L9 prescribes, and the Pass-State Gating L8 prescribes, working together.
