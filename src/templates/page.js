// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/templates/page.js
import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PostIcons from "../components/post-icon"
import Layout from "../layouts"

import { rhythm } from "../utils/typography"

// const PageTemplate = ({ data }) => {
const PageTemplate = ({ data }) => {
  const currentPage = data.wordpressPage
  console.log(`=> props`, currentPage)

  const years = Array.from(
    new Set(data.allWordpressPost.edges.map(({ node }) => node.year))
  )

  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
      <PostIcons node={currentPage} css={{ marginBottom: rhythm(1 / 2) }} />
    </Layout>
  )

  //   return (
  //     <Layout>
  //       <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
  //       <PostIcons node={currentPage} css={{ marginBottom: rhythm(1 / 2) }} />
  //       <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
  //     </Layout>
  //   )
}

export default PageTemplate

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          year: date(formatString: "YYYY")
        }
      }
    }
  }
`

// export const pageQuery = graphql`
//   query($id: String!) {
//     wordpressPage(id: { eq: $id }) {
//       title
//       content
//       date(formatString: "MMMM DD, YYYY")
//     }
//     site {
//       id
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
