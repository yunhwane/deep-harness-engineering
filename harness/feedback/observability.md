# Observability (L11)

> Built into the harness, not bolted on. Two layers — both required. Feeds the L1
> Diagnostic Loop: you can only attribute a failure to a layer if you can see what happened.

## Runtime observability — "what did the system do?"
- Structured JSON logs via the Fastify logger (`src/server.ts` enables `logger: true`).
- Per request: `reqId`, method, url, status, `responseTime`; plus lifecycle (`example-app ready`).
- App/store code logs through `req.log` / `app.log`, never `console.*` — enforced by
  `scripts/check-architecture.sh` Rule 2. (That rule was this lecture's foreshadowing.)
- Tests keep the logger off (`buildApp()` default) to stay quiet.

## Process observability — "why was this change accepted?"
- **Sprint contract** (`harness/scope/sprint-contract.md`): scope + per-item validation +
  explicit exclusions, agreed *before* coding.
- **Evaluator rubric** (`evaluator-rubric.md`): turns the independent verifier's judgment
  into reproducible, dimensioned scoring.
- **Verification log** (`verification-log.md`): the persisted evaluator evidence — which
  verifier accepted which feature, with what observed outputs. This is our decision-layer trace.

## Why it belongs inside
Without it: correctness vs appearance is indistinguishable, evaluation goes mystical,
retries become blind guessing, and handoffs lose 30-50% of a session to re-diagnosis.
Agents can't fix this alone — they don't know what they don't know to log.
