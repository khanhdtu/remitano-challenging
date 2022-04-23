import { useMutation, useQueryClient } from 'react-query'
import { request } from '@utils'
import { IUser } from '@interfaces'

export function useFetchCurrentUser() {
  const queryClient = useQueryClient()
  return useMutation(() => request.get<IUser>('user'), {
    onSuccess: res => {
      if (res.data) {
        queryClient.setQueryData('get-current-user', res.data)
      }
    },
  })
}
