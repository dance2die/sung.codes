// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/layouts/index.js
import React from "react"

import { Layout as ThemeLayout, Main, Header } from "theme-ui"
import { Heading } from "@theme-ui/components"

import { Global, css } from "@emotion/core"

function Layout({ children }) {
  return (
    <>
      <Global
        styles={css`
          *,
          *::after,
          *::before {
            margin: 0;
            padding: 0;
          }
        `}
      />

      <ThemeLayout>
        <Header>
          <Heading as="h1">{"{sung.codes}"} by dance2die</Heading>
        </Header>
        <Main>{children} </Main>
      </ThemeLayout>
    </>
  )
}

// const containerStyle = {
//   maxWidth: 750,
//   margin: `0 auto`,
//   padding: rhythm(3 / 4),
// }
// function Layout(props) {
//   return (
//     <StaticQuery
//       query={graphql`
//         query {
//           allWordpressPost(sort: { fields: [date], order: DESC }) {
//             edges {
//               node {
//                 year: date(formatString: "YYYY")
//               }
//             }
//           }
//         }
//       `}
//       render={data => (
//         <div>
//           <div
//             css={{
//               // background: "#263238",
//               // background: "-webkit-linear-gradient(to right, #ACB6E5, #74ebd5)",
//               // background: "linear-gradient(to right, #ACB6E5, #74ebd5)",
//               background: `linear-gradient(rgba(0,0,0,0.79),rgba(0,0,0,0.75)),url(${background})`,
//               backgroundSize: "1% 2%",
//               backgroundRepeat: "repeat",
//               padding: `${rhythm(1)} 0px`,
//               "@media screen and (min-width: 500px)": {
//                 padding: `${rhythm(2)} 0px`,
//               },
//               // textAlign: "center",
//             }}
//           >
//             <div css={containerStyle}>
//               <Header siteTitle={"sung.{ codes }"} />
//               <section>
//                 <YearsTabs years={getYears(data.allWordpressPost.edges)} />
//               </section>
//             </div>
//           </div>
//           <div css={containerStyle}>{props.children}</div>
//           <Footer />
//         </div>
//       )}
//     />
//   )
// }

export default Layout
