// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/layouts/index.js
import React from "react"
import { Link, StaticQuery } from "gatsby"
import YearsTabs from "../components/YearsTabs"

import { rhythm, scale } from "../utils/typography"

const containerStyle = {
  maxWidth: 700,
  margin: `0 auto`,
  padding: rhythm(3 / 4),
}

function getYears(edges) {
  return Array.from(new Set(edges.map(({ node }) => node.year)))
}

function Layout(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allWordpressPost(sort: { fields: [date], order: DESC }) {
            edges {
              node {
                year: date(formatString: "YYYY")
              }
            }
          }
        }
      `}
      render={data => (
        <div>
          <div
            css={{
              background: `rgb(207, 58, 62)`,
              marginBottom: rhythm(1),
              padding: `${rhythm(1)} 0px`,
              "@media screen and (min-width: 500px)": {
                padding: `${rhythm(2)} 0px`,
              },
            }}
          >
            <div css={containerStyle}>
              <h1
                css={{
                  margin: 0,
                  fontSize: scale(1.5).fontSize,
                  lineHeight: 1,
                  "@media screen and (min-width: 500px)": {
                    fontSize: scale(1.9).fontSize,
                    lineHeight: 1,
                  },
                }}
              >
                <Link
                  css={{
                    color: `rgb(224,203,144)`,
                    ":hover": {
                      color: `rgb(224,203,144)`,
                      textDecoration: `none`,
                    },
                  }}
                  to="/"
                >
                  {"sung.{ codes }"}
                </Link>
              </h1>
              <section>
                <YearsTabs years={getYears(data.allWordpressPost.edges)} />
              </section>
            </div>
          </div>
          <div css={containerStyle}>{props.children}</div>
        </div>
      )}
    />
  )
}

export default Layout
