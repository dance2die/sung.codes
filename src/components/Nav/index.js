/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading, Flex, Box, Text } from "@theme-ui/components"

const Title = () => (
  <Flex>
    <Heading as="h1">{"{ sung.codes }"}</Heading>
    <Heading as="sup">by dance2die</Heading>
  </Flex>
)

const Links = () => <Box>links?</Box>
const Year = () => (
  <Box>
    <Text>2019</Text>
  </Box>
)

export default () => {
  return (
    <Flex
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: theme => theme.colors.background,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Title />
      <Links />
      <Year />
    </Flex>
  )
}
