import Typography from "typography"
import githubTheme from "typography-theme-github"

// // import wordpress2013 from "typography-theme-wordpress-2013"
// wordpress2013.headerLineHeight = 1.1
// wordpress2013.overrideThemeStyles = () => {
//   return {
//     a: {
//       color: `rgb(60,99,243)`,
//     },
//     h1: {
//       lineHeight: 1,
//     },
//   }
// }

githubTheme.headerFontFamily = ["Roboto Condensed", "Roboto"]
githubTheme.bodyFontFamily = ["Roboto"]

const typography = new Typography(githubTheme)

export const { rhythm, scale } = typography
export default typography
