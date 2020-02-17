/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading, Text, Box } from "@theme-ui/components"
import ErrorBoundary from "react-error-boundary"

import WebmentionCount from "./WebmentionCount"
import WebmentionReplies from "./WebmentionReplies"

/**
 * This displays an error message when Webmention fails to load
 */
const WebmentionFallbackComponent = ({ componentStack, error }) => (
  <Box>
    <Text>
      <strong>Error occurred while fetching Webmention...</strong>
    </Text>
    <Text>Here’s what we know…</Text>
    <Text>
      <strong>Error:</strong> {error.toString()}
    </Text>
    <Text>
      <strong>Stacktrace:</strong> {componentStack}
    </Text>
  </Box>
)

function Webmention({ target }) {
  return (
    <ErrorBoundary FallbackComponent={WebmentionFallbackComponent}>
      <Heading as="h2" mb={[2, 2, 3, 3]}>
        Webmentions
      </Heading>
      <WebmentionCount target={target} />
      <WebmentionReplies target={target} />
    </ErrorBoundary>
  )
}

export default Webmention
