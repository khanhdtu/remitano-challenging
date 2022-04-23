import { IUser } from '@interfaces'
import { useState } from 'react'
import { Box, Flex, Image, Text, Input, Button, Link } from 'theme-ui'
import { useSignInMutation, useSignOutMutation, useSignUpMutation } from '@mutations'
import { removeToken } from '@utils'
import { useRouter } from 'next/router'

type HeaderProps = {
  user?: IUser
}

export const Header = (props: HeaderProps): JSX.Element => {
  const { mutate: onSignIn } = useSignInMutation()
  const { mutate: onSignUp } = useSignUpMutation()
  const { mutate: onSignOut } = useSignOutMutation()
  const { replace } = useRouter()
  const [user, setUser] = useState<IUser>({
    username: '',
    password: '',
  })

  const handleInputChange = (inputType = 'username', value: string) => {
    setUser({ ...user, [inputType]: value })
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: 60 }}>
      <Flex sx={{ height: '100%', width: 360, alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => replace('/')}>
        <Image src='home.svg' alt='fav icon' sx={{ width: 50 }} />
        <Text sx={{ color: 'primary', fontSize: 'xxl' }}>Funny Videos</Text>
      </Flex>

      {!props.user?.username ? (
        <Flex sx={{ gap: 2, alignItems: 'center' }}>
          <Input sx={{ width: 100, height: 35 }} placeholder='Username' onChange={e => handleInputChange('username', e.target.value)} />
          <Input
            sx={{ width: 100, height: 35 }}
            placeholder='Password'
            onChange={e => handleInputChange('password', e.target.value)}
            security='password'
            type='password'
          />
          <Button onClick={() => onSignIn(user)}>Sign In</Button>
          <Link sx={{ fontSize: 'sm', textDecorationLine: 'underline' }} onClick={() => onSignUp(user)}>
            Sign Up
          </Link>
        </Flex>
      ) : (
        <Flex sx={{ alignItems: 'center', gap: 3 }}>
          <Text>Welcome {props.user?.username}</Text>
          <Button onClick={() => replace('share')}>Share a movie</Button>
          <Link onClick={() => onSignOut()}>Logout</Link>
        </Flex>
      )}
    </Box>
  )
}
