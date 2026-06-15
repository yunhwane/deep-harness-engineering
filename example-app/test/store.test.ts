import { describe, it, expect, beforeEach } from 'vitest'
import { createTask, listTasks, getTask, updateTask, deleteTask, reset } from '../src/store'

/**
 * Direct unit tests for the store (quality-report.md priority #1). The store had only
 * route/E2E coverage; these isolate its logic — including the branches the happy-path
 * E2E flow doesn't hit (partial update, update/delete of a missing id).
 */
describe('store', () => {
  beforeEach(() => reset())

  it('createTask returns a task with a uuid, the title, and done:false', () => {
    const t = createTask('a')
    expect(t).toMatchObject({ title: 'a', done: false })
    expect(t.id).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('listTasks reflects inserts and is independent across resets', () => {
    expect(listTasks()).toEqual([])
    createTask('a')
    createTask('b')
    expect(listTasks().map((t) => t.title)).toEqual(['a', 'b'])
  })

  it('getTask returns the task or undefined', () => {
    const t = createTask('a')
    expect(getTask(t.id)?.title).toBe('a')
    expect(getTask('missing')).toBeUndefined()
  })

  it('updateTask applies a partial patch and leaves untouched fields alone', () => {
    const t = createTask('a')
    expect(updateTask(t.id, { done: true })).toMatchObject({ title: 'a', done: true })
    expect(updateTask(t.id, { title: 'b' })).toMatchObject({ title: 'b', done: true })
  })

  it('updateTask returns undefined for a missing id', () => {
    expect(updateTask('missing', { done: true })).toBeUndefined()
  })

  it('deleteTask returns true then false, and removes the task', () => {
    const t = createTask('a')
    expect(deleteTask(t.id)).toBe(true)
    expect(deleteTask(t.id)).toBe(false)
    expect(getTask(t.id)).toBeUndefined()
  })
})
