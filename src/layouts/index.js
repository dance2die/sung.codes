/** @jsx jsx */
import { jsx } from "theme-ui"
// // https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/layouts/index.js
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
          }
        `}
      />

      <ThemeLayout>
        <Container
          sx={{
            padding: [1, 3, 4, 5],
          }}
        >
          <Nav />
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
