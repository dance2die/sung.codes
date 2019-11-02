// // https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/templates/post.js
// import React from 'react'
// import { graphql } from 'gatsby'
// import PropTypes from 'prop-types'
// import Dangerous from 'dangerous-components'

// import Layout from '../layouts'
// import SEO from '../components/seo'

// import PostIcons from '../components/post-icon'
// import { rhythm } from '../utils/typography'
// import OriginalPost from '../components/OriginalPost'

// function PostTemplate({ data }) {
// 	const post = data.wordpressPost
// 	const {
// 		link,
// 		title,
// 		fields: { content },
// 		categories,
// 	} = post

// 	return (
// 		<Layout>
// 			<SEO
// 				title={title}
// 				canonicalURL={link}
// 				description={title}
// 				keywords={categories.map(_ => _.name)}
// 			/>
// 			<Dangerous html={title} as="h1" />
// 			<img src={post.jetpack_featured_media_url} alt="featured" />
// 			<PostIcons node={post} css={{ marginBottom: rhythm(1 / 2) }} />
// 			<OriginalPost canonicalURL={link} />
// 			<Dangerous html={content} />
// 		</Layout>
// 	)
// }

// PostTemplate.propTypes = {
// 	data: PropTypes.object.isRequired,
// 	edges: PropTypes.array,
// }

// export default PostTemplate

// export const pageQuery = graphql`
// 	query($id: String!) {
// 		wordpressPost(id: { eq: $id }) {
// 			title
// 			link
// 			jetpack_featured_media_url
// 			content
// 			link
// 			...PostIcons
// 			fields {
// 				content
// 			}
// 			categories {
// 				name
// 			}
// 		}
// 		site {
// 			siteMetadata {
// 				title
// 			}
// 		}
// 	}
// `
