import { IDatabase } from '@interfaces'
import { IPagingOptions } from 'interfaces/IPagingOptions'
import { ObjectId } from 'mongodb'

export async function findVideos(db: IDatabase, pagOptions?: IPagingOptions) {
  return db
    .collection('videos')
    .aggregate([
      {
        $sort: { createdAt: 1 },
      },
      {
        $limit: pagOptions?.limit || 99,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
    ])
    .toArray()
}

export async function shareVideo(db: IDatabase, body: { videoUrl: string; creatorId?: ObjectId }) {
  const video = {
    videoUrl: body.videoUrl,
    creatorId: new ObjectId(body.creatorId),
    createdAt: new Date().getTime(),
  }
  const shared = await db.collection('videos').insertOne(video)
  return {
    ...video,
    _id: shared.insertedId,
  }
}
