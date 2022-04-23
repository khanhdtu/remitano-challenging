import { ObjectId } from 'mongodb'
import { IUser } from './IUser'

export interface IVideo {
  _id?: ObjectId
  videoUrl: string
  creatorId: string
  createdAt: number
  creator: IUser[]
}
