import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../../src/app'
import { reset } from '../../src/store'

/**
 * Real E2E (L10): boots an actual server on an ephemeral port and drives it with real
 * `fetch` over TCP — not `app.inject`. This exercises true system boundaries and, crucially,
 * **state propagation across requests** (the in-memory store persisting between calls), plus
 * the failure paths (404). Unit/inject tests are blind to cross-request state.
 */
describe('E2E: Task API full CRUD flow', () => {
  let app: FastifyInstance
  let base: string

  beforeAll(async () => {
    reset()
    app = buildApp()
    await app.listen({ port: 0, host: '127.0.0.1' })
    const addr = app.server.address()
    const port = typeof addr === 'object' && addr ? addr.port : 0
    base = `http://127.0.0.1:${port}`
  })

  afterAll(async () => {
    await app.close()
  })

  it('create → list → get → patch → delete, with 404 failure paths', async () => {
    const json = { 'content-type': 'application/json' }

    // F01 create
    let r = await fetch(`${base}/tasks`, {
      method: 'POST',
      headers: json,
      body: JSON.stringify({ title: 'write e2e tests' }),
    })
    expect(r.status).toBe(201)
    const created = await r.json()
    const id: string = created.id
    expect(created).toMatchObject({ title: 'write e2e tests', done: false })

    // F02 list — proves cross-request state propagation (the created task is there)
    r = await fetch(`${base}/tasks`)
    expect(r.status).toBe(200)
    const list = await r.json()
    expect(Array.isArray(list)).toBe(true)
    expect(list.some((t: { id: string }) => t.id === id)).toBe(true)

    // F03 get one
    r = await fetch(`${base}/tasks/${id}`)
    expect(r.status).toBe(200)
    expect((await r.json()).id).toBe(id)

    // F03 failure path: unknown id → 404
    r = await fetch(`${base}/tasks/does-not-exist`)
    expect(r.status).toBe(404)

    // F04 patch done:true
    r = await fetch(`${base}/tasks/${id}`, {
      method: 'PATCH',
      headers: json,
      body: JSON.stringify({ done: true }),
    })
    expect(r.status).toBe(200)
    expect((await r.json()).done).toBe(true)

    // F04 failure path: patch unknown id → 404
    r = await fetch(`${base}/tasks/does-not-exist`, {
      method: 'PATCH',
      headers: json,
      body: JSON.stringify({ done: true }),
    })
    expect(r.status).toBe(404)

    // F05 delete → 204
    r = await fetch(`${base}/tasks/${id}`, { method: 'DELETE' })
    expect(r.status).toBe(204)

    // F05 side effect verified: subsequent get → 404
    r = await fetch(`${base}/tasks/${id}`)
    expect(r.status).toBe(404)

    // F05 failure path: delete unknown id → 404
    r = await fetch(`${base}/tasks/does-not-exist`, { method: 'DELETE' })
    expect(r.status).toBe(404)
  })
})
