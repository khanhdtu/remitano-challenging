import { IUser } from '@interfaces'
import { useQuery } from 'react-query'

export function useCurrentUser() {
  return useQuery('get-current-user', (): IUser => null as never)
}
