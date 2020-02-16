/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading } from "@theme-ui/components"
// eslint-disable-next-line
import React, { useEffect, useState } from "react"

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

function Webmention({ target }) {
  const [replies, setReplies] = useState()

  return (
    <>
      <Heading as="h3" mb={[2, 2, 3, 3]}>
        Webmentions
      </Heading>
      <WebmentionCount target={target} />
    </>
  )
}

export default Webmention
