import React from "react"
import ExternalLink from "../utils/ExternalLink"
import { Location } from "@reach/router"

// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview.html
// reach router location props
// https://stackoverflow.com/a/54288059/4035
function OriginalPost({ canonicalURL, location }) {
  return (
    <i css={{ fontSize: "0.85rem" }}>
      <span role="img" aria-label="here">
        💫
      </span>{" "}
      Originally posted <ExternalLink url={canonicalURL}>here</ExternalLink>.{" "}
      Broken?{" "}
      <ExternalLink
        url={`https://twitter.com/intent/tweet?text=@dance2die%20${location.href} is broken!`}
      >
        Let me know <i className="twitterLogo" />
      </ExternalLink>
      ~
    </i>
  )
}

export default props => (
  <Location>
    {locationProps => <OriginalPost {...locationProps} {...props} />}
  </Location>
)
