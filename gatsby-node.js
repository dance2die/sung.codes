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

    const parentNode = getNode(node.parent)
    const slug = `/blog/${year}/${month}/${day}/${parentNode.relativeDirectory}/`

    const { createNodeField } = actions
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

const createPosts = async ({ graphql, actions }) => {
  // Destructure the createPage function from the actions object
  const result = await graphql(`
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

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges
  const { createPage } = actions

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/posts-page-layout.js`),
      context: { id: node.id },
    })
  })
}

const createBlogYearPages = async ({ graphql, actions }) => {}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#make-a-template-for-your-posts
const createPages = async ({ graphql, actions, reporter }) => {
  await createBlogYearPages({ graphql, actions })
  await createPosts({ graphql, actions })
}

module.exports = { onCreateNode, createPages }
