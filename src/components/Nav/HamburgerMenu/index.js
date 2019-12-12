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

const Logo = styled.header`
  display: flex;
  flex-direction: column;
`

const StyledMainLogo = styled.h1`
  font-size: 170%;
  font-weight: bold;
`
const StyledSubLogo = styled.h2`
  font-size: 1rem;
`
const MainLogo = () => <StyledMainLogo>{`{sung.codes}`}</StyledMainLogo>
const SubLogo = () => <StyledSubLogo>by dance2die</StyledSubLogo>

const LinkList = styled.ul`
  line-height: 5rem;
`
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
  <LinkList>
    <LinkItem>
      <Link to="/">Home</Link>
    </LinkItem>
    <LinkItem>
      <Link to="/about">About</Link>
    </LinkItem>
    <LinkItem>
      <Link to="/blog">Blog</Link>
    </LinkItem>
  </LinkList>
)

const SocialContainer = styled.section`
  & a {
    padding: 1rem;
  }
`
const SubTitle = styled.h3``
const Social = () => (
  <SocialContainer>
    <SubTitle>Follow Me</SubTitle>
    <section>
      <Twitter />
      <GitHub />
    </section>
  </SocialContainer>
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
            background: t => t.colors.background,
            position: "absolute",
            top: "0",

            padding: "3.75rem",

            width: "100vw",
            height: "100vh",
          }}
        >
          <NavModal>
            <Logo>
              <MainLogo />
              <SubLogo />
            </Logo>
            <Links />
            <Social />
          </NavModal>
        </nav>
      )}
    </Fragment>
  )
}
