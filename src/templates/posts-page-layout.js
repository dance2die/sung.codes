import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default ({ data: { mdx } }) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://github.githubassets.com/assets/gist-embed-123720f37c57ce9a8f29de081c38ed61.css"
      ></link>
      <h1>{mdx.frontmatter.title}</h1>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
