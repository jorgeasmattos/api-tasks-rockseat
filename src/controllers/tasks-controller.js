
import { database } from '../database.js'
import { randomUUID } from 'node:crypto'

export const tasksController = {
  create({ res, body }) {
    const { title, description } = body

    if (!title || !description) {
      return res.writeHead(400).end('Missing fields')
    }

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }

    database.tasks.push(task)

    return res.writeHead(201).end(JSON.stringify(task))
  }
}

index({ req, res }) {
  const url = new URL(req.url, 'http://localhost')
  const search = url.searchParams.get('search')

  let tasks = database.tasks

  if (search) {
    tasks = tasks.filter(task =>
      task.title.includes(search) ||
      task.description.includes(search)
    )
  }

  return res.end(JSON.stringify(tasks))
}
update({ res, params, body }) {
  const id = params[1]

  const task = database.tasks.find(t => t.id === id)

  if (!task) {
    return res.writeHead(404).end('Task not found')
  }

  const { title, description } = body

  if (title) task.title = title
  if (description) task.description = description

  task.updated_at = new Date()

  return res.end(JSON.stringify(task))
}
remove({ res, params }) {
  const id = params[1]

  const index = database.tasks.findIndex(t => t.id === id)

  if (index === -1) {
    return res.writeHead(404).end('Task not found')
  }

  database.tasks.splice(index, 1)

  return res.writeHead(204).end()
}
toggleComplete({ res, params }) {
  const id = params[1]

  const task = database.tasks.find(t => t.id === id)

  if (!task) {
    return res.writeHead(404).end('Task not found')
  }

  task.completed_at = task.completed_at ? null : new Date()
  task.updated_at = new Date()

  return res.end(JSON.stringify(task))
}