const config = require("./config/website")

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = config.siteUrl,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === "production"
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    siteUrl,
    title: config.siteTitleAlt,
    twitterHandle: config.twitterHandle,
    description: config.siteDescription,
    keywords: ["Software Engineer", "React", "JavaScript"],
    canonicalUrl: siteUrl,
    image: config.siteLogo,
    author: {
      name: config.author,
      minibio: config.minibio,
    },
    organization: {
      name: config.organization,
      url: siteUrl,
      logo: config.siteLogo,
    },
    social: {
      twitter: config.twitterHandle,
      fbAppID: "",
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "#src": "src",
          "#components": "src/components",
          "#images": "src/images",
          "#layouts": "src/layouts",
          "#lib": "src/lib",
          "#pages": "src/pages",
          "#templates": "src/templates",
          "#utils": "src/utils",
        },
        extensions: ["js", "jsx", "css", "sass"],
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
    // https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/?=mdx
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        // https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/?=gatsby-plugin-mdx#gatsby-remark-plugins
        // https://www.gatsbyjs.org/packages/gatsby-remark-liquid-tags/?=liquid
        gatsbyRemarkPlugins: [
          // https://www.gatsbyjs.org/packages/gatsby-remark-embed-gist/
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              username: config.nickname,
              includeDefaultCss: true,
            },
          },
          `gatsby-remark-embedder`,
          `gatsby-remark-liquid-tags`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: "gatsby-remark-images",
            options: {
              backgroundColor: "#fafafa",
              maxWidth: 1035,
            },
          },
          // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=gatsby-remark-prismjs
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: null,
              aliases: { sh: "bash", react: "jsx" },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-remark-images",
      options: {
        backgroundColor: "#fafafa",
        maxWidth: 1035,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ["src/styles/*.scss"],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "standalone",
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // https://www.gatsbyjs.org/docs/emotion/
    // to use Theme-UI https://theme-ui.com/getting-started
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: "Ropa Sans",
            subsets: ["latin"],
            variants: ["400"],
          },
          {
            family: "Open Sans",
            subsets: ["latin"],
            variants: ["400", "600", "700", "800"],
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        // trackingId: "UA-87712355-1",
        trackingId: config.googleAnalyticsID,
        // Puts tracking script in the head instead of the body
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx(sort: {order: DESC, fields: [frontmatter___date]}) {
                  totalCount
                  edges {
                    node {
                      id
                      fields {
                        slug
                      }
                      excerpt
                      frontmatter {
                        date
                        title
                      }
                      html
                    }
                  }
                }
              }
            `,
            output: "/blog/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `slightedgecoder`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
