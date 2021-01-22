/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import { Fragment } from "react"
import styled from "@emotion/styled"
import { useState } from "react"

import { GitHub, Twitter } from "#components/social"
import Link from "#components/Link/TextLink"
import ThemeSwitch from "../ThemeSwitch"

const MainLogo = () => (
  <h1
    sx={{
      fontSize: "170%",
      fontWeight: "bold",
    }}
  >{`{sung.codes}`}</h1>
)
const SubLogo = () => (
  <h2
    sx={{
      fontSize: "1rem",
    }}
  >
    by dance2die
  </h2>
)

const LinkItem = styled.li`
  font-size: 1.5rem;

  & {
    a {
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }
`

const HamburgerMenuLink = ({ onClick = () => {}, to, children }) => (
  <Link
    sx={{
      "&.active": {
        textDecoration: "underline",
        fontWeight: "bold",
      },
    }}
    to={to}
    onClick={onClick}
  >
    {children}
  </Link>
)

const Links = ({ onClick }) => (
  <ul
    sx={{
      width: "100%",
      lineHeight: "5rem",
      listStyle: "none",
      textAlign: "center",
    }}
  >
    <LinkItem>
      <ThemeSwitch />
    </LinkItem>
    <LinkItem>
      <HamburgerMenuLink onClick={onClick} to="/">
        Home
      </HamburgerMenuLink>
    </LinkItem>
    <LinkItem>
      <HamburgerMenuLink onClick={onClick} to="/blog">
        Blog
      </HamburgerMenuLink>
    </LinkItem>
  </ul>
)

const Social = () => (
  <section
    sx={{
      "& a": { padding: "1rem" },
      lineHeight: "3rem",
    }}
  >
    <h3>Follow Me</h3>
    <section>
      <Twitter />
      <GitHub />
    </section>
  </section>
)

export default () => {
  const [isClicked, setIsClicked] = useState(false)
  const toggleClicked = () => setIsClicked(clicked => !clicked)
  const [colorMode] = useColorMode()

  return (
    <Fragment>
      <button
        onClick={toggleClicked}
        sx={{
          // backgroundColor: "transparent",
          borderStyle: "none",
          "&:focus": { outline: 0 },
          "&:hover": { textDecoration: "none", cursor: "pointer" },

          zIndex: "99",
          height: "2.75rem",
          width: "2.75rem",
          background: theme =>
            colorMode === "dark"
              ? theme.colors.primary
              : theme.colors.secondary,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {isClicked ? "❌" : "🍔"}
      </button>
      {isClicked && (
        <nav
          sx={{
            background: t => t.colors.background,
            position: "absolute",
            top: "0",

            padding: "3.75rem 2.75rem 3.75rem",

            width: "100%",
            height: "99vh",
          }}
        >
          <section
            sx={{
              textTransform: "uppercase",
              border: "1px solid #cacaca",
              padding: "3rem",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <header
              sx={{
                textAlign: "center",
              }}
            >
              <MainLogo />
              <SubLogo />
            </header>
            <Links onClick={toggleClicked} />
            <Social />
          </section>
        </nav>
      )}
    </Fragment>
  )
}
