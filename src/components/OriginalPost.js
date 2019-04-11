import React from "react"
import ExternalLink from "../utils/ExternalLink"
import { Location } from "@reach/router"

const twitCSS = {
  display: "inline-block",
  width: "14px",
  height: "14px",
  backgroundImage:
    "url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg…-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);",
}

// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview.html
// reach router location props
// https://stackoverflow.com/a/54288059/4035
function OriginalPost({ canonicalURL, location }) {
  return (
    <i css={{ fontSize: "0.85rem" }}>
      💫 Originally posted <ExternalLink url={canonicalURL}>here</ExternalLink>.{" "}
      Broken?{" "}
      <ExternalLink
        url={`https://twitter.com/intent/tweet?text=@dance2die%20${
          location.href
        } is broken!`}
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
