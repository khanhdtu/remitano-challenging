import { IResult, IUser } from '@interfaces'
import { useQuery } from 'react-query'
import { request } from '@utils'
import { IVideo } from 'interfaces/IVideo'

export function useCurrentUser() {
  return useQuery('get-current-user', (): IUser => null as never)
}

export function useGetVideos() {
  return useQuery('get-videos', () => request.get<IResult<IVideo[]>>('videos'))
}
