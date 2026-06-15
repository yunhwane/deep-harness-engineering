import Fastify, { type FastifyInstance } from 'fastify'
import { createTask, listTasks, getTask, updateTask, deleteTask } from './store'

/**
 * App factory. Returns a configured Fastify instance without listening, so tests can
 * use `app.inject(...)` and the server entrypoint can `app.listen(...)`.
 *
 * Routes are added one feature at a time, gated by feature_list.json:
 *   F00 GET /health (L6), F01 POST /tasks (L9). F02-F05 still not_started.
 */
export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false })

  app.get('/health', async () => ({ status: 'ok' }))

  // F01: create a task
  app.post('/tasks', async (req, reply) => {
    const body = req.body as { title?: unknown } | undefined
    if (typeof body?.title !== 'string' || body.title.trim() === '') {
      reply.code(400)
      return { error: 'title is required and must be a non-empty string' }
    }
    reply.code(201)
    return createTask(body.title)
  })

  // F02: list tasks
  app.get('/tasks', async () => listTasks())

  // F03: read one task (404 if unknown)
  app.get('/tasks/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const task = getTask(id)
    if (!task) return reply.code(404).send({ error: 'task not found' })
    return task
  })

  // F04: update a task (404 if unknown)
  app.patch('/tasks/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const body = (req.body ?? {}) as { title?: unknown; done?: unknown }
    if (body.title !== undefined && (typeof body.title !== 'string' || body.title.trim() === '')) {
      return reply.code(400).send({ error: 'title must be a non-empty string' })
    }
    if (body.done !== undefined && typeof body.done !== 'boolean') {
      return reply.code(400).send({ error: 'done must be a boolean' })
    }
    const updated = updateTask(id, {
      title: body.title as string | undefined,
      done: body.done as boolean | undefined,
    })
    if (!updated) return reply.code(404).send({ error: 'task not found' })
    return updated
  })

  // F05: delete a task (404 if unknown, else 204)
  app.delete('/tasks/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    if (!deleteTask(id)) return reply.code(404).send({ error: 'task not found' })
    return reply.code(204).send()
  })

  return app
}
