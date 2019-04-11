import React from "react"

const ExternalLink = ({ url, children }) => (
  <a
    css={{ cursor: "pointer" }}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
)

export default ExternalLink
