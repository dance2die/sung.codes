---
title: Spread syntax gotcha in JavaScript class methods
date: "2019-03-30"
banner: ./images/featured-image-1.jpg
published_at: "2019-03-30T22:02:02.000Z"
tags: "javascript, typescript, react, hooks"
author: Sung M. Kim
---

_Photo by_ [_Jay_](https://unsplash.com/photos/dkFJST9zZZo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/pokeball?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) _- Don't get caught_

#### _Watch out when exposing a mutable data structure with React Hooks_

When you spread an object instance of a class to expose methods, methods might not be copied over.

Suppose that you have a `Trie` class,  
which you want to make it immutable by returning a new object using syntax spread.

**_Not a good idea! Explained later._**

`gist:dance2die/3107d7b0a3d3eeeb0dcad5886f5b1bf9`

<a href="https://gist.github.com/dance2die/3107d7b0a3d3eeeb0dcad5886f5b1bf9">View this gist on GitHub</a>

Printing out `trie` object instance returned from `useTrie` won't show `has` and an empty method is printed.

`gist:dance2die/4192b1bab9e70e046515b456c147baf8`

<a href="https://gist.github.com/dance2die/4192b1bab9e70e046515b456c147baf8">View this gist on GitHub</a>

Let's see why and how to solve the issue.

## 🔬 Analysis

To understand the problem, let's see how the class is [transpiled using TypeScript compiler](<https://www.typescriptlang.org/play/index.html#src=class%20Trie%20%7B%0D%0A%20%20has(word)%20%7B%20return%20true%3B%20%7D%0D%0A%7D%0D%0A%0D%0Aclass%20Trie2%20%7B%0D%0A%20%20has%20%3D%20(word)%20%3D%3E%20true%3B%0D%0A%7D%0D%0A>) (the transpiled babel code does the same but verbose so using TypeScript compiler here).

`gist:dance2die/7419342babb86cafb72aaae443cff2c2`

<a href="https://gist.github.com/dance2die/7419342babb86cafb72aaae443cff2c2">View this gist on GitHub</a>

`has` method was added to the prototype, not to an instance of `Trie` class.  
So `has` is still available when you do `const t = new Trie(); t.has(); // true`.

Returning a new object using spread syntax didn't copy `has`  
because [spread syntax only copies own & enumerable properties](https://dmitripavlutin.com/object-rest-spread-properties-javascript/#12ownproperties).

But `[prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)` [is not enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) so `has` is not copied over.

## 🧙‍♂️ Resolving the Issue

You can resolve the issue in two ways.

1. [Binding](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) the method explicitly to `this`.
2. Using an [arrow function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

#### 1\. Bind Explicitly

You can explicitly bind `this` to the method in the constructor.

`gist:dance2die/0e123ece5776d334bf5e7fe39d88410b`

<a href="https://gist.github.com/dance2die/0e123ece5776d334bf5e7fe39d88410b">View this gist on GitHub</a>

, which is TypeScript-transpiled as

`gist:dance2die/8e5597304ea3246396d1c40506169736`

<a href="https://gist.github.com/dance2die/8e5597304ea3246396d1c40506169736">View this gist on GitHub</a>

And printing the `trie` instance returned from `useTrie` will now show `.has` method.

`gist:dance2die/95b8a2bbf71316895673148e56441f18`

<a href="https://gist.github.com/dance2die/95b8a2bbf71316895673148e56441f18">View this gist on GitHub</a>

`has` is still added to the `prototype`, which might not be what you want and it's increasing the file size.

So this brings us to,

#### 2\. Using an arrow function expression

When you declare the \`has\` method using an arrow syntax, it's transpiled by Transcript as shown below.

`gist:dance2die/5c1a5a0252c3851fc22bb95f3da0b117`

<a href="https://gist.github.com/dance2die/5c1a5a0252c3851fc22bb95f3da0b117">View this gist on GitHub</a>

You can see that it's [same](https://gist.github.com/dance2die/8e5597304ea3246396d1c40506169736#file-transpiled-bound-trie-js) without `has` being assigned to the `prototype`.  
And the console log will still show `has` as part of the `trie` instance returned from `useTrieUsingArrow`.

`gist:dance2die/0d5a69a187ab07e9234bad36dbe72cad`

<a href="https://gist.github.com/dance2die/0d5a69a187ab07e9234bad36dbe72cad">View this gist on GitHub</a>

## 🤦‍♂️ Why? Why? Why?

I recently released a new package [@cshooks/usetrie](https://www.npmjs.com/package/@cshooks/usetrie) and [Nick Taylor](https://www.iamdeveloper.com/) generously provided an educational & thorough PR on how the code-base can be improved.

But not having a deep knowledge of TypeScript & Javascript, the [following change](https://github.com/cshooks/hooks/pull/11#pullrequestreview-219222430) caused an issue.

`gist:dance2die/13306ec6ab90419382e933434a131ad5`

<a href="https://gist.github.com/dance2die/13306ec6ab90419382e933434a131ad5">View this gist on GitHub</a>

FYI - `[useTrie](https://github.com/cshooks/hooks/blob/master/packages/useTrie/src/index.ts#L218)` is implemented as shown below.

`gist:dance2die/043283084a0ae76b7a8bef2c86799fb6`

<a href="https://gist.github.com/dance2die/043283084a0ae76b7a8bef2c86799fb6">View this gist on GitHub</a>

I was retro-fitting a mutable data structure and exposing it as a hook.

_But it's not a good way as you can see between [Paul Gray](https://twitter.com/PaulGrizzay) & [Dan Abramov](https://twitter.com/dan_abramov)'s tweets._

https://twitter.com/PaulGrizzay/status/1105941010344038401

https://twitter.com/dan_abramov/status/1105946933955301377

So be aware of the issue discussed above when you are extracting an imperative logic out of React.

## 🎉 Parting Words

I've paid handsomely for not following React way of doing things.  
I hope you the gotcha & the workaround helped you understand what's going on behind the scenes.

You can play around with the TypeScript transpiler on the [Playground page](<https://www.typescriptlang.org/play/index.html#src=class%20Trie%20%7B%0D%0A%20%20has(word)%20%7B%20return%20true%3B%20%7D%0D%0A%7D%0D%0A%0D%0Aclass%20Trie2%20%7B%0D%0A%20%20has%20%3D%20(word)%20%3D%3E%20true%3B%0D%0A%7D%0D%0A>).  
& the console log results in the [Sandbox](https://codesandbox.io/s/xjm96w0wmp).
