import styles from '@styles/Home.module.css'
import type { NextPage } from 'next'
import { useCurrentUser } from '@services/queries'
import { useFetchCurrentUserMutation } from '@services/mutations'
import { Box, Flex } from 'theme-ui'
import { useEffect } from 'react'
import { Header } from '@components/Header'

const Home: NextPage = () => {
  const { mutate: onFetchUser } = useFetchCurrentUserMutation()
  const { data: user } = useCurrentUser()
  console.log('userxxx', user)
  useEffect(() => onFetchUser(), [])

  return (
    <Box className={styles.container}>
      <Header user={user} />
      <Flex></Flex>
    </Box>
  )
}

export default Home
