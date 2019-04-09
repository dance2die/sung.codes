import { graphql } from "gatsby"
import React from "react"
import { rhythm } from "../utils/typography"

const marginLeft = rhythm(1 / 5)

// const tagCss = {
//   color: "blue",
//   fontSize: rhythm(1 / 2),
//   marginLeft: marginLeft,
// }

// const categoryCss = {
//   color: "red",
//   fontSize: rhythm(1 / 2),
//   marginLeft: marginLeft,
// }

const dateCss = {
  color: "#000c",
  fontSize: rhythm(1 / 1.75),
  marginRight: rhythm(1),
  fontStyle: "italic",
}

export default ({ node, className = `` }) => (
  <div css={{ marginTop: rhythm(-1 / 2) }} className={className}>
    <span css={dateCss}>{node.date}</span>
    {/* 
    {node.categories &&
      node.categories.map(category => (
        <span
          style={{ marginRight: rhythm(1) }}
          key={category.name}
          css={categoryCss}
        >
          {category.name}
        </span>
      ))}
    {node.tags &&
      node.tags.map(tag => (
        <span key={tag.name} css={tagCss}>
          {tag.name}
        </span>
      ))}
      */}
  </div>
)

export const query = graphql`
  fragment PostIcons on wordpress__POST {
    date(formatString: "MMMM DD, YYYY")
    year: date(formatString: "YYYY")
    tags {
      name
    }
    categories {
      name
    }
  }
`
