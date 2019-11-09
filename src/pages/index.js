/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "../layouts"
import { Heading, Flex, Text } from "@theme-ui/components"

export default () => {
  return (
    <Layout>
      <Flex
        sx={{
          paddingTop: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Heading
          sx={{
            fontWeight: "normal",
            fontSize: "5.550em",
            letterSpacing: "0.4rem",
          }}
        >
          <span className="normal">{"Hi, I'm "}</span>
          <span>
            <b>Sung M. Kim</b>
            <span className="normal">{" a.k.a. "}</span>
          </span>
          <b>dance2die</b>
        </Heading>
      </Flex>
    </Layout>
  )
}
