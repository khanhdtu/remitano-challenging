import axios from 'axios'
import { toast } from 'react-hot-toast'

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
  response => response,
  error => {
    if (error.message) {
      toast(error.message)
    } else {
      toast(error.response.message)
    }
    return error
  },
)

export { request }
export default request
