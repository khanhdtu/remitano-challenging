import { auth } from '@server/middlewares/auth'
import { nextConnOps } from '@server/next-connection'
import { database } from '@server/database'
import nc from 'next-connect'
import { IRequest, IResponse } from '@interfaces'
import { findVideos } from '@server/services/video'
import { prevented } from '@server/services/token'
import { validateBody } from '@server/middlewares'

const handler = nc(nextConnOps)

handler.use(database, ...auth)

handler.get(async (req: IRequest, res: IResponse) => {
  const videos = await findVideos(req.db)
  res.json({
    success: true,
    data: videos,
  })
})

handler.post(
  prevented(),
  validateBody({
    type: 'object',
    properties: {
      videoUrl: { type: 'string' },
    },
  }),
  async (req: IRequest, res: IResponse) => {
    res.json('ok')
  },
)

export default handler
