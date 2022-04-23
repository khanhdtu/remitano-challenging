import { auth } from '@server/middlewares/auth'
import { nextConnOps } from '@server/next-connection'
import { database } from '@server/database'
import nc from 'next-connect'
import { IRequest, IResponse } from '@interfaces'
import { generateToken, prevented } from '@server/services/token'
import { findUserByUsernameAndPassword, findUserByUsername, insertUser } from '@server/services/user'
import { validateBody } from '@server/middlewares'

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

handler.post(
  validateBody({
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 6,
      },
      password: {
        type: 'string',
        minLength: 6,
      },
    },
    additionalProperties: false,
  }),
  async (req: IRequest, res: IResponse) => {
    const { username, password } = req.body
    const found = await findUserByUsername(req.db, username)
    if (found) {
      res.json({
        success: false,
        message: 'username is existed already.',
      })
    } else {
      const newUser = await insertUser(req.db, req.body)
      res.json({
        success: true,
        data: {
          ...newUser,
          token: generateToken({
            username,
            password,
          }),
          message: 'User has been created successfully.',
        },
      })
    }
  },
)

// Sign In
handler.patch(
  validateBody({
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 6,
      },
      password: {
        type: 'string',
        minLength: 6,
      },
    },
    additionalProperties: false,
  }),
  async (req: IRequest, res: IResponse) => {
    const { username, password } = req.body
    const found = await findUserByUsernameAndPassword(req.db, req.body)
    if (!found) {
      res.json({
        success: false,
        data: null,
        message: 'User could not be found.',
      })
    } else {
      res.json({
        success: true,
        data: {
          username,
          token: generateToken({ username, password }),
        },
      })
    }
  },
)

// Sign Out
handler.delete(prevented(), async (req: IRequest, res: IResponse) => {
  // await req.session.destroy()
  res.json({
    success: true,
    data: null,
  })
})

export default handler
