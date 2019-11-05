---
title: "Getting DOM content from Chrome Extension"
date: "2019-02-17"
coverImage: "featured-image-4.jpg"
---

_Photo by _[_James Barnett_](https://unsplash.com/photos/kkaxqEPoF10?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/execute-script?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

When you trying to get a DOM content in Chrome tab from an extension using `document.getElementBy*` or `document.querySelector*`, you get the DOM content of your extension HTML.

Suppose that you have a following default popup (specified as `page_action -> default_popup` in `manifest.json`).  
And select the `h1` content in `popup.js` referenced in `page_option.html`.

`gist:dance2die/23f4b80ad83768e1ff073293d64d9bdc`

<a href="https://gist.github.com/dance2die/23f4b80ad83768e1ff073293d64d9bdc">View this gist on GitHub</a>

page_option.html

Then instead of getting the current DOM content displayed in the Chrome tab, it returns the DOM of the `page_option.html` instead.

`gist:dance2die/65173f48ef0893ba6ce0126d7c42444d`

<a href="https://gist.github.com/dance2die/65173f48ef0893ba6ce0126d7c42444d">View this gist on GitHub</a>

What's returned

## 🤔 Workaround?

So what you need to do is to request Chrome to [execute](https://developer.chrome.com/extensions/tabs#method-executeScript) a document query command on your behalf.

`gist:dance2die/d05924be83c6be1b20ba94206ff2beb0`

<a href="https://gist.github.com/dance2die/d05924be83c6be1b20ba94206ff2beb0">View this gist on GitHub</a>

popup.js

First you get the currently active Tab's ID (`tabId`).

_Refer to_ [_Chrome extension tutorial – access active page dom_](http://infoheap.com/chrome-extension-tutorial-access-dom/) _on how that works._

Then you execute a code on the current tab (line #9). and the callback gives you `result` which is the result of `document.querySelector`.

If you want need to execute multiple queries, just put them in an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

`gist:dance2die/bfbb7085d70fa3b6212a72c0ca8a11e1`

<a href="https://gist.github.com/dance2die/bfbb7085d70fa3b6212a72c0ca8a11e1">View this gist on GitHub</a>

Using IIFE to run multiple queries

## Parting Words

I've learned about it recently while writing a Chrome extension, [Easy GitHub](https://github.com/dance2die/easy-github) (work-in-progress).

You can see the relevant code snippets [here on GitHub](https://github.com/dance2die/easy-github/blob/master/src/page_action/popup.js).
