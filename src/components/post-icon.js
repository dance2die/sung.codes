// import { graphql } from 'gatsby'
// import React from 'react'
// import { rhythm } from '../utils/typography'

// const dateCss = {
// 	color: '#000c',
// 	fontSize: rhythm(1 / 1.75),
// 	marginRight: rhythm(1),
// 	fontStyle: 'italic',
// }

// export default ({ node, className = `` }) => (
// 	<div css={{ marginTop: rhythm(-1 / 2) }} className={className}>
// 		<span css={dateCss}>{node.date}</span>
// 	</div>
// )

// export const query = graphql`
// 	fragment PostIcons on wordpress__POST {
// 		date(formatString: "MMMM DD, YYYY")
// 		year: date(formatString: "YYYY")
// 		tags {
// 			name
// 		}
// 		categories {
// 			name
// 		}
// 	}
// `
