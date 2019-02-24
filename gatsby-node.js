/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// https://www.gatsbyjs.org/packages/gatsby-source-wordpress/#sites-gatsby-nodejs-example

const path = require(`path`)
const slash = require(`slash`)

const jsdom = require("jsdom")
const { JSDOM } = jsdom
const cheerio = require("cheerio")
const axios = require("axios")
// https://github.com/axios/axios/issues/1418#issue-305515527
const adapter = require("axios/lib/adapters/http")

// const log = console.log

// // https://www.gatsbyjs.org/tutorial/part-seven/
// exports.onCreateNode = ({ node }) => {
//   console.log(node.internal.type)
// }

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // The “graphql” function allows us to run arbitrary
  // queries against the local WordPress graphql schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            link
            slug
            status
            template
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            id
            link
            slug
            status
            template
            format
            jetpack_featured_media_url
            fields {
              content
            }
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const { allWordpressPage, allWordpressPost } = result.data

  // // Create Page pages.
  // const pageTemplate = path.resolve(`./src/templates/page.js`)
  // // We want to create a detailed page for each
  // // page node. We'll just use the WordPress Slug for the slug.
  // // The Page ID is prefixed with 'PAGE_'
  // allWordpressPage.edges.forEach(edge => {
  //   // Gatsby uses Redux to manage its internal state.
  //   // Plugins and sites can use functions like "createPage"
  //   // to interact with Gatsby.
  //   createPage({
  //     // Each page is required to have a `path` as well
  //     // as a template component. The `context` is
  //     // optional but is often necessary so the template
  //     // can query data specific to each page.
  //     path: `/${edge.node.slug}/`,
  //     component: slash(pageTemplate),
  //     context: {
  //       id: edge.node.id,
  //     },
  //   })
  // })

  // Create Post pages
  const postTemplate = path.resolve(`./src/templates/post.js`)
  // We want to create a detailed page for each
  // post node. We'll just use the WordPress Slug for the slug.
  // The Post ID is prefixed with 'POST_'
  allWordpressPost.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })
}

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // List of possible `node.internal.type` - found from terminal console.
  // wordpress__POST
  // SitePage
  // wordpress__TAG
  // wordpress__wp_media
  // wordpress__site_metadata
  // ImageSharp
  // File
  // SitePlugin
  // wordpress__acf_options
  if (node.internal.type === `wordpress__POST`) {
    // Create a new field for "content" that has GitHub gist
    // rendered as HTML instead of as a script
    const name = "content"
    const value = await normalizeContent(node.content)
    createNodeField({ node, name, value })
  }
}

async function normalizeContent(content) {
  const $ = cheerio.load(content)
  const $script = $(`script[src^="https://gist.github.com"]`)

  if (
    $script &&
    $script.length > 0 &&
    $script[0].attribs &&
    $script[0].attribs.src
  ) {
    const result = await axios($script[0].attribs.src, { adapter })
    const { data } = result
    const window = new JSDOM(`<body><script>${data}</script></body>`, {
      runScripts: "dangerously",
    }).window

    const gistHTML = cheerio
      .load(window.document.body.innerHTML)("body")
      .html()

    $script.prepend(gistHTML)
    const renderedHTML = $("body").html()

    return renderedHTML
  } else {
    return content
  }
}
