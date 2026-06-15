import Fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify'
import { createTask, listTasks, getTask, updateTask, deleteTask } from './store'

/**
 * App factory. Returns a configured Fastify instance without listening, so tests can
 * use `app.inject(...)` and the server entrypoint can `app.listen(...)`.
 *
 * Runtime observability (L11): the caller passes a `logger` option. Real runs (server.ts)
 * enable structured JSON request/lifecycle logs; tests leave it off to stay quiet. App
 * code logs via the Fastify logger (`req.log` / `app.log`), never console.* (arch Rule 2).
 *
 * All routes F00-F05 are passing; see feature_list.json (authoritative).
 */
export function buildApp(opts: { logger?: FastifyServerOptions['logger'] } = {}): FastifyInstance {
  const app = Fastify({ logger: opts.logger ?? false })

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

  // F02: list tasks; F06: optional `done` filter (?done=true|false), 400 on any other value
  app.get('/tasks', async (req, reply) => {
    const { done } = req.query as { done?: string }
    if (done === undefined) return listTasks()
    if (done !== 'true' && done !== 'false') {
      return reply.code(400).send({ error: "done must be 'true' or 'false'" })
    }
    const wantDone = done === 'true'
    return listTasks().filter((t) => t.done === wantDone)
  })

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
