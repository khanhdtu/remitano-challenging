export interface IResult<T> {
  data?: T
  success?: boolean
  error?: any
  message?: string
}
