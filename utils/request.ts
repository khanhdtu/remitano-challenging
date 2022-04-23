import axios from 'axios'

const request = axios.create({
  baseURL: 'api',
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

request.interceptors.request.use(
  (config: any) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  error => Promise.reject(error),
)

request.interceptors.response.use(
  response => response.data || response,
  error => error,
)

export { request }
export default request
