import http from 'node:http'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
  const route = routes.find(route => {
    return route.method === req.method && route.path.test(req.url)
  })

  if (route) {
    const params = req.url.match(route.path)
    const body = await getBody(req)

    return route.handler({ req, res, params, body })
  }

  return res.writeHead(404).end()
})

server.listen(3333)
