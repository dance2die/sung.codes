import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../layouts"
// import Dangerous from "dangerous-components"
// import PostIcons from "../components/post-icon"
import { rhythm } from "../utils/typography"
import ExternalLink from "../utils/ExternalLink"

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
`

const Intro = styled.h2`
  border-bottom: none;
  margin-bottom: ${rhythm(0)};
  line-height: ${rhythm(1.2)};
`
const IntroSubtitle = styled.em`
  display: block;
  margin: ${rhythm(0.1)};
`
const GreetingTitle = styled.h3``
const GreetingSubtitle = styled.em``
const Greeting = styled.section``
const Body = styled.p`
  margin: ${rhythm(0.7)} ${rhythm(1.5)};
`

function Home({ data }) {
  // console.log(`data`, data)

  return (
    <Layout>
      <HomeContainer>
        <Intro>
          Welcome to the static version of
          <IntroSubtitle>
            <ExternalLink url="https://www.slightedgecoder.com/">
              Slight Edge Coder
            </ExternalLink>
          </IntroSubtitle>
        </Intro>
        <Greeting>
          <GreetingTitle>
            Hi, I am{" "}
            <ExternalLink url="https://sungkim.co/">Sung M. Kim</ExternalLink>
          </GreetingTitle>
          <GreetingSubtitle>
            (aka. dance2die{" "}
            <span role="img" aria-label="dance2die">
              🕺✌🎲
            </span>
            )
          </GreetingSubtitle>
        </Greeting>
        <Body>
          Hopefully this site provides a better/faster experience than the
          WordPress version,{" "}
          <ExternalLink url="https://www.slightedgecoder.com/">
            SlightEdgeCoder.com
          </ExternalLink>
        </Body>
        <Body>And easier to remember</Body>
        <Body>
          You can also reach this site using{" "}
          <ExternalLink url="http://dance2die.com">dance2die.com</ExternalLink>
        </Body>
      </HomeContainer>
    </Layout>
  )
}

export default Home

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          excerpt
          slug
          ...PostIcons
        }
      }
    }
  }
`

// export const pageQuery = graphql`
//   query blogListQuery($skip: Int!, $limit: Int!) {
//     allWordpressPost(
//       sort: { fields: [date], order: DESC }
//       limit: $limit
//       skip: $skip
//     ) {
//       edges {
//         node {
//           title
//           excerpt
//           slug
//           ...PostIcons
//         }
//       }
//     }
//   }
// `
