import React, { useEffect } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Layout from "../layouts"

const buildPostYears = nodes =>
  nodes.reduce((acc, { relativeDirectory: year }) => {
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
          relativeDirectory
        }
      }
    }
  `)

  const postYears = buildPostYears(data.allDirectory.nodes)

  useEffect(() => {
    console.info(`postYears=>`, postYears)
  }, [postYears])

  return (
    <Layout>
      <h1>blog home page</h1>
      <section className="posts">
        <header className="posts__header">
          <h2>Posts?</h2>
        </header>
        <main className="posts__body">
          {Object.entries(postYears).map(([year, count]) => (
            <article key={year} className="posts__year">
              <h3>{year}</h3>
              <p>{count}</p>
            </article>
          ))}
        </main>
      </section>
    </Layout>
  )
}
