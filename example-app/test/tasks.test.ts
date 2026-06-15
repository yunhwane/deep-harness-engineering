import { describe, it, expect } from 'vitest'
import { buildApp } from '../src/app'

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
