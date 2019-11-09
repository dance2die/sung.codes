/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading, Flex, Text, Box } from "@theme-ui/components"

import Layout from "#layouts"
import HeadshotImage from "#components/HeadshotImage"
import ExternalLink from "#components/Link/ExternalLink"
import TextLink from "#components/Link/TextLink"
import styled from "@emotion/styled"

const InLink = styled(TextLink)(({ theme }) => ({
  color: theme.colors.primary,
  textDecoration: "underline",
}))

const OutLink = styled(ExternalLink)(({ theme }) => ({
  color: theme.colors.primary,
}))

const Introduction = () => (
  <Flex
    as="section"
    sx={{
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      height: ["auto", "60vh"],
      padding: [6, "0"],
      margin: [
        "50px auto 100px",
        "50px auto 100px",
        "0 auto 30vh",
        "0 auto 30vh",
      ],
    }}
  >
    <Heading
      sx={{
        fontWeight: "normal",
        fontSize: ["20vw", "15vw", "5.550em", "5.550em"],
        letterSpacing: "0.4rem",
      }}
    >
      <span className="normal">{"Hi, I'm "}</span>
      <b>Sung M. Kim</b>
      <span
        sx={{
          textDecoration: "line-through",
          textDecorationColor: "gold",
        }}
      >
        {" a.k.a. "}
      </span>
      <b>dance2die</b>
    </Heading>
  </Flex>
)

const Bio = () => (
  <Flex
    as="section"
    sx={{
      height: "auto",
      flexDirection: ["column", "column", "column", "row"],
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <HeadshotImage />
    <Box
      as="article"
      py={[3, 3, 3, 0]}
      px={[1, 1, 1, 0]}
      pl={[0, 0, 0, 5]}
      sx={{
        fontSize: [1, 5, 6, "40px"],
        "& > p": { paddingBottom: 3 },
      }}
    >
      <Text as="p">I am a software engineer from New York City,</Text>
      <Text as="p">
        Sharing stuff on my <InLink to="/blog">blog</InLink>, moderating on{" "}
        <OutLink to="https://dev.to/dance2die">DEV</OutLink>
      </Text>
      <Text as="p">
        &amp; translating{" "}
        <OutLink to="https://allcontributors.org/">
          All Contributors Project
        </OutLink>{" "}
        in Korean.
      </Text>
    </Box>
  </Flex>
)

export default () => {
  return (
    <Layout>
      <Introduction />
      <Bio />
    </Layout>
  )
}
