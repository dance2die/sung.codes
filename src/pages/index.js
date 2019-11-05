import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../layouts"
// // import Dangerous from "dangerous-components"
// // import PostIcons from "../components/post-icon"
// import { rhythm } from "../utils/typography"
// import ExternalLink from "../utils/ExternalLink"

export default () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
          title
        }
      }
    }
  `)

  const {
    site: {
      siteMetadata: { description, title },
    },
  } = data

  return (
    <Layout>
      <h1>Welcome to {title}</h1>
      <p>{description}</p>
    </Layout>
  )
}

// const HomeContainer = styled.main`
//   display: flex;
//   flex-direction: column;
//   margin: ${rhythm(1)} 0;
//   text-align: center;
// `

// const Intro = styled.h2`
//   border-bottom: none;
//   line-height: ${rhythm(1.2)};
// `
// const IntroSubtitle = styled.div`
//   display: block;
//   margin: ${rhythm(0.1)};
// `
// const GreetingTitle = styled.h5``
// const GreetingSubtitle = styled.em``
// const Greeting = styled.article``
// const Body = styled.section`
//   margin: ${rhythm(1.5)} ${rhythm(1.5)};
// `

// function Home({ data }) {
//   const { years } = data.allWordpressPost

//   return (
//     <Layout>
//       <HomeContainer>
//         <Intro>
//           Welcome to the static version of
//           <IntroSubtitle>
//             <ExternalLink url="https://www.slightedgecoder.com/">
//               Slight Edge Coder
//             </ExternalLink>
//           </IntroSubtitle>
//         </Intro>
//         <Greeting>
//           <GreetingTitle>
//             By{" "}
//             <ExternalLink url="https://sungkim.co/">Sung M. Kim</ExternalLink>
//             <GreetingSubtitle>
//               {" "}
//               (aka. dance2die{" "}
//               <span role="img" aria-label="dance2die">
//                 🕺✌🎲
//               </span>
//               )
//             </GreetingSubtitle>
//           </GreetingTitle>
//         </Greeting>
//         <Body>
//           Hope you get a better experience than{" "}
//           <ExternalLink url="https://www.slightedgecoder.com/">
//             SlightEdgeCoder.com
//           </ExternalLink>{" "}
//           <p>&amp; And easier to remember</p>
//           You can also reach this site using{" "}
//           <ExternalLink url="http://dance2die.com">dance2die.com</ExternalLink>
//         </Body>
//       </HomeContainer>
//     </Layout>
//   )
// }

// export default Home

// // Set here the ID of the home page.
// export const pageQuery = graphql`
//   query {
//     allWordpressPost {
//       years: distinct(field: fields___year)
//     }
//   }
// `

// // // Set here the ID of the home page.
// // export const pageQuery = graphql`
// //   query {
// //     allWordpressPost(sort: { fields: [date], order: DESC }) {
// //       edges {
// //         node {
// //           title
// //           excerpt
// //           slug
// //           ...PostIcons
// //         }
// //       }
// //     }
// //   }
// // `
