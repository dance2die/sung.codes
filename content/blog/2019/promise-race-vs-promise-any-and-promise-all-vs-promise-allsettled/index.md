---
title: Promise.race vs. Promise.any And Promise.all vs. Promise.allSettled
date: '2019-05-18'
banner: ./images/featured-image-1.jpg
published_at: '2019-05-18T21:32:46.000Z'
tags: javascript
author: Sung M. Kim
---

_Photo by _[_Ryan Franco_](https://unsplash.com/photos/C6YVD4keMJY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/pinky-promise?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

[What’s new in JavaScript (Google I/O ’19)](https://www.youtube.com/watch?v=c0oy0vQKEZE) on May 8, 2019 showed what's coming/available for static Promise combinator methods, [Promise.allSettled](https://github.com/tc39/proposal-promise-allSettled) and [Promise.any](https://github.com/tc39/proposal-promise-any).

There are already two methods available in modern browsers, [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) and [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).

Let's take a look at differences and how each method works.

## 🚀 Prerequisite

### 🔆 Promise Definition

I will skip on what a promise is and jump straight into static methods and will discuss differences.

A gist is that, a promise is JavaScript's way of promising you that a work will be done (or might fail if the work could not be completed).

_If you are familiar with C#, it's analogous_ [_Task_](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task) _class._

For more info, refer to following documentations.

- [Promise - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) on MDN
- [JavaScript Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises) on Google Developers

### 🔆 Promise State Definitions

- **Fulfilled** \- When a promise is resolved successfully.
- **Rejected** \- When a promise failed.
- **Pending** \- When a promise is "[neither fulfilled nor rejected](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md#states)".
- **Settled** \- Not really a state but an _umbrella term_ to describe that a promise is either fulfilled or rejected.
  - This term will be used to describe characteristics of new methods later.

For more detailed explanation of states & fates, please refer to [States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md).

There are other static Promise methods such as [Promise.reject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject), [Promise.resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) but I will cover only "combinator" methods, which takes in an iterable object as an argument.

## 🚀 Differences

Let's first take a look at difference between existing & new combinator methods.

### 🔅 Promise.all vs. Promise.allSettled

Both accepts an iterable object but

- `Promise.all` rejects as soon as a promise within the iterable object rejected.
- `Promise.allSettled` resolves regardless of rejected promise(s) within the iterable object.

### 🔅 Promise.race vs. Promise.any

Both accepts an iterable object but

- `Promise.race` short-circuits on the first settled (fulfilled or rejected) promise within the iterable object.
- `Promise.any` short-circuits on the first fulfilled promise and continues to resolve regardless of rejected promises unless all within the iterable object reject.

## 🚀 Comparison Table

Now let's take a look at existing/upcoming combinator methods.

``gist:dance2die/9d9f7531775efed3eca1ad70bfd17a73``

<a href="https://gist.github.com/dance2die/9d9f7531775efed3eca1ad70bfd17a73">View this gist on GitHub</a>

Now let's move on to learn more about each method.

**Note that all "Characteristics" are taken from TC39 proposal [README](https://github.com/tc39/proposal-promise-any/blob/master/README.md).**

## 🚀 Promise.all

- **What is this?** Resolve all promises passed as an iterable object.
- **Idiom** - One bad 🍏 spoils the bunch ("all").
- **Characteristic** - short-circuits when an input value is rejected

### 🔆 Example

``gist:dance2die/9ba18d739224d408af8a8f239cde9a2b``

<a href="https://gist.github.com/dance2die/9ba18d739224d408af8a8f239cde9a2b">View this gist on GitHub</a>

When `Promise.all` fulfilled(`promisesWithoutReject`), all apples are returned.

The latter example using `promisesWithOneReject` shows that one rejected promise results in rejecting all promises.

## 🚀 Promise.allSettled

- **What is this?** all promises regardless of settled (fulfilled/rejected) status.
- **Idiom** - Let's "wait and see" 🤔.
- **Characteristic** - Does not short-circuit unlike Promise.all/race
- **Note** - Available in [Chrome 76](https://www.chromestatus.com/feature/5547381053456384).

### 🔆 Example

``gist:dance2die/e6f491a82eb10a28f3743f68f5c9d4fe``

<a href="https://gist.github.com/dance2die/e6f491a82eb10a28f3743f68f5c9d4fe">View this gist on GitHub</a>

Regardless of settled (fulfilled or rejected) state, all promises resolve without short-circuiting to `catch`.

To differentiate if resolved values were successful, they are returned as an array of objects of following shape.

- _Fulfilled_ promise is returned as `{status: 'fulfilled', value}`
- _Rejected_ promise is returned as `{status: 'rejected', reason}`

## 🚀 Promise.race

- **What is this?** The first fulfilled promise or reject the whole promise when even one promise rejects.
- **Idiom** - A race between Good 😇 (Fulfilled) and Evil 😈 (Rejected)
  - Not really an idiom though 😅
- **Characteristic** - Short-circuits when an input value is settled

### 🔆 Example

``gist:dance2die/e59a0f90b6a0ea585520b994652bfb55``

<a href="https://gist.github.com/dance2die/e59a0f90b6a0ea585520b994652bfb55">View this gist on GitHub</a>

In `promiseWillFulfill` example, the first promise _fulfilled_ within 1 millisecond and thus the humanity survived.

But the second example using `promiseWillReject` had a promise _rejecting_ in 1 millisecond and thus the humanity is doomed.

And the last example (`promisesWithOUTReject`) fulfilled without rejection thus the first fulfilled promise value of "  
three" was returned.

From these examples, you can see that the first settled state (fulfilled or reject) short circuited the promise.

## 🚀 Promise.any

- **What is this?** Returns the first fulfilled promise regardless of other rejected promises. If all promises reject, then reject by providing errors for all rejects.
- **Idiom** - All's well that ends well.
- **Characteristic** - Short-circuits when an input value is fulfilled.
- **Note** - Not yet implemented in any browsers and it is in [Stage 1](https://tc39.github.io/proposal-promise-any/).

### 🔆 Example

``gist:dance2die/992a1157c191eca2b277e1380b323e8b``

<a href="https://gist.github.com/dance2die/992a1157c191eca2b277e1380b323e8b">View this gist on GitHub</a>

First example has promises that rejects right away but did not short-circuit because of a fulfilled promise, thus you win at life.

Second example has promises resolving after a certain period. The first fulfilled promise was resolved after a series of rejects but didn't short-circuit. And you were able to get a job.

When all promises reject, then that's when Promise.any rejects and you didn't get any job offers.

## 👋 Conclusion

How I understood was that the new `Promise.allSettled/any` are introduced for Promise to try its best to resolve promises to fulfill unlike existing ones that fails on first encounter of reject.

`Promise.all` & `Promise.race` has been available in modern browsers (this exclude IE ;p) and `Promise.allSettled` will be available in Chrome 76.

`Promise.any` is still in [stage 1](https://tc39.github.io/proposal-promise-any/) and not available in any browsers (but available in [Bluebird](http://bluebirdjs.com/docs/api/promise.any.html) or using polyfills - for the demo I used [promise-any](https://www.npmjs.com/package/promise-any) NPM library for demo.)

I'd love to hear where you would (have) use(d) each method to solve a problem.  
And would you please kindly let me know if you find any mistakes and/or how I can improve the example?

