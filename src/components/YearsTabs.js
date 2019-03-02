import React from "react"
import classNames from "classnames"
import { Link } from "gatsby"

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
          <Link to={year} activeClassName="clicked">
            {year}
          </Link>
        </li>
      ))}
    </nav>
  )
}

export default YearsTabs
