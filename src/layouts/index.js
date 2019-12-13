/** @jsx jsx */
import { jsx } from "theme-ui"
// // https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/layouts/index.js
// eslint-disable-next-line
import React from "react"

import { Container, Layout as ThemeLayout, Main } from "theme-ui"
import { Global, css } from "@emotion/core"

import Nav from "#components/Nav"

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
            box-sizing: border-box;
          }

          /* Override in-line code snippet styling 
          https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#optional-add-line-highlighting-styles */
          :not(pre) > code[class*="language-"] {
            padding: 0.15rem 0.4rem;
            border-radius: 0.3em;
            white-space: normal;
          }

          hr {
            margin: 1rem 0;
          }
        `}
      />

      <ThemeLayout>
        <Container
          sx={{
            padding: [1, 2, 4, 5],
          }}
        >
          {typeof window !== "undefined" && <Nav />}
          <Container
            sx={{
              padding: [1, 2, 3, 4],
            }}
          >
            <Main>{children} </Main>
          </Container>
        </Container>
      </ThemeLayout>
    </>
  )
}

export default Layout
