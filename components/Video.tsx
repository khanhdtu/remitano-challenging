import { IVideo } from 'interfaces/IVideo'
import { Box, Flex, Text } from 'theme-ui'

export const Video = (props: IVideo): JSX.Element => {
  const generateEmbebUrl = (url: string) => {
    return url.replace('/watch', '/embed')
  }
  return (
    <Box className='video-item' sx={{ display: 'inline-flex', gap: 2 }}>
      <Flex>
        <iframe title='unknown title' src={generateEmbebUrl(props.videoUrl)} allowFullScreen></iframe>
      </Flex>
      <Flex sx={{ flexDirection: 'column', alignItems: 'baseline' }}>
        <Text color='primary'>Movie Tile</Text>
        <Text>Shared by: {props.creator[0].username}</Text>
        <Text>Descriptions ...</Text>
      </Flex>
    </Box>
  )
}

export default Video
