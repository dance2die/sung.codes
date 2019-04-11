import React from "react"

const ExternalLink = ({ url, children }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

export default ExternalLink
