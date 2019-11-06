/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading, Flex, Box, Text } from "@theme-ui/components"

const Title = () => (
  <Flex
    sx={{
      display: "flex",
      alignItems: "center",
      "& > *": { paddingRight: "0.5rem" },
    }}
  >
    <Heading as="h1">{"{ sung.codes }"}</Heading>
    <Heading as="sup">by dance2die</Heading>
  </Flex>
)

const Links = () => <Box>links?</Box>
const Year = () => (
  <Box>
    <Heading as="sub">2019</Heading>
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
        alignItems: "center",
      }}
    >
      <Title />
      <Links />
      <Year />
    </Flex>
  )
}
