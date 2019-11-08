/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "../layouts"
import { Heading, Flex } from "@theme-ui/components"

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
          }}
        >
          {"Hi, I'm "}
          <span>
            <b>Sung M. Kim</b>
            {" a.k.a. "}
          </span>
          <b>dance2die</b>
        </Heading>
      </Flex>
    </Layout>
  )
}
