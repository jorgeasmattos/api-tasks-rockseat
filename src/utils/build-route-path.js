export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g

  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[^/]+)')
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?.*)?$`)

  return pathRegex
}
