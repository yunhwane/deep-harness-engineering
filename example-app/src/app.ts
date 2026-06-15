import Fastify, { type FastifyInstance } from 'fastify'
import { createTask } from './store'

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

  return app
}
