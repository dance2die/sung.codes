/** @jsx jsx */
import { jsx } from "theme-ui"

const HamburgerContainer = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  height: 2.75rem;
  width: 2.75rem;
  height: 2.75rem;

  background: #ffc600;

  display: flex;
  justify-content: center;
  align-items: center;
`

const HamburgerMenu = styled.p``
const Hamburger = () => (
  <HamburgerContainer>
    <HamburgerMenu>🍔</HamburgerMenu>
  </HamburgerContainer>
)

const NavContainer = styled.nav`
  position: relative;

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

export default () => (
  <NavContainer>
    <Hamburger />
    <NavModal>
      <Logo>
        <MainLogo />
        <SubLogo />
      </Logo>
      <Links />
      <Social />
    </NavModal>
  </NavContainer>
)
