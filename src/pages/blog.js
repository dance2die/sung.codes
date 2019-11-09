/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading, Text, Box } from "@theme-ui/components"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "@emotion/styled"

import Layout from "#layouts"
import SEO from "#components/seo"

const getYearCounts = nodes =>
  nodes.reduce((acc, { year }) => {
    acc[year] = ++acc[year] || 1
    return acc
  }, {})

const Body = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  padding: 3rem 0;
`

const Block = styled(Link)(({ theme }) => ({
  padding: `3rem 2rem`,
  margin: `.5rem`,
  border: `1px solid ${theme.colors.gray[1]}`,

  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,

  textDecoration: `none`,
  color: theme.colors.gray[3],
  backgroundColor: theme.colors.background,

  "&:hover": {
    // backgroundColor: theme.colors.gray[0],
    transform: "scale(1.035)",
    textDecoration: "underline",
    borderBottom: theme => `6px solid ${theme.colors.primary}`,
  },
}))

const byYearDescending = ([year1], [year2]) => year2 - year1
const toPost = ([year, count]) => (
  <Box
    sx={{
      width: ["95%", "50%", "30%", "35%"],
      // https://css-tricks.com/gradient-borders-in-css/
      "&:hover": {
        background: theme =>
          `linear-gradient(to bottom left, ${theme.colors.background}, ${theme.colors.primary})`,
      },
    }}
  >
    <Block
      key={year}
      to={`/blog/${year}`}
      sx={{
        boxShadow:
          "0 12px 24px -10px rgba(0,0,0,0.06), 0 16px 40px -5px rgba(0,0,0,0.1)",
      }}
    >
      <Heading
        as="h3"
        sx={{
          fontSize: theme => theme.fontSizes[5],
        }}
      >
        {year}
      </Heading>
      <Text sx={{ fontSize: theme => theme.fontSizes[3] }}>
        {count} post{count > 1 ? "s" : ""}
      </Text>
    </Block>
  </Box>
)

export default () => {
  const data = useStaticQuery(graphql`
    {
      allDirectory(
        filter: {
          sourceInstanceName: { eq: "blog" }
          relativeDirectory: { regex: "/^\\\\d{4}$/" }
        }
      ) {
        totalCount
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
      <SEO />
      <Heading>Blogs by year</Heading>
      <Body>{postBlocks}</Body>
    </Layout>
  )
}
