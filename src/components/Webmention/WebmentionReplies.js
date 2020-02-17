/** @jsx jsx */
import { jsx } from "theme-ui"
import { Button, Text, Box, Flex, Image } from "@theme-ui/components"
// eslint-disable-next-line
import React, { useEffect, useState } from "react"
import Dangerous from "dangerous-components"

import ExternalLink from "#components/Link/ExternalLink"
import AvatarPlaceholder from "../../images/avatar-placeholder.jpg"

function Replies({ replies }) {
  const replyElements = replies.map(link => (
    <li key={link.id} sx={{ margin: "1.6rem 0" }}>
      <Flex direcition="row">
        <ExternalLink
          to={link.data.author.url}
          sx={{ flexShrink: 0, cursor: "pointer" }}
        >
          <Image
            sx={{ borderRadius: "50%" }}
            width={40}
            src={link.data.author.photo || AvatarPlaceholder}
            alt={`avatar of ${link.data.author.name}`}
          />
        </ExternalLink>
        <Dangerous
          sx={{ padding: "0 1rem 0" }}
          html={link.activity.sentence_html}
          as="article"
        />
      </Flex>
    </li>
  ))

  return (
    <Box my={[2, 2, 3, 3]}>
      {replies && replies.length ? (
        <ul
          sx={{
            listStyle: "none",
          }}
        >
          {replyElements}
        </ul>
      ) : (
        <Text>There is no reply...</Text>
      )}
    </Box>
  )
}

function WebmentionReplies({ target }) {
  const [page, setPage] = useState(0)
  const [fetchState, setFetchState] = useState("fetching")
  const [replies, setReplies] = useState([])
  const perPage = 30

  const getMentions = () =>
    fetch(
      // `https://webmention.io/api/mentions?page=${page}&per-page=20&sort-by=published&target=${target}`,
      // `https://webmention.io/api/mentions?page=${page}&per-page=50&target=${target}/` // trailing slash impt
      // `https://webmention.io/api/mentions?page=${page}&per-page=${3}&target=https://www.swyx.io/writing/clientside-webmentions/`
      `https://webmention.io/api/mentions?page=${page}&per-page=${perPage}&target=${target}`
    )
      .then(response => response.json())
      .then(json => [...json.links])

  const mergeReplies = newReplies => oldReplies => [
    ...oldReplies,
    ...newReplies,
  ]

  const incrementPage = () => setPage(previousPage => previousPage + 1)
  const fetchMore = () =>
    getMentions()
      .then(newReplies => {
        if (newReplies.length) {
          setReplies(mergeReplies(newReplies))
        } else {
          setFetchState("nomore")
        }
      })
      .then(incrementPage)

  useEffect(() => {
    getMentions()
      .then(newReplies => {
        setReplies(mergeReplies(newReplies))
        setFetchState("done")
      })
      .then(incrementPage)
  }, [])

  return (
    <>
      {fetchState === "fetching" && <Text>Fetching Replies...</Text>}
      <Replies replies={replies} />
      {fetchState !== "nomore" ? (
        <Button
          mt={[2, 2, 3, 3]}
          sx={{ cursor: "pointer" }}
          onClick={fetchMore}
        >
          Fetch More...
        </Button>
      ) : (
        <Text>
          No further replies found.{" "}
          <ExternalLink
            to={`https://twitter.com/intent/tweet/?text=My%20thoughts%20on%20${target}`}
          >
            Tweet about this post
          </ExternalLink>{" "}
          and it will show up here!
        </Text>
      )}
    </>
  )
}

export default WebmentionReplies
