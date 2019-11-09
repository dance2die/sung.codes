/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// https://www.gatsbyjs.org/packages/gatsby-source-wordpress/#sites-gatsby-nodejs-example

const path = require("path")

const onCreateNode = ({ node, actions, getNode }) => {
  // console.info(`node.internal.type ==>`, node.internal.type)
  if (node.internal.type === "Mdx") {
    // https://github.com/gatsbyjs/gatsby/issues/16706#issuecomment-522534237
    // https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#make-a-template-for-your-posts
    // const basename = path.basename(node.fileAbsolutePath)
    const [year, month, day] = path
      .basename(node.frontmatter.date)
      .substring(0, 10)
      .split("-")

    // [m, d, y] = new Date('2018-12-19T02:14:23.000Z').toLocaleDateString().split("/")
    // const [year, month, day] = new Date(node.frontmatter.date).toLocaleDateString().split("/")

    const parentNode = getNode(node.parent)
    // drop extra-year in the slug.
    // "2019/netlify-not-found" => "netlify-not-found"
    const folderName = parentNode.relativeDirectory.replace(`${year}/`, "")
    const slug = `/blog/${year}/${month}/${day}/${folderName}/`

    const { createNodeField } = actions
    createNodeField({ node, name: "slug", value: slug })
    createNodeField({ node, name: "year", value: year })
    createNodeField({ node, name: "month", value: month })
    createNodeField({ node, name: "day", value: day })
  }
}

const createPosts = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const query = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (query.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Create blog post pages.
  const posts = query.data.allMdx.edges
  const { createPage } = actions

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: { id: node.id },
    })
  })
}

const createBlogYearPages = async ({ graphql, actions, reporter }) => {
  const query = await graphql(`
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

  if (query.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "postYears" query')
  }

  // Create a page per year
  const years = query.data.allDirectory.nodes
  const { createPage } = actions

  years.forEach(({ year }) => {
    createPage({
      path: `/blog/${year}`,
      component: path.resolve(`./src/templates/postsPerYear.js`),
      context: { year },
    })
  })
}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#make-a-template-for-your-posts
const createPages = async ({ graphql, actions, reporter }) => {
  await createBlogYearPages({ graphql, actions, reporter })
  await createPosts({ graphql, actions, reporter })
}

module.exports = { onCreateNode, createPages }
