// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/src/layouts/index.js
import React from "react"

import { Layout as ThemeLayout, Main, Header } from "theme-ui"
import { Global, css } from "@emotion/core"

import Nav from "../components/Nav"

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
          <Nav />
        </Header>
        <Main>{children} </Main>
      </ThemeLayout>
    </>
  )
}

export default Layout
