---
title: Dynamic data fetching in Next.js
date: "2019-11-20"
author: Sung M. Kim
tags: "next, ssr, react, javascript, devjournal"
published: true
banner: ./images/featured-image.jpg
bannerCredit: "
Image by [Gerd Altmann](https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1647341) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1647341)
"
---

After going thru the wonderful Next.js tutorial, I decided to write a simple data fetching site from scratch.

It was tougher than I expected.

TIL that you can fetch data from `getInitialProps` to return a shell, and also let the rest of the page "dynamic" using `fetch`.

---

## Server-side data fetch with "getInitialProps"

Here, I am getting both `posts` and `users` from `getInitialProps` in `index.js` page.

```javascript
const Index = ({ posts, users }) => (
  <>
    <section>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (...))}
      </ul>
    </section>
    <section>
      <h1>Users</h1>
      <ul>
        {users.map(user => (...))}
      </ul>
    </section>
  </>
)

Index.getInitialProps = async function() {
  const postsResponse = await fetch(postsUrl)
  const posts = (await postsResponse.json()).slice(0, 5)

  const usersResponse = await fetch(usersUrl)
  const users = (await usersResponse.json()).slice(0, 5)

  return { posts, users }
}
```

https://codesandbox.io/s/nextjs-fetch-jsonplaceholder-posts-u4qq3?fontsize=14&hidenavigation=1&module=%2Fpages%2Findex.js&theme=dark

![infographics](./images/infographic.png)

**Credit**: Refer to ups/downs on [Rendering on the Web](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)

## Client-side data fetch (with "SWR")

Second experiment was to fetch users dynamically on button click.  
I was skeptical that it'd work as HTML is generated on the server.

But I was able to get users data on the client-side no problem.

You can see that I am fetching only posts via `getInitialProps` but users data is fetched using [useSWR](https://swr.now.sh/)(, which is a convinience method to fetch remote data from Zeit to w/o `useEffect` boilerplate code).

```javascript
const Users = ({ users }) => (
  <section>
    <h1>Users</h1>
    <ul>
      {users.map(user => (...))}
    </ul>
  </section>
);

const getUsers = url => fetch(url).then(_ => _.json());

const Index = ({ posts }) => {
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false);

  const { data: users } = useSWR(
    () => (shouldFetchUsers ? usersUrl : null),
    getUsers
  );

  return (
    <>
      <section>
        <button onClick={() => setShouldFetchUsers(true)}>Users?</button>
        <h1>Posts</h1>
        <ul>
          {posts.map(post => (...))}
        </ul>
      </section>
      {users && <Users users={users} />}
    </>
  );
};

Index.getInitialProps = async function() {
  const postsResponse = await fetch(postsUrl);
  const posts = (await postsResponse.json()).slice(0, 5);
  return { posts };
};
```

https://codesandbox.io/s/nextjs-fetch-jsonplaceholder-posts-dynamic-users-hr34q?fontsize=14&hidenavigation=1&module=%2Fpages%2Findex.js&theme=dark

## Unrelated but just a thought.

I just ran across "App Shell model", for which Next.js can be used to provdie the "shell" and do dynamic data fetching after the load.

https://developers.google.com/web/fundamentals/architecture/app-shell

---

Image by [Gerd Altmann](https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1647341) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1647341)
