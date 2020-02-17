/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading, Button, Text, Box, Flex, Image } from "@theme-ui/components"
// eslint-disable-next-line
import React, { useEffect, useState, useCallback } from "react"
import Dangerous from "dangerous-components"

import ExternalLink from "#components/Link/ExternalLink"

const initialCounts = {
  count: 0,
  type: {
    like: 0,
    mention: 0,
    reply: 0,
    repost: 0,
  },
}

function WebmentionCount({ target }) {
  const [counts, setCounts] = useState(initialCounts)

  useEffect(() => {
    async function getCounts() {
      const url = `https://webmention.io/api/count.json?target=${target}/`
      // returned value shape
      // {
      //   "count": 1062,
      //   "type": {
      //     "like": 638,
      //     "mention": 154,
      //     "reply": 51,
      //     "repost": 219
      //   }
      // }
      // ⚠ "type" is an empty object if there is no mention
      const counts = await fetch(url).then(response => response.json())

      setCounts(previousCounts => {
        return {
          ...previousCounts,
          ...counts,
          type: {
            ...previousCounts.type,
            ...counts.type,
          },
        }
      })
    }

    getCounts()
  }, [target])

  return (
    <>
      {counts === initialCounts && <p>Loading counts...</p>}
      {counts === undefined && <p>Failed to load counts...</p>}
      {counts && (
        <p>
          ❤️ {counts.type.like + counts.type.repost || 0} 💬{" "}
          {counts.type.mention + counts.type.reply || 0}
        </p>
      )}
    </>
  )
}

function Replies({ replies }) {
  const replyElements = replies.map(link => (
    <li sx={{ margin: "1.6rem 0" }}>
      <Flex direcition="row">
        <ExternalLink
          to={link.data.author.url}
          sx={{ flexShrink: 0, cursor: "pointer" }}
        >
          <Image
            sx={{ borderRadius: "50%" }}
            width={40}
            src={link.data.author.photo}
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

  const getMentions = useCallback(
    () =>
      fetch(
        // `https://webmention.io/api/mentions?page=${page}&per-page=20&sort-by=published&target=${target}`,
        // `https://webmention.io/api/mentions?page=${page}&per-page=50&target=${target}/` // trailing slash impt
        // `https://webmention.io/api/mentions?page=${page}&per-page=${perPage}&target=https://www.swyx.io/writing/clientside-webmentions/`
        `https://webmention.io/api/mentions?page=${page}&per-page=${perPage}&target=${target}`
      )
        .then(response => response.json())
        .then(json => json.links.filter(x => x.activity.type !== "like")),
    [page, target]
  )

  const incrementPage = () => setPage(previousPage => previousPage + 1)
  const fetchMore = useCallback(() => {
    getMentions()
      .then(returnedReplies => {
        if (returnedReplies.length) {
          setReplies(previousReplies => [
            ...previousReplies,
            ...returnedReplies,
          ])
        } else {
          setFetchState("nomore")
        }
      })
      .then(incrementPage)
  }, [getMentions])

  useEffect(() => {
    getMentions().then(returnedReplies => {
      console.info(`page=${page} => returnedReplies???`, returnedReplies)
      setReplies(returnedReplies)
      setFetchState("done")
    })
  }, [target, getMentions, page])

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

function Webmention({ target }) {
  return (
    <>
      <Heading as="h2" mb={[2, 2, 3, 3]}>
        Webmentions
      </Heading>
      <WebmentionCount target={target} />
      <WebmentionReplies target={target} />
    </>
  )
}

export default Webmention
