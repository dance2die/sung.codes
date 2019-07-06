import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../layouts"
// import Dangerous from "dangerous-components"
// import PostIcons from "../components/post-icon"
import { rhythm, scale } from "../utils/typography"
import ExternalLink from "../utils/ExternalLink"

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
`

const Intro = styled.h2`
  border-bottom: none;
  margin-bottom: ${rhythm(0)};
`
const IntroSubtitle = styled.em`
  display: block;
  margin: ${rhythm(0.1)};
`
const GreetingTitle = styled.h3``
const GreetingSubtitle = styled.em``
const Greeting = styled.section``
const Body = styled.section`
  margin: ${rhythm(0.5)};
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
          <GreetingTitle>Hi, I am Sung M. Kim </GreetingTitle>
          <IntroSubtitle>(aka. dance2die 🕺✌🎲)</IntroSubtitle>
        </Greeting>
        <Body>
          Hopefully this site provides a better/faster experience than the
          WordPress version, SlightEdgeCoder.com.
        </Body>
        <Body>
          And easier to remember (sung.codes) than arcane SlightEdgeCoder
        </Body>
        <Body>You can also reach this site via dance2die.com</Body>
      </HomeContainer>
      {/* {data.allWordpressPost.edges.map(({ node }) => (
        <div css={{ marginBottom: rhythm(2) }} key={node.slug}>
          <Link
            to={`${node.year}/${node.slug}`}
            css={{ textDecoration: `none` }}
          >
            <h3>{node.title}</h3>
          </Link>

          <Dangerous html={node.excerpt} />
          <PostIcons node={node} />
        </div>
      ))} */}
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
