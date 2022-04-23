import type { NextPage } from 'next'
import { Box } from 'theme-ui'
import Layout from '@pages/layout'
import { useGetVideos } from '@services/queries'
import { Video } from '@components/Video'

const Home: NextPage = () => {
  const { data: videos } = useGetVideos()
  return (
    <Layout>
      <Box className='video-items' sx={{ p: 3, textAlign: 'center' }}>
        {videos?.data.data.map(video => (
          <Video key={video._id?.toString()} {...video} />
        ))}
      </Box>
    </Layout>
  )
}

export default Home
