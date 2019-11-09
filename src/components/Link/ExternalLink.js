import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const ExternalLink = ({ to, ...rest }) => (
  <OutboundLink href={to} target="_blank" rel="noopener noreferrer" {...rest} />
)

export default ExternalLink
