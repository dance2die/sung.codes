import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../layouts"

const buildPostYears = nodes =>
  nodes.reduce((acc, { year }) => {
    acc[year] = ++acc[year] || 1
    return acc
  }, {})

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

  const postYears = buildPostYears(data.allDirectory.nodes)

  return (
    <Layout>
      <h1>blog home page</h1>
      <section className="posts">
        <header className="posts__header">
          <h2>Posts?</h2>
        </header>
        <main className="posts__body">
          {Object.entries(postYears)
            // Show newer years first
            .sort(([year1], [year2]) => year2 - year1)
            .map(([year, count]) => (
              <Link to={`/blog/${year}`}>
                <article key={year} className="posts__year">
                  <h3>{year}</h3>
                  <p>{count}</p>
                </article>
              </Link>
            ))}
        </main>
      </section>
    </Layout>
  )
}