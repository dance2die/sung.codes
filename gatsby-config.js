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
          // return entities
          console.log(
            `entities`,
            JSON.stringify(
              entities.filter(
                e =>
                  e.__type === "wordpress__POST" &&
                  // e.id === "c6dbad63-7d4a-5414-ae71-ba538c1f448c"
                  e.id === "50a425b8-dbf5-5c52-b18c-09768bc21721"
              ),
              null,
              2
            )
          )

          // This is needed as the plugin turns "img.src" to a blank data:image
          // and stores actual image path to "img.data-src"
          return entities.map(e => {
            // if (e.__type === `wordpress__POST`) {
            //   // https://stackoverflow.com/a/41751240/4035
            //   e.content.replace(
            //     // /<img src="(.*?)"\s+data-src="(.*?)"/gi,
            //     /<img src=\\"(.*?)\"\s+data-src=\\"(.*?)\\"/gi,
            //     '<img src=\\"$2\\"'
            //   )
            // }
            e.slug = decodeURIComponent(e.slug)
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
