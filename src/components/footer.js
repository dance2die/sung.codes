import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { scale } from "../utils/typography"

const Footer = ({ siteTitle }) => (
  <footer
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1
        css={{
          margin: 0,
          fontSize: scale(1.5).fontSize,
          lineHeight: 1,
          borderBottom: "none",
          "@media screen and (min-width: 500px)": {
            fontSize: scale(1.9).fontSize,
            lineHeight: 1,
          },
        }}
      >
        <Link
          css={{
            color: `#4078c0`,
            ":hover": {
              color: `#FFEB3B`,
              textDecoration: `none`,
            },
          }}
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
