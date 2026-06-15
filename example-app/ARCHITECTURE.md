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
- `GET /health` — **passing** (F00)
- `POST /tasks` — **passing** (F01): 201 with {id,title,done:false}; 400 on empty title
- `GET/PATCH/DELETE /tasks` — not_started (F02-F05)
Validate with `make check` from repo root.
