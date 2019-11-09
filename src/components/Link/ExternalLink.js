/** @jsx jsx */
import { jsx } from "theme-ui"
import styled from "@emotion/styled"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const RawExternalLink = ({ to, ...rest }) => (
  <OutboundLink href={to} target="_blank" rel="noopener noreferrer" {...rest} />
)

const ExternalLink = styled(RawExternalLink)(({ theme, color }) => ({
  textDecoration: "none",
  "&:hover": { textDecoration: "underline" },
  color: color || theme.colors.text,
}))

export default ExternalLink
