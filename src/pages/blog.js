import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../layouts"

const getYearCounts = nodes =>
  nodes.reduce((acc, { year }) => {
    acc[year] = ++acc[year] || 1
    return acc
  }, {})

const byYearDescending = ([year1], [year2]) => year2 - year1
const toPost = ([year, count]) => (
  <Link key={year} to={`/blog/${year}`}>
    <article className="posts__year">
      <h3>{year}</h3>
      <p>{count}</p>
    </article>
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

  const yearCounts = getYearCounts(data.allDirectory.nodes)
  const postBlocks = Object.entries(yearCounts)
    .sort(byYearDescending)
    .map(toPost)

  return (
    <Layout>
      <h1>blog home page</h1>
      <section className="posts">
        <header className="posts__header">
          <h2>Posts?</h2>
        </header>
        <main className="posts__body">{postBlocks}</main>
      </section>
    </Layout>
  )
}
