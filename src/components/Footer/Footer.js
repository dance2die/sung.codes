import React from "react"
import { rhythm } from "../../utils/typography"

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
  backgroundColor: `#263238`,
  color: "#ffffffb8",
  textAlign: "center",
}

const Footer = () => (
  <footer css={footerContainerStyle}>
    <GoToTop />
    <SourceMaterial />
    <Contact />
    <Copyright />
  </footer>
)

export default Footer
