import React from "react"
import ExternalLink from "../../utils/ExternalLink"

function Contact() {
  return (
    <p>
      Conctact me via{" "}
      <ExternalLink url="https://twitter.com/dance2die">
        Twitter{" "}
        <span role="img" aria-label="twitter">
          🐤
        </span>
      </ExternalLink>
    </p>
  )
}

export default Contact
