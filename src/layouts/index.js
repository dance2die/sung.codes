// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/layouts/index.js
import React from "react"
import { Link, StaticQuery } from "gatsby"
import YearsTabs from "../components/YearsTabs"
import Header from "../components/header"
import Footer from "../components/Footer"

import { rhythm, scale } from "../utils/typography"

const containerStyle = {
  maxWidth: 750,
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
              background: "#74ebd5",
              background: "-webkit-linear-gradient(to right, #ACB6E5, #74ebd5)",
              background: "linear-gradient(to right, #ACB6E5, #74ebd5)",

              padding: `${rhythm(1)} 0px`,
              "@media screen and (min-width: 500px)": {
                padding: `${rhythm(2)} 0px`,
              },
            }}
          >
            <div css={containerStyle}>
              <Header siteTitle={"sung.{ codes }"} />
              <section>
                <YearsTabs years={getYears(data.allWordpressPost.edges)} />
              </section>
            </div>
          </div>
          <div css={containerStyle}>{props.children}</div>
          <Footer />
        </div>
      )}
    />
  )
}

export default Layout
