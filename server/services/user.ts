import { IDatabase, IUser } from '@interfaces'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'

export async function findUserWithUsernameAndPassword(db: IDatabase, user: IUser) {
  const userFound = await db.collection<IUser>('users').findOne({ username: user.username })
  if (userFound && (await bcrypt.compare(user.password ?? '', userFound.password ?? ''))) {
    userFound.password = undefined // filtered out password
    return userFound
  }
  return null
}

export async function findUserForAuth(db: IDatabase, userId: string) {
  return db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })
    .then(user => user || null)
}

export async function findUserById(db: IDatabase, userId: string) {
  return db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) }, { projection: dbProjectionUsers() })
    .then(user => user || null)
}

export async function findUserByUsername(db: IDatabase, username: string) {
  return db
    .collection('users')
    .findOne({ username }, { projection: dbProjectionUsers() })
    .then(user => user || null)
}

export async function insertUser(db: IDatabase, user: IUser) {
  const password = await bcrypt.hash(user.password ?? '', 10)
  const { insertedId } = await db.collection('users').insertOne({ ...user, password })
  user._id = insertedId
  return user
}

export function dbProjectionUsers(prefix = '') {
  return {
    [`${prefix}username`]: 0,
    [`${prefix}password`]: 0,
  }
}
