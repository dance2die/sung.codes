/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const TextLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "&:hover": { textDecoration: "underline" },
  color: theme.colors.text,
}))

export default ({ activeClassName = "active", ...rest }) => (
  <TextLink activeClassName={activeClassName} {...rest} />
)
