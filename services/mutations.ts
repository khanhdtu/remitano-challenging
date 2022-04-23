import { useMutation, useQueryClient } from 'react-query'
import { request } from '@utils'
import { IResult, IUser } from '@interfaces'
import { toast } from 'react-hot-toast'
import { setToken, removeToken } from '@utils'

export function useFetchCurrentUserMutation() {
  const queryClient = useQueryClient()
  return useMutation(() => request.get<IResult<IUser>>('user'), {
    onSuccess: res => {
      if (res.data.success) {
        queryClient.setQueryData('get-current-user', res.data.data)
      }
    },
  })
}

export function useSignInMutation() {
  const queryClient = useQueryClient()
  return useMutation((body: IUser) => request.patch<IResult<IUser>>('user', body), {
    onSuccess: res => {
      if (res && !res.data.success) {
        toast.error(res.data.message || '', {
          position: 'top-right',
        })
      } else {
        queryClient.setQueryData('get-current-user', res.data.data)
        setToken(res.data.data.token)
      }
    },
  })
}

export function useSignUpMutation() {
  const queryClient = useQueryClient()
  return useMutation((body: IUser) => request.post<IResult<IUser>>('user', body), {
    onSuccess: res => {
      if (res && !res.data.success) {
        toast.error(res.data.message || '', {
          position: 'top-right',
        })
      } else {
        queryClient.setQueryData('get-current-user', res.data.data)
        setToken(res.data.data.token)
      }
    },
  })
}

export function useSignOutMutation() {
  const queryClient = useQueryClient()
  return useMutation(() => request.delete<IResult<IUser>>('user'), {
    onSuccess: res => {
      if (res && !res.data.success) {
        toast.error(res.data.message || '', {
          position: 'top-right',
        })
      } else {
        queryClient.setQueryData('get-current-user', null)
        removeToken()
      }
    },
  })
}
