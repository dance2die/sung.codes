import React from "react"
// import { jsx } from "theme-ui"
import { Main } from "theme-ui"
import { graphql, Link } from "gatsby"

import Layout from "../layouts"
import { Heading } from "@theme-ui/components"

export default ({ data }) => {
  const posts = data.allMdx.edges.map(
    ({
      node: {
        frontmatter: { title, date, posted },
        fields: { slug },
        id,
      },
    }) => (
      <React.Fragment key={id}>
        <Heading as="h3">
          <Link to={slug}>{title}</Link>
        </Heading>
        <Main>
          {date} - {posted}
        </Main>
      </React.Fragment>
    )
  )

  return (
    <Layout>
      <Link to="/blog">&larr; Go Back</Link>
      {posts}
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
