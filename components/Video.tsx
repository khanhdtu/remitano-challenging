import { IVideo } from 'interfaces/IVideo'
import { Box, Flex, Text } from 'theme-ui'

export const Video = (props: IVideo): JSX.Element => {
  const generateEmbebUrl = (url: string) => {
    return url.replace('/watch', '/embed')
  }
  return (
    <Box sx={{ display: 'inline-flex', gap: 2 }}>
      <Flex>
        <iframe width={400} height={300} src={generateEmbebUrl(props.videoUrl)} allowFullScreen></iframe>
      </Flex>
      <Flex sx={{ flexDirection: 'column', alignItems: 'baseline' }}>
        <Text>Movie Tile</Text>
        <Text>Shared by: {props.creator[0].username}</Text>
        <Text>Descriptions ...</Text>
      </Flex>
    </Box>
  )
}

export default Video
