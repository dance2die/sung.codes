---
title: Need to set tabIndex=0 to enable tab navigation
date: '2018-11-15'
published_at: '2018-11-16T04:17:16.000Z'
tags: 'selfnote, a11y, react'
author: Sung M. Kim
---

_Photo by_ [_Abigail Lynn_](https://unsplash.com/photos/MNXIZgzKw4U?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) _on_ [_Unsplash_](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

**_Self note again..._**

Answered a Stack Overflow question, [React focus items list in child component after action from a different child component](https://stackoverflow.com/questions/53327522/) and learned that to enable HTML element navigation using tabs, you need to set tabindex values to 0.

I have researched for the question and [replied.](https://stackoverflow.com/a/53327974/4035)

What I still don't get is why it's not recommended to use tabindex value greater than 0.

Following articles urges you not use any values other than 0 & -1.

- [Using tabindex](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex)
- [Don’t Use Tabindex Greater than 0](http://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html)

I've googled again and again but can't find any satisfactory answers, yet.

At least I was able to answer the question and provided the [Sandbox](https://codesandbox.io/s/002pz9kp20).

Used [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html) for the first time and worked like a charm.

