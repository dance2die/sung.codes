// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/templates/post.js
import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from "../layouts"

// import PostIcons from "../components/post-icon"
// import { rhythm } from "../utils/typography"

class PostTemplate extends Component {
  render() {
    // const post = this.props.data.wordpressPost

    return (
      <Layout>
        <h1>Post!</h1>
      </Layout>
    )
    // return (
    //   <Layout>
    //     <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
    //     <PostIcons node={post} css={{ marginBottom: rhythm(1 / 2) }} />
    //     <div dangerouslySetInnerHTML={{ __html: post.content }} />
    //   </Layout>
    // )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      ...PostIcons
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
