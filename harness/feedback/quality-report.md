# Quality Report (L12)

> Active quality artifact: grades each module so a new session targets the lowest-scoring
> areas first, with no diagnostic delay. Update at periodic (weekly) cleanup. Scale: ✅ good
> / ⚠️ watch / ❌ act.

| Module | Validation | Agent comprehension | Test stability | Arch compliance | Conventions |
|--------|-----------|---------------------|----------------|-----------------|-------------|
| `example-app/src/app.ts` | ✅ make check | ✅ small, one route each | ✅ unit+integration+E2E | ✅ no listen, no console | ✅ |
| `example-app/src/store.ts` | ✅ via routes | ✅ trivial Map | ⚠️ covered only via routes, no direct unit test | ✅ | ✅ |
| `example-app/src/server.ts` | ✅ E2E boots it | ✅ | ✅ | ✅ (sole listener) | ✅ |
| `harness/` docs | ✅ cold-start | ✅ routed via AGENTS.md | n/a | n/a | ✅ map-not-manual |

## Priorities (lowest first)
1. `store.ts` — add a direct unit test (or accept route+E2E coverage as sufficient and
   note it). Currently ⚠️ — no standalone unit test. Not blocking; logged so it's visible.

## Drift watch
- npm dev-dep advisories (PROGRESS.md known issue) — still deferred, dev-only.
