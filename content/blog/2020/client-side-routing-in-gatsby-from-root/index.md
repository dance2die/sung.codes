---
title: Client Side Routing in Gatsby from Root
date: "2020-05-02"
published: true
tags: "gatsby, til, selfnote"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [James Wheeler](https://pixabay.com/users/jameswheeler-5314099/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3773934) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3773934)"
---

Gatsby client-side rendering documentation, [Client-only Routes & User Authentication](https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/), shows how to implement a client-side routing.

## What the issue?

Gatsby works as a SSR, and each route corresponds to a local file.  
That means, whenever you use a client-side routing, Gatsby would look for a file (created under either `src/pages/*` folder or dynamically created within `gatsby-node.js`), and unfound file would result in 404.

To implement a client-side routing, you need to specify that a certain path is client-side only.

I will use how to configure it with a plugin, [gatsby-plugin-create-client-paths](https://www.gatsbyjs.org/packages/gatsby-plugin-create-client-paths/)\_

`gatsby-config.js`.

```javascript
  {
    resolve: `gatsby-plugin-create-client-paths`,
    options: { prefixes: [`/app/*`] },
  },
```

`prefix` specifies which sub-route needs to be treated as a client-side routing.  
But when you specify `/*` for the root, you get a 404 response.

_Issue persists with manualy configuration in [Client-only Routes & User Authentication](https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/) article_

## What do you do then?

Nothing. Nada. Nope nothing.

You don't do anything.  
Gatsby automatically creates `/index.html`, so you can simply use `@reach/router` (underlying router used by Gatsby; No need to install it) to do client-side routing.

You can check out the working sandbox below.

<iframe
     src="https://codesandbox.io/embed/gatsby-working-root-client-side-routing-43xb1?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="gatsby - working root client-side routing"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

--- 

Image by <a href="https://pixabay.com/users/jameswheeler-5314099/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3773934">James Wheeler</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3773934">Pixabay</a>