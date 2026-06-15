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

export function reset(): void {
  tasks.clear()
}
