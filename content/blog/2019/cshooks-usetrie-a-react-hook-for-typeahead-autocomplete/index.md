---
title: "@cshooks/usetrie, A React Hook for Typeahead/Autocomplete"
date: "2019-03-23"
coverImage: "featured-image.jpg"
---

_Photo by _[_Jamie Street_](https://unsplash.com/photos/MoDcnVRN5JU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/retriever?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) _- "trie" is from "[Retrieval](https://en.wikipedia.org/wiki/Trie#History_and_etymology)" thus the cute_ 🐶 _"Retriever"_

I've released [@cshooks/usetrie](https://www.npmjs.com/package/@cshooks/usetrie).

It's a React Hook for [Typeahead](https://en.wikipedia.org/wiki/Typeahead)/autocompletion.

[@cshooks/hooks](https://github.com/cshooks/hooks) will be the home 🏠 of Computer Science data structures/algorithms related hooks.

## 🤔 Why?

When you have a list of texts you want to match by prefix, you have to match each text in an array one by one, which can be time consuming.

[Trie](https://en.wikipedia.org/wiki/Trie) is a data structure, which stores text in a tree, which enables a fast prefix look up.  
And `useTrie` works as a [facade](https://en.wikipedia.org/wiki/Facade_pattern) to enable fast prefix search.

## 🔧 How?

Check out the [README](https://github.com/cshooks/hooks/blob/master/packages/useTrie/README.md) file, which explains the usage in detail.

Here are some quick demo Sandboxes for the impatients.

- [Simple demo add/remove texts](https://codesandbox.io/s/3jzy58wqq)
- [String/object array & Reddit data demo](https://codesandbox.io/s/zz2mxlxzp)

![](https://www.slightedgecoder.com/wp-content/uploads/2019/03/2019-03-23_13-44-52.gif)

Demos

## ➕ Additional Info

I've created this initially for academic purposes to learn Trie data structure so `Trie` class is imperative and `useTrie` hook was forced to fit to work with declarative nature of React as shown below, which is not ideal.

<script src="https://gist.github.com/dance2die/168fcb4c7e85fbe8573c160b32520250.js"></script>

<a href="https://gist.github.com/dance2die/168fcb4c7e85fbe8573c160b32520250">View this gist on GitHub</a>

add/remove returns a new instance

_[https://github.com/cshooks/hooks/blob/master/packages/useTrie/src/index.ts#L191](https://github.com/cshooks/hooks/blob/master/packages/useTrie/src/index.ts#L191)_

I'd really appreciate any feedback on how I can improve the code base.

I will share in the next post what I've learned and failures.

And I plan to add other hooks returning [Min/Max heaps](https://github.com/cshooks/hooks/projects/1) & [Permutations](https://github.com/cshooks/hooks/projects/2).

## 🏔 Resources

- NPM - [@cshooks/usetrie](https://www.npmjs.com/package/@cshooks/usetrie)
- [Source Code](https://github.com/cshooks/hooks/tree/master/packages/useTrie) on GitHub
- License - [MIT](https://github.com/cshooks/hooks/blob/master/packages/useTrie/LICENSE)
