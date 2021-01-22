/** @jsx jsx */
import { jsx, Box, Styled, useColorMode } from "theme-ui"
import { Heading } from "@theme-ui/components"

import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Location } from "@reach/router"
import { URL } from "universal-url"
import { Disqus } from "gatsby-plugin-disqus"

import Layout from "#layouts"
import ExternalLink from "#components/Link/ExternalLink"
import SEO from "#components/seo"
import Webmention from "#components/Webmention"
import { useState, useEffect, useRef } from "react"

const postStyle = {
  h1: {
    marginBottom: 3,
  },
  paddingTop: [3, 3, 4, 4],
  a: {
    color: t => t.colors.primary,
  },
}

/**
 * Reload Disqus on theme change because Disqus is within `iframe`
 * and the theme color changes by Disqus automatically
 */
const useReloadDisqusOnThemeChange = () => {
  const [colorMode] = useColorMode()
  const previousColorMode = useRef(undefined)
  const [shouldReloadDisqus, setShouldReloadDisqus] = useState(true)

  useEffect(() => {
    setShouldReloadDisqus(colorMode !== previousColorMode.current)

    previousColorMode.current = colorMode
  }, [colorMode])

  return shouldReloadDisqus
}

const Post = ({
  data: {
    site: {
      siteMetadata: { siteUrl },
    },
    mdx: {
      id,
      body,
      frontmatter,
      excerpt,
      fields: { year, slug },
    },
  },
}) => {
  const url = new URL(slug, siteUrl).href || siteUrl
  const shouldReloadDisqus = useReloadDisqusOnThemeChange()

  let disqusConfig = {
    url,
    identifier: id,
    title: frontmatter.title,
  }

  return (
    <Layout>
      <SEO
        frontmatter={frontmatter}
        url={url}
        description={excerpt}
        image={
          frontmatter.banner &&
          frontmatter.banner.childImageSharp &&
          frontmatter.banner.childImageSharp.fluid &&
          frontmatter.banner.childImageSharp.fluid.originalImg
        }
      />
      <Link
        to={`/blog/${year}`}
        sx={{
          color: t => t.colors.primary,
        }}
      >
        &larr; Go Back
      </Link>
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
            <Box
              sx={{
                padding: t => `${t.space[4]}px 0`,
                textAlign: "center",
                fontWeight: "heading",
              }}
            >
              Broken Post?{" → "}
              <ExternalLink
                to={`https://twitter.com/intent/tweet?text=@dance2die%20${location.href} is broken!`}
              >
                Let me know
              </ExternalLink>{" "}
            </Box>
            {/* eslint-disable-next-line */}
            <Styled.root>
              <MDXRenderer>{body}</MDXRenderer>
            </Styled.root>
            <Box sx={{ padding: [1, 2, 3, 5] }}>
              <Webmention target={url} />
            </Box>
            <Box sx={{ padding: [1, 2, 3, 5] }}>
              {shouldReloadDisqus && <Disqus config={disqusConfig} />}
            </Box>
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
      id
      body
      frontmatter {
        title
        banner {
          ...bannerImage640
        }
      }
      excerpt
      fields {
        year
        slug
      }
    }
  }
`
export default Post
