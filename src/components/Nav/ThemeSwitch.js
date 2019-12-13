/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import Link from "#components/Link/TextLink"

const ThemeSwitch = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <Link
      onClick={e => {
        e.preventDefault()
        setColorMode(colorMode === "dark" ? "default" : "dark")
      }}
      sx={{
        fontSize: [1, 2, 3, 4],
        "&:hover": { textDecoration: "none" },
      }}
    >
      {colorMode === "dark" ? "🌙" : "🌞"}
    </Link>
  )
}

export default ThemeSwitch
