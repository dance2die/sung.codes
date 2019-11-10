---
title: useSWR - React Hooks for Remote Data Fetching
date: "2019-10-29"
published: true
published_at: ""
tags: react, hooks
banner: ./images/featured-image.jpg
author: Sung M. Kim
---

Image by <a href="https://pixabay.com/users/analogicus-8164369/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4562365">analogicus</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4562365">Pixabay</a>

Zeit has released a React hook, [useSWR](https://swr.now.sh/), which has a tag-line, "React Hooks for Remote Data Fetching".

_`SWR` stands for, well, check out [the site](https://swr.now.sh/) to see what it means (😉)._

It does what it claims to do, and do it **well** and **easily**.

## "Well"

`useSWR` boasts following features.

- Lightweight
- Backend agnostic
- Realtime
- JAMstack oriented
- Suspense
- TypeScript ready
- REST compatible
- Remote + Local

## "Easy"

### Suspense

Yes. It works with the [experimental channel](https://reactjs.org/blog/2019/10/22/react-release-channels.html#experimental-channel) of React's [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html).

All you need is to set the `suspense: true` as one of the options in [the API](https://github.com/zeit/swr#api).

```javascript
const { data } = useSWR(
  "https://jsonplaceholder.typicode.com/posts",
  url =>
    fetch(url)
      .then(_ => _.json())
      .then(sleep),
  { suspense: true }
)
```

### Fetching data.

Home page shows the following basic example.

```javascript
import useSWR from '@zeit/swr'

function Profile () {
                                               1️⃣ 👇
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

> In this example, the React Hook useSWR accepts a `key` and a `fetch` function. key is a unique identifier of the data, normally the URL of the API. Then key will be passed to fetch, which returns the data asynchronously.

I was kind of lost with `1️⃣ fetch` as I was expecting to pass `fetch` and expected `useSWR` to auto convert the response to a json string as [axios](https://www.npmjs.com/package/axios) does but it doesn't.

So using the pattern in the basic example, you might want to pass your own method, which fetches data, and transforms it into a json (refer to `getRandomDog` method below).

```javascript
const getRandomDog = url => fetch(url).then(_ => _.json())

// https://swr.now.sh/#basic-data-loading
function BasicDataLoading() {
  const { error, data } = useSWR(
    `https://dog.ceo/api/breeds/image/random`,
    getRandomDog
  )

  return (
    <>
      {error && <p>Error! {error}</p>}
      {data && data.status === "success" && (
        <img src={data.message} alt={data.message} />
      )}
    </>
  )
}
```

I found it to work like a function, which accepts the `key` (`'/api/user'` in the basic example) and "you" as a caller decide how to return a value. Be it an async method, or synchronous method, it didn't matter when I tried.

```javascript
const getCachedText = async text => text
const options = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}
function CachedHeader() {
  const { data: cachedText } = useSWR("Cached Header", getCachedText, options)

  return <h1>{cachedText}</h1>
}

function Identity({ value }) {
  const { data } = useSWR(value, () => value, options)

  return <>{data}</>
}
```

## Sandbox

I've created a sandbox to play around & learn the library.  
Fork it and play around :)

**Note**: It uses an experimental version of React (it can break anytime)

https://codesandbox.io/s/having-fun-with-useswr-lsjjx

## Parting Words

This post is created within an hour just to log & share the excitement 🎉

Check out the project page, https://swr.now.sh/ to learn more and learn more on the GitHub repo, https://github.com/zeit/swr.
