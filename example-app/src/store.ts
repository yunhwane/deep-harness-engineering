/**
 * In-memory task store. Deliberately trivial — persistence is out of scope for the
 * learning harness (see ARCHITECTURE.md / DECISIONS.md). State is module-level, so each
 * process has one store; tests that need isolation can call `reset()`.
 */
export interface Task {
  id: string
  title: string
  done: boolean
}

const tasks = new Map<string, Task>()

export function createTask(title: string): Task {
  const task: Task = { id: crypto.randomUUID(), title, done: false }
  tasks.set(task.id, task)
  return task
}

export function listTasks(): Task[] {
  return [...tasks.values()]
}

export function getTask(id: string): Task | undefined {
  return tasks.get(id)
}

export interface TaskStats {
  total: number
  done: number
  pending: number
}

// F07: task counts. `done + pending === total` by construction.
export function statsTasks(): TaskStats {
  let done = 0
  for (const task of tasks.values()) if (task.done) done++
  const total = tasks.size
  return { total, done, pending: total - done }
}

export function updateTask(
  id: string,
  patch: { title?: string; done?: boolean },
): Task | undefined {
  const task = tasks.get(id)
  if (!task) return undefined
  if (patch.title !== undefined) task.title = patch.title
  if (patch.done !== undefined) task.done = patch.done
  return task
}

export function deleteTask(id: string): boolean {
  return tasks.delete(id)
}

export function reset(): void {
  tasks.clear()
}
