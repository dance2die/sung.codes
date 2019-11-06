/** @jsx jsx */
import { jsx } from "theme-ui"
// import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../layouts"

const getYearCounts = nodes =>
  nodes.reduce((acc, { year }) => {
    acc[year] = ++acc[year] || 1
    return acc
  }, {})

const Body = styled.main`
  display: flex;
  flex-flow: row wrap;
  padding: 1.5rem;
`

const Block = styled.article(({ theme }) => ({
  padding: `3rem 2rem`,
  margin: `.5rem`,
  width: `20vw`,
  border: `1px solid ${theme.colors.gray[1]}`,

  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,

  "&:hover": {
    backgroundColor: theme.colors.gray[0],
  },
}))

const byYearDescending = ([year1], [year2]) => year2 - year1
const toPost = ([year, count]) => (
  <Link key={year} to={`/blog/${year}`}>
    <Block>
      <h3>{year}</h3>
      <p>
        {count} post{count > 1 ? "s" : ""}
      </p>
    </Block>
  </Link>
)

export default () => {
  const data = useStaticQuery(graphql`
    {
      allDirectory(
        filter: {
          sourceInstanceName: { eq: "blog" }
          relativeDirectory: { regex: "/^\\\\d{4}$/gi" }
        }
      ) {
        nodes {
          year: relativeDirectory
        }
      }
    }
  `)

  const postBlocks = Object.entries(getYearCounts(data.allDirectory.nodes))
    .sort(byYearDescending)
    .map(toPost)

  return (
    <Layout>
      <h2 sx={{ fontFamily: theme => theme.fonts.heading }}>
        Welcome to Sung's Blog~
      </h2>
      <Body>{postBlocks}</Body>
    </Layout>
  )
}
