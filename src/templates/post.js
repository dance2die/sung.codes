/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui"
import { Heading } from "@theme-ui/components"

import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Location } from "@reach/router"
import { URL } from "universal-url"

import Layout from "#layouts"
import ExternalLink from "#components/Link/ExternalLink"
import SEO from "#components/seo"

const postStyle = {
  h1: {
    marginBottom: 3,
  },
  h2: {
    marginTop: 1,
    marginBottom: 2,
  },
  "h2, h3, h4, h5, h6": {
    marginBottom: 2,
  },
  "ul, ol": {
    paddingLeft: "1.1rem",
  },
  img: {
    width: "100%",
  },
  lineHeight: "2",
  p: {
    paddingBottom: ".5rem",
  },
  paddingTop: [3, 3, 4, 4],
}

export default ({
  data: {
    site: {
      siteMetadata: { siteUrl },
    },
    mdx: {
      body,
      frontmatter,
      fields: { year, slug },
    },
  },
}) => {
  return (
    <Layout>
      <SEO
        frontmatter={frontmatter}
        url={new URL(slug, siteUrl).href || siteUrl}
      />
      <Link to={`/blog/${year}`}>&larr; Go Back</Link>
      {/* This "link" is for styling gists. */}
      <link
        rel="stylesheet"
        href="https://github.githubassets.com/assets/gist-embed-123720f37c57ce9a8f29de081c38ed61.css"
      ></link>
      <Location>
        {({ location }) => (
          <Box sx={postStyle}>
            <Heading as="h1">{frontmatter.title}</Heading>
            {frontmatter.banner &&
              frontmatter.banner.childImageSharp &&
              frontmatter.banner.childImageSharp.fluid && (
                <Img fluid={frontmatter.banner.childImageSharp.fluid} />
              )}
            Broken Post?{" → "}
            <ExternalLink
              to={`https://twitter.com/intent/tweet?text=@dance2die%20${location.href} is broken!`}
            >
              Let me know
            </ExternalLink>{" "}
            <Styled.root>
              <MDXRenderer>{body}</MDXRenderer>
            </Styled.root>
          </Box>
        )}
      </Location>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
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
        slug
      }
    }
  }
`
