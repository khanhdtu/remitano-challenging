import { AxiosResponse } from 'axios'

export interface IResult<T> extends AxiosResponse {
  data: T
  success?: boolean
  error?: any
  message?: string
}
