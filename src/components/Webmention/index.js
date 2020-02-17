/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading, Button, Text, Box, Flex, Image } from "@theme-ui/components"
// eslint-disable-next-line
import React, { useEffect, useState } from "react"
import Dangerous from "dangerous-components"
import ErrorBoundary from "react-error-boundary"

import ExternalLink from "#components/Link/ExternalLink"
import AvatarPlaceholder from "../../images/avatar-placeholder.jpg"
import WebmentionCount from "./WebmentionCount"
import WebmentionReplies from "./WebmentionReplies"

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
