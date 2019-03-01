import React from "react"
import produce from "immer"
import classNames from "classnames"
// import { graphql } from "gatsby"

import "../styles/YearsTabs.scss"

function reducer(state = {}, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "TOGGLE_ISCLICKED":
        Object.keys(draft).forEach(item => (draft[item].isClicked = false))
        draft[action.id].isClicked = !draft[action.id].isClicked
        return
      default:
        return state
    }
  })
}

// https://codesandbox.io/s/xkxj0rz74
function YearsTabs({ years }) {
  //   const years = ["2019", "2018", "2017", "2016"]
  const [state, dispatch] = React.useReducer(reducer, {}, () =>
    years.reduce((state, year) => {
      state[year] = { isClicked: false }
      return state
    }, {})
  )

  const toggleClicked = e => {
    e.preventDefault()
    dispatch({ type: "TOGGLE_ISCLICKED", id: e.target.id })
  }

  const getClickedClassName = year => (state[year].isClicked ? "clicked" : "")

  return (
    <nav className="menu">
      {years.map(year => (
        <li
          className={classNames("menuItem", getClickedClassName(year))}
          key={year}
          id={year}
          onClick={toggleClicked}
        >
          <span className="menuItemContent" id={year}>
            {year}
          </span>
        </li>
      ))}
    </nav>
  )
}

export default YearsTabs

// export const menuQuery = graphql`
//   query {
//     allWordpressPost(sort: { fields: [date], order: DESC }) {
//       edges {
//         node {
//           year: date(formatString: "YYYY")
//         }
//       }
//     }
//   }
// `
