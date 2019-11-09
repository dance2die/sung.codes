/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading, Flex, Box } from "@theme-ui/components"

import Link from "#components/Link/TextLink"
import { GitHub, Twitter } from "#components/social"

const headingStyle = { fontSize: [3, 4, 6, 6] }
const subHeadingStyle = { fontSize: [1, 1, 2, 2] }
const linkStyle = {
  marginLeft: [1, 2, 4, 4],
  fontSize: [1, 1, 2, 2],
}

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
      <Heading as="h1" sx={headingStyle}>
        {"{ sung.codes }"}
      </Heading>
      <Heading as="sup" sx={subHeadingStyle}>
        by dance2die
      </Heading>
    </Flex>
  </Link>
)

const Links = () => (
  <Flex>
    <Box sx={linkStyle}>
      <Link
        to="/blog"
        sx={{
          "&.active": {
            textDecoration: "underline",
            fontWeight: "bold",
          },
        }}
      >
        Blog
      </Link>
    </Box>
    <Box sx={linkStyle}>
      <Twitter />
    </Box>
    <Box sx={linkStyle}>
      <GitHub />
    </Box>
  </Flex>
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
      </Flex>
    </Box>
  )
}
