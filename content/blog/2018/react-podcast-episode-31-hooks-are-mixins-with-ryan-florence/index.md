---
title: React Podcast Episode 31 – “Hooks are Mixins” with Ryan Florence
date: "2018-12-09"
published_at: "2018-12-09T21:40:06.000Z"
tags: "react, shownote, podcast"
author: Sung M. Kim
banner: ./images/featured-image.jpg
---

_Photo by _[_Jakub Kapusnak_](https://unsplash.com/photos/4f4YZfDMLeU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/bibimbap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Ryan Florence appeared on React Podcast episode #31 to talk about hooks and other new features coming in React.

The podcast was recorded before the React Conf 2018 thus there are some time travelling involved 😁.

**DISCLAIMER**: I am not affiliated with podcast, just an avid listener 😛.

## Acronyms

I've used simplified names for React life cycle method names.

- cDU - comopnentDidUpdate
- cDM - componentDidMount
- cWU - componentWillUnmount

## 📃 Table of Contents

- [Intro](#intro)
- [Hooks](#hooks)
- [90% Cleaner React](#cleaner)
- [Suspense + Resources (Cache)](#suspense)
- [Directives?](#directives)
- [Closing Comments](#closing)
- [Resources](#resources)

## 🏹 Intro

Ryan has felt that it's "a little bit unfair" that people complaining about React getting too big.

His explanation was that the new React APIs will enable simpler and smaller code.

#### 🔹 Framework or Library?

Ryan has stated that Ruby has always been a framework as "you hand top level components to ReactDOM.render & React calls all life cycle on it".

He has compared the process to frameworks such as Ruby on Rails & Ember frameworks (at 3:47).

_But later in the episode (35:11), Chantastic suggested that React still isn't a framework as React doesn't tell you to use hooks, suspense or resources._

#### 🔹 React take the wheel 🎡

Chantastic mentioned Ryan's blog post [React take the wheel](https://medium.com/@ryanflorence/react-context-and-re-renders-react-take-the-wheel-cd1d20663647), in which Ryan talks about letting React take care of mutations.

In the old (a better term than "legacy" as per Ryan) API of React, **_React told us_** what it was doing.

- cDM (componentDidMount) - I am going to mount
- cDU (componentDidUpdate) - I updated this

And we had to figure out what to do with it.

But with new React API,

- **_We get to define_** what we need with Suspense & Cache (resource)
- **_React tells us_** what we need to do.
  - `getSnapshotBeforeUpdate` & `getDerivedStateFromProps`tells us what we need to do instead of what React is doing.
- **_We have a control_** over life cycle methods (`useEffect`).

We have more direct control over our code resulting in a simpler & readable code.

## ⚓ Hooks

#### 🔹 What are hooks?

Borrowing from an analogy in [Dan's presentation](https://youtu.be/V-QO-KO90iQ?t=3420) in React Conf 2018,   
`Atom` was thought to be the smallest unit of matter but electron was discovered, which has always been around.

Hooks are the functionalities that have always been there in React spread out across over the class but now discovered and given a name.

It's a way to take everything we are doing across class, keeping our state (`useState`, `useReducer`, `useContext`) and manage life cycles (`useEffect`) within function components enabling high composability.

Ryan has advised not to migrate everything over to use the new API.

_Same advice given by Jared Palmer in Ep 29, "_[_Don't Rewrite Your App for Hooks and Suspense with Jared Palmer_](https://reactpodcast.simplecast.fm/29)_"_

#### 🔹 Types of Hooks

- [useState](https://reactjs.org/docs/hooks-reference.html#usestate) - replaces setState
- [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) - replaces most of life cycle methods such as cDM, cDU, cWU.
  - _`getSnapshotBeforeUpdate` and `componentDidCatch` [not yet supported](https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes)._
- [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) - to memoize value (data, components, etc).
- [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) - to manage state with reducers by dispatching.
- [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) - for some edge cases
  - _`useMutationEffect` was also mentioned [but later removed](https://github.com/facebook/react/pull/14336)._
- [useRef](https://reactjs.org/docs/hooks-reference.html#useref) - replaces [React.createRef](https://reactjs.org/docs/react-api.html#reactcreateref).

With hooks, there is no need for an instance variable & use just local variables.

e.g.)   
Instead of setting up intervals and saving the ID in `this.ID` in `cDM`, and clearing it in `cWU` using the instance variable, you can create a simple local variable to store the interval ID and clear it in the same hook, `useEffect`.

#### 🔹 Hooks are (analogies)

1. "Mixins done right"
2. "Mixins that don't suck for function components".

_Refer to [Mixins](https://reactjs.org/docs/react-without-es6.html#mixins) documentation._

Hooks solves the "false hierachy" (Ryan calls it a "syntax disaster") of Render Props.

## ♻ 90% Cleaner React

#### 1\. Hooks let us co-locate single concern in a few lines of code

e.g.) When you have a document title update code, and event subscription codes spread out across in life cycle methods, you can now separate each unrelated code (updating document title & un/subcribing events) in different piece of code (separate `useEffect` or your own hooks).

#### 2\. Hooks require less code and are more portable

Making it easy to refactor and extract logic to use it in other places.

All states and effects are located next to each other so it's easy to cut & paste (refactor).

React looked simple (with devs only having to deal with components) on the surface but everything you deal with to get the simple task done (fetch/reading data & un/subscribing events), the code became big.

[_90% Cleaner React talk_](https://youtu.be/wXLf18DsV-I) _in React Conf 2018_

## 🌉+💲 Suspense + Resources (Cache)

**Suspense & Resources allows you to treat data like a synchronous value.**

What's the suitable way to handle hooks, suspense, and resources?

Before we had just components but most apps also use Redux.  
So use hooks to replace state and life cycles.  
Most of people use Redux as client-side cache, which can be replaced with Suspense and Cache.

_Thus, React feels smaller (as previously pointed out at 3:10)_

## 👉Directives?

Directives are "just attributes you put on an element and add a behavior to it".

Hooks lets you add behaviors to elements without having to provide data to a component using Render Props.

_I'd need some example on this... kinda confused._  
_Refer to [this Reddit comment](https://www.reddit.com/r/reactjs/comments/a4p7e0/an_unofficial_show_note_for_react_podcast_episode/ebi8dcd/) regarding the attributes explanation._

## 🚪 Closing Comments

- Ryan is incredibly optimistic about React's future as Jared Palmer was in [episode #29](https://reactpodcast.simplecast.fm/29).
- Take it (Hooks) fast.
- Hooks can be shared without transpilation.
  - and "way easier to type because you are not typing a bunch of props" especially true for Render Props.
  - With function components, props are just arguments to a function also making it easy to type

Subscribe to Chantastic's [React Holiday](https://react.holiday/) where he will cover new APIs mentioned in podcasts.

## 🏔 Resources

- React Podcast [Episode #31](https://reactpodcast.simplecast.fm/31).
- React Podcast [Episode #29](https://reactpodcast.simplecast.fm/29).
- [Official Hooks Documentation](https://reactjs.org/hooks)
- [90% Cleaner React](https://youtu.be/wXLf18DsV-I) by Ryan Florence
