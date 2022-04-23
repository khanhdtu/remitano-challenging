import { INext, IRequest, IResponse } from '@interfaces'
import Ajv from 'ajv'

export function validateBody(schema: any) {
  const ajv = new Ajv()
  const validate = ajv.compile(schema)
  return (req: IRequest, res: IResponse, next: INext) => {
    const valid = validate(req.body)
    if (valid) {
      return next()
    } else {
      const error = validate && validate.errors ? validate.errors[0] : null
      const message = error ? `"${error.instancePath.substring(1)}" ${error.message}` : ''
      return res.status(400).json({
        error: { message },
      })
    }
  }
}
