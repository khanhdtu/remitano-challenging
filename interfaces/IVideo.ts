import { ObjectId } from 'mongodb'

export interface IVideo {
  _id?: ObjectId
  videoUrl: string
  creatorId: string
  createdAt: number
}
