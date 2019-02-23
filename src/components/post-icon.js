import { graphql } from "gatsby"
import React from "react"
import { rhythm } from "../utils/typography"

export default ({ node, className = `` }) => (
  <div css={{ marginTop: rhythm(-1 / 2) }} className={className}>
    <span style={{ marginRight: rhythm(1) }}>{node.date}</span>
    {node.categories &&
      node.categories.map(category => (
        <span style={{ marginRight: rhythm(1) }} key={category.name}>
          {category.name}
        </span>
      ))}
    {node.tags && node.tags.map(tag => <span key={tag.name}>{tag.name}</span>)}
  </div>
)

export const query = graphql`
  fragment PostIcons on wordpress__POST {
    date(formatString: "MMMM DD, YYYY")
    tags {
      name
    }
    categories {
      name
    }
  }
`
