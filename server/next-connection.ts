import { Request, Response } from 'express'
export const nextConnectionOptions = {
  onError(err: any, req: Request, res: Response) {
    console.error(err, req.baseUrl)
    res.statusCode = err.status && err.status >= 100 && err.status < 600 ? err.status : 500
    res.json({ message: err.message })
  },
}
