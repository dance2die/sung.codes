import React from "react"
import { graphql, Link } from "gatsby"
import { Header, Main, h3 } from "theme-ui"

import Layout from "../layouts"

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
        <h3>
          <Link to={slug}>{title}</Link>
        </h3>
        <Main>
          {date} - {posted}
        </Main>
      </React.Fragment>
    )
  )

  return <Layout>{posts}</Layout>
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
