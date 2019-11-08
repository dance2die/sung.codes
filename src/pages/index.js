/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../layouts"
import { Heading, Text } from "@theme-ui/components"

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
      <Heading>Welcome to {title}</Heading>
      <Text>{description}</Text>
    </Layout>
  )
}
