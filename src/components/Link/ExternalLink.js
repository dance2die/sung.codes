import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const ExternalLink = ({ url, ...rest }) => (
  <OutboundLink
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    {...rest}
  />
)

export default ExternalLink
