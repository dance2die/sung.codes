/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading, Flex, Box, Text } from "@theme-ui/components"
import { Link as RawLink } from "gatsby"
import styled from "@emotion/styled"

const Title = () => (
  <Link to="/">
    <Flex
      sx={{
        display: "flex",
        alignItems: "center",
        color: theme => theme.colors.gray[3],
        "& > *": { paddingRight: "0.5rem" },
      }}
    >
      <Heading as="h1">{"{ sung.codes }"}</Heading>
      <Heading as="sup">by dance2die</Heading>
    </Flex>
  </Link>
)

const Link = styled(RawLink)`
  text-decoration: none;
`

const Links = () => (
  <Flex>
    <Box pr={3}>
      <Link to="/blog">Blog</Link>
    </Box>
  </Flex>
)

const Year = () => (
  <Box>
    <Text>{new Date().getFullYear()}</Text>
  </Box>
)

export default () => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: theme => theme.colors.background,
        zIndex: 100,
        padding: theme => `${theme.space[3]}px 0 ${theme.space[3]}px`,
      }}
    >
      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title />
        <Links />
        <Year />
      </Flex>
    </Box>
  )
}
