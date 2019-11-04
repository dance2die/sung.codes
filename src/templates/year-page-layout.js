import React from "react"
import { graphql } from "gatsby"
import Layout from "../layouts"

export default ({ data }) => {
  console.info(`data`, data)

  const posts = data.allMdx.edges.map(
    ({ node: { frontmatter, fields, id, excerpt } }) => (
      <>
        <h2>{frontmatter.title}</h2>
        <p>{excerpt}</p>
      </>
    )
  )

  return <Layout>{posts}</Layout>
}

export const query = graphql`
  query getMdx($year: Date!) {
    allMdx(filter: { fields: { year: { eq: $year } } }) {
      edges {
        node {
          frontmatter {
            posted: date(fromNow: true)
            title
            coverImage
          }
          fields {
            slug
            year
          }
          id
          excerpt
        }
      }
    }
  }
`
