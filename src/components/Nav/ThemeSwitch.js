/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"

const ThemeSwitch = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <button
      onClick={e => {
        e.preventDefault()
        setColorMode(colorMode === "dark" ? "default" : "dark")
      }}
      sx={{
        fontSize: [1, 2, 3, 4],
        backgroundColor: "transparent",
        borderStyle: "none",
        "&:focus": { outline: 0 },
        "&:hover": { textDecoration: "none", cursor: "pointer" },
      }}
    >
      {colorMode === "dark" ? "🌙" : "🌞"}
    </button>
  )
}

export default ThemeSwitch
