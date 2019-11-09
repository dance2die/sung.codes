/** @jsx jsx */
import { jsx, Box } from "theme-ui"
import { Heading } from "@theme-ui/components"

import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Location } from "@reach/router"

import Layout from "#layouts"
import ExternalLink from "#components/Link/ExternalLink"

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
  lineHeight: "1.8rem",
  p: {
    paddingBottom: "1.1rem",
  },
  paddingTop: [3, 3, 4, 4],
}

export default ({
  data: {
    mdx: {
      body,
      frontmatter: { title, banner },
      fields: { year },
    },
  },
}) => {
  return (
    <Layout>
      <Link to={`/blog/${year}`}>&larr; Go Back</Link>
      {/* This "link" is for styling gists. */}
      <link
        rel="stylesheet"
        href="https://github.githubassets.com/assets/gist-embed-123720f37c57ce9a8f29de081c38ed61.css"
      ></link>
      <Location>
        {({ location }) => (
          <Box sx={postStyle}>
            <Heading as="h1">{title}</Heading>
            {banner &&
              banner.childImageSharp &&
              banner.childImageSharp.fluid && (
                <Img fluid={banner.childImageSharp.fluid} />
              )}
            Broken Post?{" → "}
            <ExternalLink
              to={`https://twitter.com/intent/tweet?text=@dance2die%20${location.href} is broken!`}
            >
              Let me know
            </ExternalLink>{" "}
            <MDXRenderer>{body}</MDXRenderer>
          </Box>
        )}
      </Location>
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
