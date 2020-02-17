---
title: Clientside Webmentions in Gatsby
date: "2020-02-17"
published: true
tags: "indieweb, webmention, gatsby, react"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [Alexas_Fotos](https://pixabay.com/users/Alexas_Fotos-686414/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1649299) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1649299)"
---

[Webmention](https://indieweb.org/Webmention) is [not new](https://twitter.com/swyx/status/1227459356586803206) and I liked the idea after reading [@swyx](https://twitter.com/swyx)'s post, [Clientside Webmentions - Joining the IndieWeb with Svelte](https://www.swyx.io/writing/clientside-webmentions).

## Introduction

When I created a [GitHub issue](https://github.com/dance2die/sung.codes/issues/32), I intended to follow [Getting started with Webmentions in Gatsby](https://www.knutmelvaer.no/blog/2019/06/getting-started-with-webmentions-in-gatsby/) by [Knut Melvær](https://twitter.com/kmelve).

The article used [gatsby-plugin-webmention](https://github.com/ChristopherBiscardi/gatsby-plugin-webmention), which exposes webmention data during build time.  
So I decided to follow @swyx's implementation (in Svelte) to provide a client-side implementation.

Please follow Knut's post if you want to provide a better experience (, which I will, to add Microformat2.

## Assumption

This post assumes you've read @swyx's post and the prerequisite mentioned in it.  
(_Setting up webmention.io, brid.gy etc._)

This post will focus on adding client-side webmention.

## Webmention Component

`Webmention` component accepts a `target` URL. It wraps the component with [ErrorBoundary](https://reactjs.org/docs/error-boundaries.html) in case it fails and to show the error message.

In a gist, `Webmention` accepts a target URL to show count & replies.

_I used [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) by [Brian Vaughn](https://twitter.com/brian_d_vaughn), a core React team member for convenience._

```jsx
const WebmentionFallbackComponent = ({ componentStack, error }) => (...)

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
```

You can replace `Heading` with `h1~6` as I am using [Theme-UI](https://theme-ui.com/) and [Heading](https://theme-ui.com/components/heading) comes from that library.

Now let's dive into the implementation of `WebmentionCount` & `WebmentionReplies`.

## Adding Counts

`WebmentionCount` component has the following structure.

1. `initialCounts` has the "shape" of what's returned from Webmention endpoint.
2. `useEffect` runs on `target` change to load Webmentions
3. `return` displays loading status, error message, and counts.

```jsx
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

  // Get counts on `target` change.
  useEffect(() => {
    async function getCounts() {}

    getCounts()
  }, [target])

  return (
    <>
      {counts === initialCounts && <p>Loading counts...</p>}
      {counts === undefined && <p>Failed to load counts...</p>}
      {counts && (
        <div>
          <span role="img" aria-label="emoji">
            ❤️
          </span>{" "}
          {counts.type.like + counts.type.repost || 0}{" "}
          <span role="img" aria-label="emoji">
            💬
          </span>{" "}
          {counts.type.mention + counts.type.reply || 0}
        </div>
      )}
    </>
  )
}
```

The interesting part happens inside the `useEffect` hook, which fetches webmetions.

```jsx
useEffect(() => {
  async function getCounts() {
    const url = `https://webmention.io/api/count.json?target=${target}`
    const responseCounts = await fetch(url).then(response => response.json())

    setCounts(previousCounts => {
      return {
        ...previousCounts,
        ...responseCounts,
        type: {
          ...previousCounts.type,
          ...responseCounts.type,
        },
      }
    })
  }

  getCounts()
}, [target])
```

The endpoint is `https://webmention.io/api/count.json?target=${target}`.  
@swyx had an issue with a warning that,

> This is the endpoint to hit: https://webmention.io/api/count.json?target=URL_TO_YOUR_POST/. ⚠️ NOTE: You will need that trailing slash for this request to work! I probably wasted 2 hours figuring this out.
> -- <cite>[Clientside Webmentions - Simple Count](https://www.swyx.io/writing/clientside-webmentions#simple-count)</cite>

In my case, the trailing `/` was already added from a slug, so there was no need for me to add it. So make sure that your endpoint ends with `/`

`setCounts` merges existing counts with counts retrieved from webmention.io.

## Paginated Mentions

_I've translated most of @swyx's Svelte code in React [here](https://www.swyx.io/writing/clientside-webmentions#paginated-mentions)_.

`WebmentionsReplies` loads only 30 replies per page. You can load more with `fetch more` button below and when there is no more reply, it shows a message.

The following code snippet shows the structure of `WebmentionReplies` Component.

```jsx
function Replies({ replies }) {...}

function WebmentionReplies({ target }) {
  const [page, setPage] = useState(0)
  const [fetchState, setFetchState] = useState("fetching")

  const mergeReplies = (oldReplies, newReplies) => [
    ...oldReplies,
    ...newReplies,
  ]
  const [replies, setReplies] = useReducer(mergeReplies, [])
  const perPage = 30

  const getMentions = () => fetch(...)
  const incrementPage = () => setPage(previousPage => previousPage + 1)
  const fetchMore = () => ...

  // Load initial comments once
  useEffect(() => {
    getMentions()
      .then(newReplies => {
        setReplies(newReplies)
        setFetchState("done")
      })
      .then(incrementPage)
  }, [])

  return (
    <>
      {fetchState === "fetching" && <Text>Fetching Replies...</Text>}
      <Replies replies={replies} />
      {fetchState !== "nomore" ? (
        <Button onClick={fetchMore}>
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
```

It's longer than `WebmentionCounts` but the structure is similar.  
`WebmentionReplies` keeps track of three states.

1. `page` - Not shown to the site visitor
2. `fetchState` - Track whether replies are being loaded or an error occurred or we are done.
3. `replies` - Merges loaded replies with newly retrieved replies.

### 🎈 Why "useReducer"?

The last `replies` needs some explanation as it looks "different" from `setCount` used in `WebcomponentCounts` component.

With `useReducer`, one normally destructures an array as

```javascript
const [state, dispatch] = useReducer(reducer, initialState)
```

`useReducer` is a way for you to specify "how" to merge the state with a reducer. To make `setReplies` call easier, the reducer function, `mergeReplies` simply merges old replies with the new replies.

_There is a nice article by Lee Warrick [Bridging the Gap between React's useState, useReducer, and Redux](https://leewarrick.com/blog/a-guide-to-usestate-and-usereducer/), if you want to find out more._

Doing so would let me merge replies like `setReplies(newReplies)` without having to specify old replies.

```javascript
useEffect(() => {
  getMentions()
    .then(newReplies => {
      // This merges old replies witht he new ones
      setReplies(newReplies)
      setFetchState("done")
    })
    .then(incrementPage)
}, [])
```

We now know states involved, let's see how to get replies.

### 🎈 Getting Replies

⚠: _I wrongly named the method `getMentions` (instead of `getReplies`)._

The same gotcha applies for the URL, which should end with a trailing `/` here (but my slug/target already contains `/` so not used here).

```javascript
const getMentions = () =>
  fetch(
    `https://webmention.io/api/mentions?page=${page}&per-page=${perPage}&target=${target}`
  )
    .then(response => response.json())
    .then(json => [...json.links])
```

The endpoint contains an object of links array (of the following shape), which is what's saved.

```json
links: [
  {
    source: "https://...",
    id: 757399,
    data: {
      author: {
        name: "Sung M. Kim",
        url: "https://twitter.com/dance2die",
        photo: "https://webmention.io/....jpg"
      },
      url: "https://twitter.com...",
      name: null,
      content: null,
      published: null,
      published_ts: null
    },
    activity: {
      type: "like",
      sentence: "Sung M. Kim favorited ...",
      sentence_html: '<a href="">...</a>'
    },
    target: "https://sung.codes/blog..."
  },
]
```

The button in `return` fetches more if there are more records to retrieve.

```jsx
<Button onClick={fetchMore}>Fetch More...</Button>
```

`fetchMore` event handler merges new replies if there were more to retrieve.  
In the end, the page number is increment with `incrementPage`, which causes the next render caused by a button click to use a new page number.

```jsx
const fetchMore = () =>
  getMentions()
    .then(newReplies => {
      if (newReplies.length) {
        setReplies(newReplies)
      } else {
        setFetchState("nomore")
      }
    })
    .then(incrementPage)
```

### 🎈 `Replies` Component

This component simply iterates `replies` and making it look pretty.  
Most of the components (`Flex`, `Box`, `Text`) used are from `Theme-UI` so you can use `div` or other elements to structure and style it.

```jsx
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
        <ul sx={{ listStyle: "none" }}>{replyElements}</ul>
      ) : (
        <Text>There is no reply...</Text>
      )}
    </Box>
  )
```

One thing to mention is [Dangerous component](https://www.npmjs.com/package/dangerous-components), which is just a wrapper for [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml).

It needs to be sanitized (I haven't done it yet) or use different properties not to use raw HTML.  
(as it's a security issue).

## Source Code

The full source for the components above is listed below.

- `Webmention`: https://github.com/dance2die/sung.codes/blob/master/src/components/Webmention/index.js
- `WebmentionCount`: https://github.com/dance2die/sung.codes/blob/master/src/components/Webmention/WebmentionCount.js
- `WebmentionReplies`: https://github.com/dance2die/sung.codes/blob/master/src/components/Webmention/WebmentionReplies.js

## Parting Words

That's all folks. If there are any mentions for this post, you can see it 👇  
If not scroll down to in [this post](https://sung.codes/blog/2019/12/25/building-gatsby-with-git-hub-actions-and-deploying-to-netlify/) to see webmentions.
