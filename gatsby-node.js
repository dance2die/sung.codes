/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// https://www.gatsbyjs.org/packages/gatsby-source-wordpress/#sites-gatsby-nodejs-example

const path = require("path")
const slash = require("slash")

const jsdom = require("jsdom")
const { JSDOM } = jsdom
const cheerio = require("cheerio")
const axios = require("axios")
// https://github.com/axios/axios/issues/1418#issue-305515527
const adapter = require("axios/lib/adapters/http")

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

    // createNodeField({
    //   node,
    //   name: 'content',
    //   value: await renderGistToHtml(node.content)
    // })
  }
}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#make-a-template-for-your-posts
const createPages = async ({ graphql, actions, reporter }) => {
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
  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/posts-page-layout.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}

// https://github.com/dance2die/sung.codes/blob/master/gatsby-node.js#L159
// Playground: https://repl.it/@dance2die/cheerio-manipulation-of-gist?language=nodejs&folderId=5b21216a-be77-4f8e-b167-9739291fc451
async function renderGistToHtml(content) {
  const $ = cheerio.load(content)
  const $scripts = $(`script[src^="https://gist.github.com"]`)
  if (!$scripts || $scripts.length < 1) return content

  try {
    const scriptPromises = []
    $scripts.each(function(i, script) {
      const promise = axios(script.attribs.src, { adapter }).then(_ => ({
        src: script.attribs.src,
        data: _.data,
      }))
      scriptPromises.push(promise)
    })

    await Promise.all(scriptPromises).then(function(values) {
      // log(`values`, values);
      values.forEach(({ src, data }) => {
        const window = new JSDOM(`<body><script>${data}</script></body>`, {
          runScripts: "dangerously",
        }).window

        const gistHTML = cheerio
          .load(window.document.body.innerHTML)("body")
          .html()

        let $script = $(`script[src="${src}"]`)
        $script.replaceWith(gistHTML)
      })
    })

    return $("body").html()
  } catch (e) {
    return content
  }
}

module.exports = { onCreateNode, createPages }
