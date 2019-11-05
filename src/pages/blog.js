import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../layouts"

const getYearCounts = nodes =>
  nodes.reduce((acc, { year }) => {
    acc[year] = ++acc[year] || 1
    return acc
  }, {})

const Header = styled.header``
const Body = styled.main`
  display: flex;
  flex-flow: row wrap;
  padding: 1.5rem;
`
const Block = styled.article`
  padding: 2rem;
`

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
      <Header>
        <h2>Welcome to Sung's Blog~</h2>
      </Header>
      <Body>{postBlocks}</Body>
    </Layout>
  )
}
