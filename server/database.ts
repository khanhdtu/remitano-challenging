import { MongoClient, Db } from 'mongodb'
import { NextFunction } from 'express'
import { IRequest, IResponse } from '../interfaces'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */
const _global: any = global
_global.mongo = _global.mongo || {}

let indexesCreated = false
async function createIndexes(db: Db) {
  await Promise.all([
    db.collection('liked-posts').createIndexes([{ key: { postId: 1, myId: 1 }, unique: true }]),
    db.collection('liked-users').createIndexes([{ key: { userId: 1, myId: 1 }, unique: true }]),
    db.collection('matched-users').createIndexes([{ key: { userId: 1, myId: 1 }, unique: true }]),
  ])
  indexesCreated = true
}

export async function getMongoClient() {
  if (!_global.mongo.client) {
    _global.mongo.client = new MongoClient(process.env.MONGODB_URI as any)
  }
  // It is okay to call connect() even if it is connected
  // using node-mongodb-native v4 (it will be no-op)
  // See: https://github.com/mongodb/node-mongodb-native/blob/4.0/docs/CHANGES_4.0.0.md
  await _global.mongo.client.connect()
  return _global.mongo.client
}

export async function database(req: IRequest, res: IResponse, next: NextFunction) {
  if (!_global.mongo.client) {
    _global.mongo.client = new MongoClient(process.env.MONGODB_URI as any)
  }
  req.dbClient = await getMongoClient()
  req.db = req.dbClient.db() // this use the database specified in the MONGODB_URI (after the "/")
  req.db.myId = process.env.CURRENT_USER_ID?.toString() || ''
  if (!indexesCreated) await createIndexes(req.db)
  if (res) {
  }
  return next()
}
