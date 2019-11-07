/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { Heading, Image } from "@theme-ui/components"

import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../layouts"

const postStyle = {
  h1: {
    paddingBottom: theme => theme.space[3],
  },
  h2: {
    padding: theme => `${theme.space[3]}px 0 ${theme.space[2]}px`,
  },
  "ul, ol": {
    paddingLeft: theme => theme.space[4],
  },
  img: {
    width: "100%",
  },
  lineHeight: "2.5rem",
}

export default ({
  data: {
    mdx: {
      body,
      frontmatter,
      fields: { year },
    },
  },
}) => {
  console.info(`frontmatter ==>`, frontmatter)

  return (
    <Layout>
      <Link to={`/blog/${year}`}>&larr; Go Back</Link>

      {/* This "link" is for styling gists. */}
      <link
        rel="stylesheet"
        href="https://github.githubassets.com/assets/gist-embed-123720f37c57ce9a8f29de081c38ed61.css"
      ></link>
      <Container sx={postStyle}>
        <Heading as="h1">{frontmatter.title}</Heading>
        <Img fluid={frontmatter.banner.childImageSharp.fluid} />
        <MDXRenderer>{body}</MDXRenderer>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        banner {
          ...bannerImage640
        }
      }
      fields {
        year
      }
    }
  }
`
