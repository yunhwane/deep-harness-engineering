# example-app — ARCHITECTURE

> Knowledge near the code (L3 principle #1). Currently a plan, not an implementation —
> stated honestly (no aspirational claims; CONSTRAINTS.md).

## Responsibility
A minimal **Task API**: create / read / update / delete tasks. Exists only to give the
harness something real to define, verify, and track. Scope is kept tiny on purpose.

## Planned interface (to be finalized as a feature list in L8)
| Method | Path | Purpose |
|--------|------|---------|
| POST   | `/tasks`     | create a task |
| GET    | `/tasks`     | list tasks |
| GET    | `/tasks/:id` | read one task |
| PATCH  | `/tasks/:id` | update a task |
| DELETE | `/tasks/:id` | delete a task |

## Stack (decided L6)
- Node 26 + TypeScript (Bundler module resolution) + **Fastify** + **vitest**.
- `src/app.ts` exports `buildApp()` (factory, no listen) so tests use `app.inject(...)`.
- `src/server.ts` is the listen entrypoint. Run via `make dev`.
- `src/store.ts` — in-memory task store (`Map`), module-level, with `reset()` (decided L9).

## Status (mirrors feature_list.json — that file is authoritative)
All features **passing (8/8)**:
- `GET /health` (F00), `POST /tasks` (F01), `GET /tasks` (F02), `GET /tasks/:id` (F03),
  `PATCH /tasks/:id` (F04), `DELETE /tasks/:id` (F05), `GET /tasks?done=` filter (F06),
  `GET /tasks/stats` → {total,done,pending} (F07; registered before `/tasks/:id`).
- Unknown ids → 404; bad bodies / invalid `done` → 400.
- Validate with `make check` (architecture checks + typecheck + unit/integration + E2E).

## Boundaries (enforced by scripts/check-architecture.sh)
- Only `src/server.ts` may `.listen()` — `buildApp()` stays side-effect-free.
- No ad-hoc `console.*` in `src/app.ts`/`src/store.ts` (logging via observability, L11).
