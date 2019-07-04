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
            date
            year: date(formatString: "YYYY")
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
  const { allWordpressPost } = result.data

  // https://www.gatsbyjs.org/docs/adding-pagination/
  // Create Home page pagination
  const posts = allWordpressPost
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blogListTemplate.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create Page pages.
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  allWordpressPost.edges.forEach(({ node }) => {
    const year = new Date(node.date).getFullYear()

    createPage({
      path: `/year/${year}/`,
      component: slash(pageTemplate),
      context: {
        id: node.id,
        year,
      },
    })
  })

  // Create Post pages
  const postTemplate = path.resolve(`./src/templates/post.js`)
  // We want to create a detailed page for each
  // post node. We'll just use the WordPress Slug for the slug.
  // The Post ID is prefixed with 'POST_'
  allWordpressPost.edges.forEach(({ node }) => {
    const year = new Date(node.date).getFullYear()
    const path = `/year/${year}/${node.slug}/`
    const internalLink = `https://sung.codes${path}`

    createPage({
      path,
      component: slash(postTemplate),
      context: {
        id: node.id,
        year,
        internalLink,
      },
    })
  })
}

exports.onCreateNode = async ({ node, actions }) => {
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
    // const name = "content"
    // const value = await normalizeContent(node.content)
    createNodeField({
      node,
      name: "content",
      value: await normalizeContent(node.content),
    })

    createNodeField({
      node,
      name: "year",
      value: new Date(node.date).getFullYear(),
    })
  }
}

// Playground: https://repl.it/@dance2die/cheerio-manipulation-of-gist?language=nodejs&folderId=5b21216a-be77-4f8e-b167-9739291fc451
async function normalizeContent(content) {
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
