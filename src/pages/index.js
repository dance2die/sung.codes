import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../layouts"
import PostIcons from "../components/post-icon"

import { rhythm } from "../utils/typography"

function Home({ data }) {
  const years = new Set(
    data.allWordpressPost.edges.map(({ node }) => node.year)
  )

  return (
    <Layout>
      <div css={{ marginBottom: rhythm(1) }}>
        <h1>Pages</h1>
        {data.allWordpressPage.edges.map(({ node }) => (
          <div key={node.slug}>
            <Link to={node.slug} css={{ textDecoration: `none` }}>
              <h3>{node.title}</h3>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            <span>{node.date}</span>
          </div>
        ))}
      </div>
      <hr />

      <section>
        <h1>Distinct Years</h1>
        <ul>
          {Array.from(years)
            .sort((a, b) => b - a)
            .map(year => (
              <li key={year}>{year}</li>
            ))}
        </ul>
      </section>

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
    allWordpressPage(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          title
          excerpt
          slug
          date
        }
      }
    }
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
