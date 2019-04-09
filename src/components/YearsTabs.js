import React from "react"
import classNames from "classnames"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

import "../styles/YearsTabs.scss"

// https://codesandbox.io/s/xkxj0rz74
function YearsTabs({ years }) {
  const toggleClicked = e => {
    e.preventDefault()
  }

  return (
    <nav className="menu">
      {years.map(year => (
        <li
          className={classNames("menuItem")}
          key={year}
          id={year}
          onClick={toggleClicked}
        >
          <Link
            css={{
              // 1 rhythm is equal to the height of the line-height of
              // normal body text.
              padding: rhythm(1),
            }}
            to={year}
            activeClassName="clicked"
          >
            {year}
          </Link>
        </li>
      ))}
    </nav>
  )
}

export default YearsTabs
