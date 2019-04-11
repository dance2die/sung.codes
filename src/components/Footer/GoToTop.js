import React from "react"

import { rhythm } from "../../utils/typography"

const css = {
  cursor: "pointer",
  fontSize: "3rem",
  padding: "0.5rem",
  margin: `${rhythm(-2)} 0 ${rhythm(1)} 0`,
}

function GoToTop() {
  return (
    <a
      css={css}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Go to Top 👆
    </a>
  )
}

export default GoToTop
