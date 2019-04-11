import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { scale, rhythm } from "../../utils/typography"

import GoToTop from "./GoToTop"
import SourceMaterial from "./SourceMaterial"
import Contact from "./Contact"
import Copyright from "./Copyright"

const footerContainerStyle = {
  margin: 0,
  padding: 0,
  height: rhythm(13),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: `#495057`,
  color: "#ffffffb8",
}

const Footer = ({ siteTitle }) => (
  <footer css={footerContainerStyle}>
    <GoToTop />
    <SourceMaterial />
    <Contact />
    <Copyright />
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
