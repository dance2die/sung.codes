import React from "react"
import { Link, graphql } from "gatsby"
import Dangerous from "dangerous-components"

import Layout from "../layouts"
import PostIcons from "../components/post-icon"
import { rhythm } from "../utils/typography"

function Home({ data }) {
  // console.log(`data`, data)

  return (
    <Layout>
      <section className="introduction">
        <h2>Hi, I am Sung M. Kim </h2>
        <em>(aka. dance2die 🕺✌🎲)</em>
      </section>
      <section className="greeting">
        Welcome to the static (built w/ Gatsby) version of my technical blog.
      </section>
      <section className="body">
        Hopefully this site provides a better/faster experience than the
        WordPress version, SlightEdgeCoder.com.
      </section>
      <section className="body">
        And easier to remember (sung.codes) than arcane SlightEdgeCoder
      </section>
      <section className="body">
        You can also reach this site via dance2die.com
      </section>

      {/* {data.allWordpressPost.edges.map(({ node }) => (
        <div css={{ marginBottom: rhythm(2) }} key={node.slug}>
          <Link
            to={`${node.year}/${node.slug}`}
            css={{ textDecoration: `none` }}
          >
            <h3>{node.title}</h3>
          </Link>

          <Dangerous html={node.excerpt} />
          <PostIcons node={node} />
        </div>
      ))} */}
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

// export const pageQuery = graphql`
//   query blogListQuery($skip: Int!, $limit: Int!) {
//     allWordpressPost(
//       sort: { fields: [date], order: DESC }
//       limit: $limit
//       skip: $skip
//     ) {
//       edges {
//         node {
//           title
//           excerpt
//           slug
//           ...PostIcons
//         }
//       }
//     }
//   }
// `
