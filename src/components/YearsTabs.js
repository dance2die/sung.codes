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
              padding: rhythm(1.3),
              "@media screen and (max-width: 500px)": {
                padding: rhythm(0.5),
              },
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
