// https://github.com/kentcdodds/kentcdodds.com/edit/master/src/lib/typography.js

import Typography from "typography"

export const headerFonts = {
  regular: "Ropa Sans",
}

export const fonts = {
  thin: "Open Sans",
  light: "Open Sans",
  regular: "Open Sans",
  semibold: "Open Sans",
  bold: "Open Sans",
}

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.55,
  headerLineHeight: 1.4,
  headerFontFamily: [headerFonts.regular, "sans-serif"],
  bodyFontFamily: [fonts.regular, "sans-serif"],
  headerColor: "hsla(0,0%,0%,0.9)",
  bodyColor: "hsla(0,0%,0%,0.8)",

  overrideStyles: ({ rhythm }) => ({
    h1: {
      color: "hsla(0,0%,0%,0.75)",
      fontFamily: headerFonts.regular,
    },
    "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code": {
      fontSize: "inherit",
    },
    h2: {
      color: "hsla(0,0%,0%,0.775)",
      fontFamily: headerFonts.regular,
    },
    h3: {
      color: "hsla(0,0%,0%,0.8)",
    },
    "h1,h2,h3,h4,h5,h6": {
      lineHeight: 1,
    },
    "h1,h2,h3,h4": {
      lineHeight: 1.25,
      marginTop: rhythm(1),
      marginBottom: rhythm(1 / 2),
      letterSpacing: "0.075rem",
    },
    strong: {
      fontFamily: fonts.bold,
      fontStyle: "bold",
    },
  }),
})
// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

// import Typography from "typography"
// import githubTheme from "typography-theme-github"

// githubTheme.headerFontFamily = ["Playfair Display", "Roboto"]
// githubTheme.bodyFontFamily = ["Hind Madurai"]

// const typography = new Typography(githubTheme)

// export const { rhythm, scale } = typography
// export default typography
