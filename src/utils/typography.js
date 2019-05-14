import Typography from "typography"
import githubTheme from "typography-theme-github"

githubTheme.headerFontFamily = ["Playfair Display", "Roboto"]
githubTheme.bodyFontFamily = ["Hind Madurai"]

const typography = new Typography(githubTheme)

export const { rhythm, scale } = typography
export default typography
