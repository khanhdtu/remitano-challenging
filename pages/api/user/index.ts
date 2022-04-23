import { auth } from '@server/middlewares/auth'
import { nextConnOps } from '@server/next-connection'
import { database } from '@server/database'
import nc from 'next-connect'
import { IRequest, IResponse } from '@interfaces'
import { generateToken, prevented } from '@server/services/token'

const handler = nc(nextConnOps)

handler.use(database, ...auth)

handler.get((req: IRequest, res: IResponse) => {
  req.accepted
  res.json({
    success: true,
    data: {
      username: 'khanh',
    },
  })
})

handler.post((req: IRequest, res: IResponse) => {
  req.accepted
  res.json(
    generateToken({
      username: 'khanhjsx',
      password: 'abc@123',
    }),
  )
})

handler.delete(prevented(), async (req: IRequest, res: IResponse) => {
  await req.session.destroy()
  res.status(204).end()
})

export default handler
