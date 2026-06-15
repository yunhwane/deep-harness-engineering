# Environment subsystem (L6)

> The "gas range." Makes the environment **self-describing and reproducible** so a new
> session reaches a working state without guessing. Fixes failure layer 3.

## The bootstrap contract (4 commands)
A new session can rely on these (root `Makefile`):

| Command | Does | New session can... |
|---------|------|--------------------|
| `make setup` | `npm install` (writes `package-lock.json`) | start the project |
| `make test`  | `vitest run` | run tests |
| `make check` | `typecheck && test` — the gate | verify consistency |
| `make dev`   | `tsx watch src/server.ts` | run it locally |

Progress + next steps: `harness/state/PROGRESS.md`. That's the 4th bootstrap condition.

## Reproducibility / version pinning
- Runtime pinned: `example-app/.nvmrc` (Node 26) + `engines.node >=22` in package.json.
- Dependencies locked: `example-app/package-lock.json` (committed).
- Stack: Node + TypeScript + Fastify + vitest. Rationale in `../state/DECISIONS.md`.

## Initialization acceptance (verified, not claimed — L1/L9)
- [x] `make setup` succeeds from scratch (97 packages)
- [x] `make check` passes: `tsc` clean + 1 test green (`GET /health`)
- [x] server actually boots and answers: `curl :3999/health → {"status":"ok"}`
- [x] run/test answerable from repo alone (this file + Makefile + AGENTS.md)
- [x] committed to git as the init checkpoint

## Deliberately NOT done here
No CRUD/Task routes yet. Init produces **infrastructure, not features** (L6). Features
arrive once the feature list governs them (L8). Building them now = the overreach L7 warns about.
