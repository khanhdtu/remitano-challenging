import type { NextPage } from 'next'
import { Box, Flex, Text, Input, Button } from 'theme-ui'
import Layout from '@pages/layout'
import { useShareMutation } from '@services/mutations'
import { useState } from 'react'

const Share: NextPage = () => {
  const { mutate: onShare } = useShareMutation()
  const [videoUrl, setVideoUrl] = useState('')
  return (
    <Layout>
      <Flex sx={{ width: '100%', height: '40vh', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: 400, height: 150, border: '1px solid', position: 'relative', padding: 2 }}>
          <Text sx={{ position: 'absolute', top: -3, background: 'white', padding: 1 }}>Share a Youtube movie</Text>
          <Flex sx={{ mt: 3 }}>
            <Text>Youtube URL:</Text>
            <Input onChange={e => setVideoUrl(e.target.value)} />
          </Flex>
          <Flex sx={{ mt: 3 }}>
            <Button sx={{ m: '0 auto' }} onClick={() => onShare(videoUrl)}>
              Share
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  )
}

export default Share
