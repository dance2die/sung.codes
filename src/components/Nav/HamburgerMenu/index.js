/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import styled from "@emotion/styled"
import { useState } from "react"

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

const NavContainer = styled.nav`
  position: absolute;
  top: 0;

  padding: 2.75rem;

  width: 100vw;
  height: 100vh;
`

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
      <a href="/">Home</a>
    </LinkItem>
    <LinkItem>
      <a href="/about">About</a>
    </LinkItem>
    <LinkItem>
      <a href="/blog">Blog</a>
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
      <a href="https://twitter.com/dance2die">Twitter</a>
      <a href="https://github.com/dance2die">GitHub</a>
    </section>
    <section>
      <a href="https://dev.to/dance2die">DEV</a>
      <a href="https://stackoverflow.com/users/4035/dance2die">StackOverflow</a>
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
        <NavContainer>
          <NavModal>
            <Logo>
              <MainLogo />
              <SubLogo />
            </Logo>
            <Links />
            <Social />
          </NavModal>
        </NavContainer>
      )}
    </Fragment>
  )
}
