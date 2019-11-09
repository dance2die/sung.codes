/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "../layouts"
import { Heading, Flex } from "@theme-ui/components"

import HeadshotImage from "#components/HeadshotImage"

const Introduction = () => (
  <Flex
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
  <Heading>
    Bio
    <HeadshotImage />
  </Heading>
)

export default () => {
  return (
    <Layout>
      <Introduction />
      <Bio />
    </Layout>
  )
}
