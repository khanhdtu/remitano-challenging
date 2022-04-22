import { Request } from 'express'
import { Db, MongoClient } from 'mongodb'

export interface IRequest extends Request {
  dbClient: MongoClient
  db: Db
}
