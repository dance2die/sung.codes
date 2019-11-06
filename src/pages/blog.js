/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading } from "@theme-ui/components"
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
      <Heading as="h3">{year}</Heading>
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
      <Heading>Welcome to Sung's Blog~</Heading>
      <Body>{postBlocks}</Body>
    </Layout>
  )
}
