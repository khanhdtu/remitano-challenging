import { IDatabase } from '@interfaces'
import { IToken } from 'interfaces/IToken'
import { nanoid } from 'nanoid'

export function findTokenByIdAndType(db: IDatabase, _id: string) {
  return db.collection('tokens').findOne({ _id })
}

export function findAndDeleteTokenByIdAndType(db: IDatabase, _id: string) {
  return db
    .collection('tokens')
    .deleteOne({ _id })
    .then(({ deletedCount }) => deletedCount)
}

export async function createToken(db: IDatabase, token: IToken) {
  const securedTokenId = nanoid(32)
  const _token: IToken = {
    _id: securedTokenId as any,
    creatorId: token.creatorId,
    expireAt: token.expireAt,
  }
  await db.collection('tokens').insertOne(_token)
  return token
}
