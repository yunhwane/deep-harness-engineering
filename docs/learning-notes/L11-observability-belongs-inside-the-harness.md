# L11 — Why observability belongs inside the harness

## Thesis
Observability must be architected into the harness from the start. Without it: appearance
vs correctness is indistinguishable, evaluation goes mystical, retries become blind
guessing, handoffs lose 30-50% of a session to re-diagnosis.

## Two layers (both required)
- **Runtime (system)** — "what did the system do?": lifecycle, feature-path execution,
  data flow, resources, full error context.
- **Process (decision)** — "why was this change accepted?": sprint contracts, evaluator
  rubrics, planning artifacts, scoring evidence.

## Key concepts
Task trace (start→done decision path), Sprint contract (pre-coding agreement: scope /
per-item validation / explicit exclusions), Evaluator rubric (subjective → dimensioned
scoring), OpenTelemetry (trace per session, span per task, sub-span per verification).

## Data
planner-generator-evaluator: no observability → 3-4 blind retries, 45 min; with it →
1 iteration, 15 min, reproducible. ~3x.

## Anti-patterns
self-logging without structure, inconsistent formats, deferring observability, treating
process visibility as optional, scoring without rubrics.

## Applied in this repo
- **Runtime:** enabled structured JSON logging — `buildApp({logger})`; `server.ts` turns it
  on. Real runs emit lifecycle (`example-app ready`) + per-request trace (`reqId`, method,
  status, `responseTime`). App code logs via `app.log`/`req.log`, never `console.*`
  (arch Rule 2 — which existed precisely to set this up). Tests keep logging off.
- **Process:** `harness/feedback/observability.md` (overview), `evaluator-rubric.md`
  (reproducible scoring for the verifier), `verification-log.md` (persisted verdicts for
  F01 and F02-F05 — the decision-layer trace), `harness/scope/sprint-contract.md` (template
  + our implicit per-lecture contracts made explicit).

## Dogfooding insight
The decision-layer artifacts are *retroactive observability of our own process*: the
independent-verifier verdicts we already produced (L9, L10) were ephemeral sub-agent
messages — now they live in `verification-log.md`, so a future session reads "why F01-F05
were accepted" instead of re-verifying. We also closed the loop arch Rule 2 opened: it
banned `console.*` two lectures early *so that* this lecture's structured logging is the
only path. The harness was built to make its own future correct.
