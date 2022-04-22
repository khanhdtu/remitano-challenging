import { ObjectId } from 'mongodb'

export interface IToken {
  _id?: ObjectId
  creatorId: string
  expireAt: number
}
