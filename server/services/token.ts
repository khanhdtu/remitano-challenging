import { IUser } from '@interfaces'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'

const { JWT_SCRET } = process.env
const BACKUP_JWT_SCRET = 'remitano-scret'
const algorithm = 'HS256'
const expiresIn = 3600

export function generateToken(user: IUser) {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      password: user.password,
    },
    JWT_SCRET || BACKUP_JWT_SCRET,
    { algorithm, expiresIn },
  )
}

export function verifyToken(token: string) {
  const verified = jwt.verify(token, JWT_SCRET || BACKUP_JWT_SCRET)
  return verified
}

export function decodeToken(bearerToken: string) {
  const token = bearerToken.split(' ')[1]
  const decoded = jwt.decode(token) as IUser
  return {
    username: decoded.username,
  }
}

export function prevented() {
  return expressjwt({ secret: JWT_SCRET || BACKUP_JWT_SCRET, algorithms: [algorithm] })
}
