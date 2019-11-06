/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link as RawLink } from "gatsby"
import { Heading, Flex, Box } from "@theme-ui/components"
import styled from "@emotion/styled"

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

const Link = styled(RawLink)`
  text-decoration: none;
`

const Links = () => (
  <Flex>
    <Box pr={3}>
      <Link to="/">Home</Link>
    </Box>
    <Box pr={3}>
      <Link to="/blog">Blog</Link>
    </Box>
  </Flex>
)

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
