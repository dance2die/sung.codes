import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../layouts"
import PostIcons from "../components/post-icon"
import { rhythm } from "../utils/typography"

function Home({ data }) {
  return (
    <Layout>
      <h1>Posts</h1>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div css={{ marginBottom: rhythm(2) }} key={node.slug}>
          <Link
            to={`${node.year}/${node.slug}`}
            css={{ textDecoration: `none` }}
          >
            <h3>{node.title}</h3>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <PostIcons node={node} />
        </div>
      ))}
    </Layout>
  )
}

export default Home

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          excerpt
          slug
          ...PostIcons
        }
      }
    }
  }
`
