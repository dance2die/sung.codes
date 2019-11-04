---
title: react-use-localstorage
date: '2018-10-25'
published_at: '2018-10-26T01:23:19.000Z'
tags: 'react, localstorage'
author: Sung M. Kim
---

_Photo by _[_Chris Scott_](https://unsplash.com/photos/NEc3YEN1FFw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/hooks?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

[React Hooks](https://reactjs.org/docs/hooks-intro.html) was just announced today at [React Conf 2018](https://conf.reactjs.org/).

You can check the [official documentation](https://reactjs.org/docs/hooks-intro.html)  
& also this [dev.to](https://dev.to/) article, [Everything you need to know about React Hooks](https://dev.to/vcarl/everything-you-need-to-know-about-react-hooks-doh) by [Carl Vitullo](https://dev.to/vcarl)  
so I won't go into it further.

I created a simple hook called [react-use-localstorage](https://www.npmjs.com/package/react-use-localstorage), which lets you store state in [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## 🚀Prerequisite

You need to use following React versions.

- **react**: 16.7.0-alpha.0
- **react-dom**: 16.7.0-alpha.0

_It's bleeding edge and not recommended to use in production._

You can follow along on [CodeSandbox](https://codesandbox.io/s/09xj95vxl).

## ⚒How to use it

First, install the package, react-use-localstorage.

``gist:dance2die/0f4e5b5493593d2a903ac8dc7cda4088``

<a href="https://gist.github.com/dance2die/0f4e5b5493593d2a903ac8dc7cda4088">View this gist on GitHub</a>

And use it in a "Functional Component".

``gist:dance2die/b98da9374585f1df9325bb279ce973f0``

<a href="https://gist.github.com/dance2die/b98da9374585f1df9325bb279ce973f0">View this gist on GitHub</a>

## 🏃Working Demo

The demo shows that state is saved directly in local storage.

![](./images/2018-10-25_20-00-40.gif)

## 💫Additional Context

The source code is available on [GitHub](https://github.com/dance2die/react-use-localstorage) with MIT license.

