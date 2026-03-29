import {
  createTask,
  deleteTask,
  listTasks,
  toggleTaskCompletion,
  updateTask,
} from './controllers/tasks-controller.js'
import { buildRoutePath } from './utils/build-route-path.js'

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: createTask,
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: listTasks,
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: updateTask,
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: deleteTask,
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: toggleTaskCompletion,
  },
]
