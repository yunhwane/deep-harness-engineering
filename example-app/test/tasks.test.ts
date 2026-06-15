import { describe, it, expect } from 'vitest'
import { buildApp } from '../src/app'
import { reset } from '../src/store'

describe('F01: POST /tasks', () => {
  it('creates a task → 201 with {id, title, done:false}', async () => {
    const app = buildApp()
    const res = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: { title: 'buy milk' },
    })
    expect(res.statusCode).toBe(201)
    const body = res.json()
    expect(body.title).toBe('buy milk')
    expect(body.done).toBe(false)
    expect(typeof body.id).toBe('string')
    await app.close()
  })

  it('rejects a missing/empty title → 400', async () => {
    const app = buildApp()
    const res = await app.inject({ method: 'POST', url: '/tasks', payload: {} })
    expect(res.statusCode).toBe(400)
    await app.close()
  })
})

describe('F06: GET /tasks?done filter', () => {
  // Seeds two tasks (one completed, one not) into a fresh app and returns it.
  async function seeded() {
    reset()
    const app = buildApp()
    const a = (await app.inject({ method: 'POST', url: '/tasks', payload: { title: 'done one' } })).json()
    await app.inject({ method: 'POST', url: '/tasks', payload: { title: 'open one' } })
    await app.inject({ method: 'PATCH', url: `/tasks/${a.id}`, payload: { done: true } })
    return app
  }

  it('no param → returns all tasks (unchanged)', async () => {
    const app = await seeded()
    const res = await app.inject({ method: 'GET', url: '/tasks' })
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(Array.isArray(body)).toBe(true)
    expect(body).toHaveLength(2)
    await app.close()
  })

  it('?done=true → only completed tasks', async () => {
    const app = await seeded()
    const res = await app.inject({ method: 'GET', url: '/tasks?done=true' })
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(body).toHaveLength(1)
    expect(body.every((t: { done: boolean }) => t.done === true)).toBe(true)
    await app.close()
  })

  it('?done=false → only incomplete tasks', async () => {
    const app = await seeded()
    const res = await app.inject({ method: 'GET', url: '/tasks?done=false' })
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(body).toHaveLength(1)
    expect(body.every((t: { done: boolean }) => t.done === false)).toBe(true)
    await app.close()
  })

  it('invalid values → 400 with JSON error body', async () => {
    const app = await seeded()
    for (const url of ['/tasks?done=maybe', '/tasks?done=1', '/tasks?done=']) {
      const res = await app.inject({ method: 'GET', url })
      expect(res.statusCode).toBe(400)
      expect(res.json()).toHaveProperty('error')
    }
    await app.close()
  })
})

describe('F07: GET /tasks/stats', () => {
  it('empty store → all zeros', async () => {
    reset()
    const app = buildApp()
    const res = await app.inject({ method: 'GET', url: '/tasks/stats' })
    expect(res.statusCode).toBe(200)
    expect(res.json()).toEqual({ total: 0, done: 0, pending: 0 })
    await app.close()
  })

  it('mixed store → correct total/done/pending with done+pending===total', async () => {
    reset()
    const app = buildApp()
    const a = (await app.inject({ method: 'POST', url: '/tasks', payload: { title: 'a' } })).json()
    const b = (await app.inject({ method: 'POST', url: '/tasks', payload: { title: 'b' } })).json()
    await app.inject({ method: 'POST', url: '/tasks', payload: { title: 'c' } })
    await app.inject({ method: 'PATCH', url: `/tasks/${a.id}`, payload: { done: true } })
    await app.inject({ method: 'PATCH', url: `/tasks/${b.id}`, payload: { done: true } })

    const res = await app.inject({ method: 'GET', url: '/tasks/stats' })
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(body).toEqual({ total: 3, done: 2, pending: 1 })
    expect(body.done + body.pending).toBe(body.total)
    await app.close()
  })

  it('body has exactly the 3 numeric keys', async () => {
    reset()
    const app = buildApp()
    await app.inject({ method: 'POST', url: '/tasks', payload: { title: 'x' } })
    const body = (await app.inject({ method: 'GET', url: '/tasks/stats' })).json()
    expect(Object.keys(body).sort()).toEqual(['done', 'pending', 'total'])
    for (const k of ['total', 'done', 'pending']) expect(typeof body[k]).toBe('number')
    await app.close()
  })

  it('route precedence: /tasks/stats hits stats handler, not /tasks/:id 404', async () => {
    reset()
    const app = buildApp()
    const res = await app.inject({ method: 'GET', url: '/tasks/stats' })
    expect(res.statusCode).toBe(200)
    expect(res.json()).not.toHaveProperty('error')
    await app.close()
  })

  it('F02 regression: GET /tasks still returns a JSON array', async () => {
    reset()
    const app = buildApp()
    await app.inject({ method: 'POST', url: '/tasks', payload: { title: 'still listed' } })
    const res = await app.inject({ method: 'GET', url: '/tasks' })
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.json())).toBe(true)
    await app.close()
  })
})
