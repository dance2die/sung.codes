/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Heading } from "@theme-ui/components"

import Layout from "../layouts"

const postStyle = {
  "h1, h2, h3, h4, h5, h6": {
    paddingBottom: theme => theme.space[3],
  },
  ul: {
    paddingLeft: theme => theme.space[4],
  },
  img: {
    width: "100%",
  },
  lineHeight: "2.5rem",
}

export default ({ data: { mdx } }) => {
  return (
    <Layout>
      <Link to={`/blog/${mdx.fields.year}`}>&larr; Go Back</Link>

      {/* This "link" is for styling gists. */}
      <link
        rel="stylesheet"
        href="https://github.githubassets.com/assets/gist-embed-123720f37c57ce9a8f29de081c38ed61.css"
      ></link>
      <Container sx={postStyle}>
        <Heading as="h1">{mdx.frontmatter.title}</Heading>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </Container>
    </Layout>
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
      fields {
        year
      }
    }
  }
`
