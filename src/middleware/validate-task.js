export function validateTask(body) {
  if (!body.title || !body.description) {
    throw new Error('Missing fields')
  }
}