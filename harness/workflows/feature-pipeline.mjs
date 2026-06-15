export const meta = {
  name: 'feature-pipeline',
  description: 'Add a feature via planner -> generator -> evaluator panel (majority vote)',
  phases: [
    { title: 'Plan', detail: 'planner writes sprint contract + feature_list entry (no code)' },
    { title: 'Generate', detail: 'generator implements to the contract, drives make check green' },
    { title: 'Evaluate', detail: '3 independent evaluators score the rubric; majority vote' },
  ],
}

// Reusable orchestration (harness artifact). The feature to add is passed via `args`:
//   { id, idea }   e.g. { id: 'F07', idea: 'GET /tasks/stats -> {total,done,pending}' }
//
// HARNESS CONTRACT (learned the hard way — first run was rejected 0/3 because of this):
//   After the Plan phase, the HARNESS (main loop) must insert the planner's feature entry
//   into harness/scope/feature_list.json as `not_started` BEFORE relying on the panel —
//   workflow scripts can't write files, and evaluators treat feature_list as the source of
//   truth, so a missing row is a legitimate Handoff-readiness failure. Only an Accept
//   verdict then authorizes the harness to flip it to `passing`.
const REPO = '/Users/jeonyunhwan/Documents/my-workspace/deep-harness-engineering'
// args can arrive as a JSON string; normalize to an object (the tool passes it verbatim).
const FEATURE =
  typeof args === 'string'
    ? JSON.parse(args)
    : (args ?? { id: 'F07', idea: 'GET /tasks/stats returns 200 {total, done, pending}; done+pending===total; empty store -> zeros' })
const PANEL = 3

const PLANNER_SCHEMA = {
  type: 'object',
  required: ['sprint_contract', 'feature'],
  additionalProperties: false,
  properties: {
    sprint_contract: { type: 'string' },
    feature: {
      type: 'object',
      required: ['id', 'behavior', 'verification', 'state', 'evidence'],
      additionalProperties: false,
      properties: {
        id: { type: 'string' },
        behavior: { type: 'string' },
        verification: { type: 'string' },
        state: { type: 'string' },
        evidence: { type: 'string' },
      },
    },
  },
}

const GENERATOR_SCHEMA = {
  type: 'object',
  required: ['summary', 'make_check_passed', 'changed_files'],
  additionalProperties: false,
  properties: {
    summary: { type: 'string' },
    make_check_passed: { type: 'boolean' },
    changed_files: { type: 'array', items: { type: 'string' } },
  },
}

const EVALUATOR_SCHEMA = {
  type: 'object',
  required: ['verdict', 'scores', 'evidence', 'concerns'],
  additionalProperties: false,
  properties: {
    verdict: { type: 'string', enum: ['Accept', 'Revise', 'Block'] },
    scores: { type: 'string' },
    evidence: { type: 'string' },
    concerns: { type: 'string' },
  },
}

phase('Plan')
const plan = await agent(
  `You are the PLANNER (plan only — do NOT write/edit any files or code).
Repo: ${REPO}
Read AGENTS.md, harness/scope/feature_list.json, harness/scope/feature-list-schema.md,
harness/scope/sprint-contract.md, harness/feedback/evaluator-rubric.md, example-app/src/*.
Plan feature ${FEATURE.id}: "${FEATURE.idea}".
Return a sprint contract (scope / per-item validation / explicit exclusions / definition of done)
and the feature_list entry (id ${FEATURE.id}, behavior, an EXECUTABLE verification command runnable
against a live server on port 3000, state "not_started", evidence "").`,
  { schema: PLANNER_SCHEMA, label: 'planner', phase: 'Plan', agentType: 'general-purpose' },
)

phase('Generate')
const gen = await agent(
  `You are the GENERATOR. Implement EXACTLY this, no scope creep, no unrelated refactor.
Repo: ${REPO} (work in example-app/).
Feature ${FEATURE.id}: "${FEATURE.idea}".
Sprint contract:
${plan?.sprint_contract ?? '(planner failed — implement the feature idea directly)'}
Hard rules: app/store code must not use console.* (only src/server.ts); only src/server.ts may .listen();
do NOT edit harness/scope/feature_list.json (state is harness-controlled). Add a test. Drive
\`make check\` GREEN from the repo root. Report changed files and whether make check passed.`,
  { schema: GENERATOR_SCHEMA, label: 'generator', phase: 'Generate', agentType: 'general-purpose' },
)

phase('Evaluate')
const verdicts = await parallel(
  Array.from({ length: PANEL }, (_, i) => () =>
    agent(
      `You are EVALUATOR ${i + 1} of ${PANEL} — independent and skeptical. Do NOT modify files.
Repo: ${REPO}
Score feature ${FEATURE.id} ("${FEATURE.idea}") against harness/feedback/evaluator-rubric.md
(read it). Verify with REAL evidence: run \`make check\` from repo root; boot the server yourself
on PORT=45${i}0 (background) and issue your OWN curl requests including edge cases (e.g. empty store,
after creating/completing tasks); shut it down. Map your dimension scores to a verdict:
Accept (all PASS), Revise (only WEAK), or Block (any FAIL). Cite the outputs you observed.`,
      { schema: EVALUATOR_SCHEMA, label: `evaluator-${i + 1}`, phase: 'Evaluate', agentType: 'general-purpose' },
    ),
  ),
)

const valid = verdicts.filter(Boolean)
const accepts = valid.filter((v) => v.verdict === 'Accept').length
const decision = accepts > PANEL / 2 ? 'Accept' : 'NotAccept'
log(`panel: ${accepts}/${PANEL} Accept -> ${decision}`)

return {
  feature: FEATURE,
  plan,
  generator: gen,
  panel: valid,
  accepts,
  panelSize: PANEL,
  decision,
}
