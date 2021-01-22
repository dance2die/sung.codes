/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"

const ThemeSwitch = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <span
      onClick={e => {
        e.preventDefault()
        setColorMode(colorMode === "dark" ? "default" : "dark")
      }}
      sx={{
        fontSize: [1, 2, 3, 4],
        "&:hover": { textDecoration: "none", cursor: "pointer" },
      }}
    >
      {colorMode === "dark" ? "🌙" : "🌞"}
    </span>
  )
}

export default ThemeSwitch
