---
title: "Immutability makes tracking changes cheap"
date: "2018-12-02"
---

_Photo by _[_Joeri Römer_](https://unsplash.com/photos/Xne1N4yZuOY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/boulder?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

_**Note to self...**_

This week's Weekend Reads in [r/reactjs](https://www.reddit.com/r/reactjs) was for [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html).

An ah-ha moment when reading the article regarding immutability.

Suppose that you have a component, `Post` that has to render a comment thread like this.

_Reddit Post:_ [_What's a joke that's so stupid it's funny?_](https://www.reddit.com/r/AskReddit/comments/a26y06/whats_a_joke_thats_so_stupid_its_funny/)

![](https://www.slightedgecoder.com/wp-content/uploads/2018/12/reddit-comments.jpg)

Reddit Comments

And the state tree would look like below.

![](https://www.slightedgecoder.com/wp-content/uploads/2018/12/comment-tree.png)

Post state tree

When JavaScript compares two values, primitive type (number, string, boolean, etc) comparisons shown in the state tree, such as `id`, `date`, `author`, are cheap.

When you have to compare object type states, a comparison is done _**by reference**_. 

So if someone has modified one of the items in `comments` array, you have to traverse every item in the comment to find out if anything has changed.

It's an `O(n)` operation process thus it's slow 🦄.

But if you had returned a new `comments` array (using Object.assign or object spread, {...}) then reference has changed, thus you know that something has changed.

Now it's an `O(1)` operation, blazing fast 🏎.

## TIL

If your state is immutable, then React can reconcile which state to update cheaply.

You can still override [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) if you need need more control.

## Resources

- [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html) - Official React Documentation
- [\[Weekend Reads\] React Docs on Optimizing Performance](https://www.reddit.com/r/reactjs/comments/a1y5ej/weekend_reads_react_docs_on_optimizing_performance/)
- [Immutable User Interface](https://vimeo.com/album/3953264/video/166790294) - Lee Byron in Render 2018
    - Haven't finished watching it, yet
    - Just found it from [Dan's tweet](https://twitter.com/dan_abramov/status/735530699231531008).
