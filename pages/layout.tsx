import styles from '@styles/Home.module.css'
import type { NextPage } from 'next'
import { useCurrentUser, useGetVideos } from '@services/queries'
import { useFetchCurrentUserMutation } from '@services/mutations'
import { Box } from 'theme-ui'
import { useEffect } from 'react'
import { Header } from '@components/Header'

const Layout: NextPage = props => {
  const { mutate: onFetchUser } = useFetchCurrentUserMutation()
  const { data: user } = useCurrentUser()
  const { data: videos } = useGetVideos()

  useEffect(() => onFetchUser(), [])

  return (
    <Box className={styles.container}>
      <Header user={user} />
      {user?.username ? props.children : null}
    </Box>
  )
}

export default Layout
