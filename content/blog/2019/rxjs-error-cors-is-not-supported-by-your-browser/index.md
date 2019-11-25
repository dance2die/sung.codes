---
title: "RxJS Error: CORS is not supported by your browser"
date: "2019-11-24"
author: Sung M. Kim
tags: "rxjs, javascript, devjournal, selfnote"
published: true
banner: ./images/featured-image.jpg
bannerCredit: "
Image by [Taco Fleur](https://pixabay.com/users/tacofleur-2688180/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2140997) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2140997)
"
---

This is a note-to-self/devjournal to keep track of the issue I ran into.  
Just rephrasing a StackOverflow answer but come back and find easily.

I was playing around with RxJS and ran into following error on

> Error: CORS is not supported by your browser

_Can reproduce it here_

<iframe height="400px" width="100%" src="https://repl.it/@dance2die/ajax?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

A quick google search returned a StackOverflow question, [Using rxjs ajax() I get “CORS is not supported by your browser”](https://stackoverflow.com/questions/51603801/using-rxjs-ajax-i-get-cors-is-not-supported-by-your-browser).

[Ben Lesh](https://stackoverflow.com/users/135786/ben-lesh)(creator of RxJS) [replied](https://stackoverflow.com/a/51751657/4035) that one needs to pass a custom XMLHttpRequest object.

```javascript
import { XMLHttpRequest } from "xmlhttprequest"

function createXHR() {
  return new XMLHttpRequest()
}

const ajax$ = ajax({
  createXHR, // <--- here
  url: genURL_chan(179),
  crossDomain: true,
  withCredentials: false,
  method: "POST",
  body: { since: 0, mode: "Messages", msgCount: 5000 },
})
```

Now the node script below should work w/o an issue.

<iframe height="400px" width="100%" src="https://repl.it/@dance2die/ajax-works?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

---

Image by <a href="https://pixabay.com/users/tacofleur-2688180/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2140997">Taco Fleur</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2140997">Pixabay</a>
