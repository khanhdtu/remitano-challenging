import { IDatabase } from '@interfaces'
import { IPagingOptions } from 'interfaces/IPagingOptions'

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

export function shareVideo(db: IDatabase, body: { videoUrl: string; creatorId: string }) {
  return db.collection('videos').insertOne({
    videoUrl: body.videoUrl,
    creatorId: body.creatorId,
    createdAt: new Date().getTime(),
  })
}
