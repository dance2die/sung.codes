/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

export default ({ activeClassName = "active", ...rest }) => (
  <Link
    sx={{
      textDecoration: "none",
      color: theme => theme.colors.text,
      "&:hover": { textDecoration: "underline" },
    }}
    activeClassName={activeClassName}
    {...rest}
  />
)
