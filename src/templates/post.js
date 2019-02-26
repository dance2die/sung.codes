// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/templates/post.js
import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import Layout from "../layouts"
import SEO from "../components/seo"

import PostIcons from "../components/post-icon"
import { rhythm } from "../utils/typography"

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost
    const {
      link,
      title,
      fields: { content },
      categories,
    } = post

    return (
      <Layout>
        <SEO
          title={title}
          canonicalURL={link}
          description={title}
          keywords={categories.map(_ => _.name)}
        />
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <img src={post.jetpack_featured_media_url} alt="featured" />
        <PostIcons node={post} css={{ marginBottom: rhythm(1 / 2) }} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Layout>
    )
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
      link
      jetpack_featured_media_url
      content
      link
      ...PostIcons
      fields {
        content
      }
      categories {
        name
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
