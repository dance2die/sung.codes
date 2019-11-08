/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../layouts"
import { Heading, Flex } from "@theme-ui/components"

export default () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
          title
        }
      }
    }
  `)

  const {
    site: {
      siteMetadata: { description, title },
    },
  } = data

  return (
    <Layout>
      <Flex
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Heading
          sx={{
            fontWeight: "normal",
            // fontSize: "5.250em",
            fontSize: [7, 8, 8, 8],
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
