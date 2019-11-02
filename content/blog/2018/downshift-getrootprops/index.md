---
title: "Downshift getRootProps"
date: "2018-11-07"
---

_Photo by _[_Tim Carey_](https://unsplash.com/photos/rKXPPKiiNJo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/f1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Self note while learning [Downshift](https://github.com/paypal/downshift) by [Kent C. Dodds](https://twitter.com/kentcdodds).

Downshift requires you to have `div` as the root element.

<script src="https://gist.github.com/dance2die/4f05ccbc6475189a3bc5468e586dd491.js"></script>

<a href="https://gist.github.com/dance2die/4f05ccbc6475189a3bc5468e586dd491">View this gist on GitHub</a>

When Downshift's child is not a `div` (to extract the functionality into a different component) then [getRootProps](https://github.com/paypal/downshift#getrootprops) should be called.

<script src="https://gist.github.com/dance2die/22913120840120043c2e13bad5b8c4f0.js"></script>

<a href="https://gist.github.com/dance2die/22913120840120043c2e13bad5b8c4f0">View this gist on GitHub</a>

And make sure to set the inner component's root element `ref` to the `refKey` assigned in `getRootProps`.

<script src="https://gist.github.com/dance2die/3226f4197ef59f8ed4a57c0fc3dbf28b.js"></script>

<a href="https://gist.github.com/dance2die/3226f4197ef59f8ed4a57c0fc3dbf28b">View this gist on GitHub</a>

## CodeSandbox 🐛?

For some reason, CodeSandbox shows the following error message.

>   
> downshift: You must apply the ref prop "innerRef" from getRootProps onto your root element.
> 
> says CodeSandbox

But when deployed on Netlify, no error message occurs as shown below.

![](https://www.slightedgecoder.com/wp-content/uploads/2018/11/2018-11-06_18-29-38.gif)

No getRootProps error message

## Resources

**SandBox** - [https://codesandbox.io/s/r4nlpx3j5o](https://codesandbox.io/s/r4nlpx3j5o)

**Examples on Downshift [repository](https://github.com/paypal/downshift)**

- [onBlur-tests.js](https://github.com/paypal/downshift/blob/3fb0ed21278c5f1d0a077ed9b1d0dfd55a75c71b/other/react-native/__tests__/onBlur-tests.js)
- [onChange-tests.js](https://github.com/paypal/downshift/blob/a510c9db12a0019b5ce3d0b45732b27206c3a530/other/react-native/__tests__/onChange-tests.js)
