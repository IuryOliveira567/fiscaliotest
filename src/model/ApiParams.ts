type API_METHODS = 'POST' | 'GET' | 'PUT' | 'DELETE'

interface ApiParams {
  url: string,
  method: API_METHODS,
  params?: object,
  auth?: string
}

export default ApiParams;