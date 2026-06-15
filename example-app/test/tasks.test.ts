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
