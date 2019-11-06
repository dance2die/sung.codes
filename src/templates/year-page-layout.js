/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql, Link } from "gatsby"

import { Main, Container } from "theme-ui"
import Layout from "../layouts"
import { Heading, Box } from "@theme-ui/components"

export default ({ data }) => {
  const posts = data.allMdx.edges.map(
    ({
      node: {
        frontmatter: { title, date, posted },
        fields: { slug },
        id,
      },
    }) => (
      <Box
        key={id}
        sx={{
          pb: 3,
          lineHeight: "1.8rem",
        }}
      >
        <Heading as="h3">
          <Link to={slug}>{title}</Link>
        </Heading>
        <Main
          sx={{
            color: theme => theme.colors.gray[2],
            fontSize: "0.9rem",
          }}
        >
          {date}
        </Main>
      </Box>
    )
  )

  return (
    <Layout>
      <Link to="/blog">&larr; Go Back</Link>
      <Container>{posts}</Container>
    </Layout>
  )
}

export const query = graphql`
  query getMdx($year: Date!) {
    allMdx(
      filter: { fields: { year: { eq: $year } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            posted: date(fromNow: true)
            title
            coverImage
          }
          fields {
            slug
          }
          id
        }
      }
    }
  }
`
