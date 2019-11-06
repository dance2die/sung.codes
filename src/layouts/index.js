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
          <Heading as="h1">{"{ sung.codes }"}</Heading>
          <Heading as="sup">by dance2die</Heading>
        </Header>
        <Main>{children} </Main>
      </ThemeLayout>
    </>
  )
}

export default Layout
