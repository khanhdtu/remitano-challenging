import { Request } from 'express'
import { Db, MongoClient } from 'mongodb'
import { Session } from 'next-session/lib/types'

export interface IRequest extends Request {
  dbClient: MongoClient
  db: Db
  session: Session
}
