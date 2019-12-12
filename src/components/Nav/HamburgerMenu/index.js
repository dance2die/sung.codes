/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import styled from "@emotion/styled"
import { useState } from "react"

import { GitHub, Twitter } from "#components/social"
import Link from "#components/Link/TextLink"

const Hamburger = ({ onClick }) => (
  <a
    onClick={onClick}
    sx={{
      height: "2.75rem",
      width: "2.75rem",
      background: theme => theme.colors.primary,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    🍔
  </a>
)

const NavModal = styled.section`
  text-transform: uppercase;
  border: 1px solid #cacaca;
  padding: 3rem;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;
`

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
      color: black;
    }
    a:hover {
      text-decoration: underline;
    }
  }
`
const Links = () => (
  <ul
    sx={{
      width: "100%",
      lineHeight: "5rem",
      listStyle: "none",
      textAlign: "center",
    }}
  >
    <LinkItem>
      <Link to="/">Home</Link>
    </LinkItem>
    <LinkItem>
      <Link to="/about">About</Link>
    </LinkItem>
    <LinkItem>
      <Link to="/blog">Blog</Link>
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
  const toggleClicked = () => {
    console.info("clicked!", isClicked)
    setIsClicked(clicked => !clicked)
  }

  return (
    <Fragment>
      <Hamburger onClick={toggleClicked} />
      {isClicked && (
        <nav
          sx={{
            "& a": { color: t => t.colors.text },
            background: t => t.colors.background,
            position: "absolute",
            top: "0",

            padding: "3.75rem",

            width: "100%",
            height: "99vh",
          }}
        >
          <NavModal>
            <header
              sx={{
                textAlign: "center",
              }}
            >
              <MainLogo />
              <SubLogo />
            </header>
            <Links />
            <Social />
          </NavModal>
        </nav>
      )}
    </Fragment>
  )
}
