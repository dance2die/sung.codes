---
title: "Expression Bodied Collection Property Initialization Gotcha in C#"
date: "2017-09-16"
coverImage: "featured-image-1.jpg"
---

I was implementing a [trie,](https://en.wikipedia.org/wiki/Trie) which is a tree data structure, usually for storing strings for searching. Since it's a tree, it has a "Children" for holding child nodes.

But then I ran into a problem where simply calls to adding children to a collection (Line# 9) didn't work.

`gist:dance2die/57e7aa68fcef7a7fe8cc983d0c922422`

After 30 minutes of debugging, I was like...

![](https://media.giphy.com/media/11dR2hEgtN5KoM/giphy.gif)

Just what the hl happened?

### TL;DR

> Auto Property initialization creates a backing field while Expression Bodied property one does not

### ▬ Introduction ▬

According to [Wikpedia](https://en.wikipedia.org/wiki/Trie#Algorithms), you can declare a trie like this (in Haskell).

`gist:dance2die/7255d7236b1eed8d2dd287607cdaa88d`

So I created a `TrieNode` class as shown below.

`gist:dance2die/5b29a64f8f5ab7a880255b7e043e057f`

_If you are an astute reader, you might have already spotted the problem. Congratulations!_

### ▬ Problem ▬

The complete source for building a trie, `TrieBuilder` is declared as below.

`gist:dance2die/dd97d22fce289dd3359f307fb2c67364`

Given a list of words passed to `BuildTrie` method, it populates a trie and returns an object instance.

`Insert` method simply checks for an existence of a character and maps current character to a node to the trie object instance , `current`.

This is where the **problem** occurred. `current.Children.Add(...)` wasn't adding  `node` object instance.

### ▬ Investigation ▬

Later on, I found out a StackOverflow [answer](https://stackoverflow.com/a/33235639/4035) explanating that declaring a property with `=>` syntax (introduced in C# 6) does **NOT** create a backing field.

So my declaration below,

`gist:dance2die/72ae994cff4f452330a732c53945d845`

is equivalent to

`gist:dance2die/e90747c077f43de460b13d0aeeccf512`

returning a new array whenever `Children` property was accessed, thus not adding a new node to it.

### ▬ Solution ▬

The fix is simple. Declare Children with a backing field or use an auto property initialization syntax.

`gist:dance2die/bca476ec22b64a031b8b6539572599df`

Above declaration is equivalent to

`gist:dance2die/8cee8a9abcd8fcec8ce6f5c35789705e`

That was all it took to make me a happy camper ?.

# ![](https://media.giphy.com/media/Ve20ojrMWiTo4/giphy.gif)

### ▬ Takeaway ▬

Auto Property initialization creates a backing field while Expression Bodied property one does not.
