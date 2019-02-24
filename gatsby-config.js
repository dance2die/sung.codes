// const cleanup = require("jsdom-global")()
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const cheerio = require("cheerio")
const axios = require("axios")
// For some reason axios uses XMLHttpsRequest
// https://github.com/axios/axios/issues/1418#issue-305515527
const adapter = require("axios/lib/adapters/http")

module.exports = {
  siteMetadata: {
    title: `Sung Codes`,
    description: `Static Site (Gatsby) version of SlightEdgeCoder.com`,
    author: `Sung M. Kim`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    /*
     * Gatsby's data processing layer begins with “source”
     * plugins. Here the site sources its data from Wordpress.
     *
     * https://www.gatsbyjs.org/packages/gatsby-source-wordpress/
     */
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "SlightEdgeCoder.com",
        protocol: "https",
        hostingWPCOM: false,
        // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems.
        verboseOutput: false,
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 5,
        useACF: false,
        // Set how many pages are retrieved per API request.
        perPage: 100,
        // Set WP REST API routes whitelists
        // and blacklists using glob patterns.
        // Defaults to whitelist the routes shown
        // in the example below.
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]`
        // ` will either include or exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        // Whitelisted routes using glob patterns
        includedRoutes: [
          "**/posts",
          "**/pages",
          "**/tags",
          "**/categories",
          "**/media",
          // "**/users",
          // "**/taxonomies",
        ],
        // use a custom normalizer which is applied after the built-in ones.
        normalizer: function({ entities }) {
          // async normalizer({ entities }) {
          // return entities
          // console.log(
          //   `entities`,
          //   JSON.stringify(
          //     entities.filter(
          //       e =>
          //         e.__type === "wordpress__POST" &&
          //         // e.id === "c6dbad63-7d4a-5414-ae71-ba538c1f448c"
          //         e.id === "50a425b8-dbf5-5c52-b18c-09768bc21721"
          //     ),
          //     null,
          //     2
          //   )
          // )

          // This is needed as the plugin turns "img.src" to a blank data:image
          // and stores actual image path to "img.data-src"
          const gistPattern = /<script src=\"https:\/\/gist.github.com/gi

          const decodedSlugEntities = entities.map(e => {
            e.slug = decodeURIComponent(e.slug)
            return e
          })

          // return decodedSlugEntities
          return decodedSlugEntities
            .filter(e => e.__type === "wordpress__POST")
            .map(async e => {
              // Contains the gist script - We need to render the HTML output
              // as WordPress returns only the gist script, not the rendered HTML
              if (e.content.match(gistPattern)) {
                // Load the content script, and get the gist JavaScript from GitHub
                // render it using JSDOM & extract the rendered HTML using cheerio
                const $ = cheerio.load(e.content)
                const script = $(`script[src^="https://gist.github.com"]`)

                try {
                  const result = await axios(script[0].attribs.src, { adapter })

                  if (!result) return e
                  if (!result.data) return e
                  const { data } = result

                  const window = new JSDOM(
                    `<body><script>${data}</script></body>`,
                    {
                      runScripts: "dangerously",
                    }
                  ).window

                  const renderedGist = cheerio
                    .load(window.document.body.innerHTML)("body")
                    .html()

                  // Inject rendered gist
                  // let scriptContainer = script.parentElement
                  let gist = window.document.createElement("div")
                  // scriptContainer.appendChild(gist)
                  window.document.body.appendChild(gist)
                  // script.appendChild(gist)
                  gist.insertAdjacentHTML("afterbegin", renderedGist)

                  // Reassign the content with rendered GitHub gist.
                  // e.content = $("body").html()
                  e.content = window.document.body.innerHTML
                  // console.log(`e.content updated!!!!`, e)
                  return e
                } catch (e) {
                  console.log(e)
                  return e
                }

                // return (
                //   axios(script[0].attribs.src, { adapter })
                //     .then(result => {
                //       console.log(`result`, result)

                //       if (!result) return e
                //       if (!result.data) return e
                //       const { data } = result

                //       const window = new JSDOM(
                //         `<body><script>${data}</script></body>`,
                //         {
                //           runScripts: "dangerously",
                //         }
                //       ).window

                //       const renderedGist = cheerio
                //         .load(window.document.body.innerHTML)("body")
                //         .html()

                //       // Inject rendered gist
                //       let scriptContainer = script.parentElement
                //       let gist = document.createElement("div")
                //       scriptContainer.appendChild(gist)
                //       gist.insertAdjacentElement("afterbegin", renderedGist)

                //       // Reassign the content with rendered GitHub gist.
                //       e.content = $("body").html()
                //       return e
                //     })
                //     // .then(cleanup)
                //     .catch(console.log)
                // )
              }

              return e
            })
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
