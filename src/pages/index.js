/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "../layouts"
import { Heading, Flex, Text, Box } from "@theme-ui/components"

import HeadshotImage from "#components/HeadshotImage"
import ExternalLink from "#utils/ExternalLink"

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
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <HeadshotImage />
    <Box
      as="article"
      py={3}
      px={1}
      sx={{
        fontSize: [1, 4, 6, 7],
        "& > p": { paddingBottom: 3 },
      }}
    >
      <Text as="p">I am a software engineer from New York City,</Text>
      <Text as="p">Sharing stuff on my blog, moderating on DEV</Text>
      <Text as="p">&amp; translating All Contributors in Korean.</Text>
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
