---
title: "React Podcast Episode 29 -  'Don't Rewrite Your App for Hooks and Suspense' with Jared Palmer"
date: "2018-11-22"
---

_Photo by _[_Kai Pilger_](https://unsplash.com/photos/1k3vsv7iIIc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

More exciting features coming to React discussed in [React Podcast episode #29](https://reactpodcast.simplecast.fm/29).

[Chantastic](https://twitter.com/chantastic) discussed Hooks & Suspense features with [Jared Palmer](https://palmer.net/)'s demo before React Conf 2018.

**DISCLAIMER**: _Below is an unofficial show note highlighting discussions as I am not affiliated with podcast, just an avid listener :)._

## 📑 Table of Contents

- [Hooks](#hooks)
- [Suspense](#suspense)
- [Suspense + Cache](#suspense-cache)
- [Reiteration](#reiteration)
- [Next Challenge](#next-challenge)
- [Chantastic's Insight](#insight)
- [Upgrade Tips](#tips)
- [Don't rewrite your app at all](#rewrite)
- [Resources](#resources)

## ⚓ Hooks

### 🔹 Fundamentally replaces [Render Props](https://reactjs.org/docs/render-props.html)

- Render Props can cause a [callback hell](https://twitter.com/acdlite/status/955955121979969537) caused by chaining multiple Render Props( prevalent in node).
- Hooks solve the overly nested code using a plain old JavaScript functions.

### 🔹 React going all-in with JavaScript because

1. It's easy to test
2. Everything is in scope

_**Sung's note**: because class components would require you to access states using `this` & many new people suffer from not knowing to bind methods with current instance's `this` like `this.method.bind(this)`?_

### 🔹 TypeScript

Less code is required

1. as it removes the need to create interfaces for props and states for class components.
2. And with initial value of `useState` TypeScript can infer the type of state returned as the first argument in the returned tuple (helps autocomplete feature in editors).
3. Makes it easy to move states around.

### 🔹 Other Benefits

- You can use plain function syntax without transpiling.
- Read [Hooks documentation](http://reactjs.org/hooks) top to bottom without skipping

### 🔹 Possible drawback

Learning curve could be an issue because this is a new feature thus requires you to remember "bunch of stuff".

But once you get over the hurdle it's great because

1. You can easily refactor states.
2. You have a choice to put new state(s) in component or elsewhere.

Jared is optimistic about Hooks' future and considers it the next logical step to take for React.

## 🌉 Suspense

### 🔹 What is it about?

Suspense is about an "efficient loading of resources".

### 🔹 Loading State Problem

On fast connection, users prefer not to see a janky loading screens but on a slow connection they'd like to see it.

Speed, performance, and UX (User Experience) directly conflict with each other in this case because

- According to a UX research, user do not perceive the speed difference when a change occurs in 200~400ms.
- Showing a loading spinner during that period makes user to feel it as janky on a fast connection but would like to know something is happening when the threshold is reached.

Showing nothing still doesn't solve a problem as you still have to check of the loading state.

Many attempts were made to address the issue (lazy load data, assets, etc)   
but they still don't react to (slow/fast) network.

### 🔹 How does Suspense work?

Suspense allows you where to pause rendering while other components wait for resources.

When a resource arrives React can continue to render or else Suspense can show a fallback content.

Suspense literally stops time from happening.

### 🔹 How does it help?

Suspense enables us to orchestrate fallback declaratively.

- This enables us to remove loading states and imperative checks.
- You just tell React where to suspend/wait (DOM mutation is paused during this phase).

Suspense can make loading dynamic components easy.

1. We can lazily load components using [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) by wrapping it in Suspense telling React to pause until the component is resolved.
2. If it takes longer than a certain threshold, Suspense displays a fallback.
3. This solves speed, performance, and UX issue mentioned in the [problem statement](#loading-state-problem) above.

### 🔹 How to handle Suspense errors

Use [Error Boundaries](https://reactjs.org/docs/code-splitting.html#error-boundaries).

### 🔹 Concurrent Mode

Prerequisite is that your app needs to pass a [strict mode](https://reactjs.org/docs/strict-mode.html) by fixing all warning generated when you wrap your app using `<React.StrictMode />`.

Once your app passes the strict mode, you can replace [ReactDOM.render](https://reactjs.org/docs/react-dom.html#render) with [ReactDOM.createRoot](https://github.com/sw-yx/fresh-concurrent-react/blob/master/apis/roots.md#reactdomcreateroot-and-rootrender), which you returns an object and call render on.

### 🔹 What if you can't pass Strict Mode test?

You can still use Concurrent Mode by

1. identifying React tree where strict mode passes
2. and wrapping that portion of tree in [React.ConcurrentMode](https://github.com/sw-yx/fresh-concurrent-react/blob/master/Intro.md#getting-started-with-concurrentmode).

_This enables an incremental adoption._

### 🔹 Outside of Concurrent Mode?

If Suspense is used outside concurrent mode, Suspense will fallback right away while child component is still loading itself.

You still get janks but with less code as it rids of loading state used in imperative code.

Benefits of using Suspense outside of Concurrent Mode are

1. A better DX (Developer Experience)
2. and it slowly prepares your app for the better UX.

## 🌉 Suspense + 💲 Cache

Data fetching is simplified when combined with cache thanks to how Suspense works because everything (_wasn't clear. Did Jared mean states? or components?_) is always defined.

When everthing (_?_) is defined, TypeScript would not require partial classes (_I need some feedback on this as I am a TS newbie..._).

Coupling Hooks with Suspense + Cache, you can access asynchronous code as if it is a synchronous one providing a better readability.

This combination also solves [waterfall issue](https://www.quora.com/What-is-waterfall-problem) of component state dependency orchestration (case where next components need to wait when previous ones are loaded).

### 🔹 Example

Siblings of a single Suspense run in parallel.

<script src="https://gist.github.com/dance2die/a2ea846b6e5e89e157e6655854362993.js"></script>

<a href="https://gist.github.com/dance2die/a2ea846b6e5e89e157e6655854362993">View this gist on GitHub</a>

In the code above, Component1 & 2 run in parallel.

Similar concept as how [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) runs promises in parallel.

**Caveat**: Nested components in Suspense are going to run with waterfall.

**_Sung's Note_**: N*ot sure how this works exactly...*

And you can nest Suspense within each other infinitely.

### 🔹 Use Cases

1. Using a low quality image place holder while a high res version is loading.
   - Wrap regular image component in Suspense.
   - Regular image will be fetched while Suspense displays a low quality image as a fallback until the high resolution resource becomes available in cache.
2. Loading external 3rd party payment script.
   - You can enable check out button only when [Stripe](https://stripe.com/docs/api) script is loaded.
3. You can load next component to load ahead of time to enable a transition effect.
4. For SSR (server-side rendering), you have to know what data your components need ahead of time.
   - This forces Apollo to traverse React tree twice (  
      Components have to figure out what data they need so React is going to render without data and then with data).
   - This slows down the SSR page.
   - In later cache implementations, React tree can be walked down only once but not yet "quite there, yet".

### 🔹 Cache

It is just a [reference implementation](https://github.com/facebook/react/blob/ce96e2df4d/packages/react-cache/src/ReactCache.js) how it can hook into React.

Data normalization & validation features are missing (but coming).

## ➿ Reiteration

Suspense is about efficiently orchestrating resources.

_providing **both** good DX  & UX_

You can put anything (images, components, data, etc) in Cache

_providing a better UX_

React lets us describe "what" you want to do, not "how" you want to do.

_Refer to the "declarative" loading states using Suspense._

## 🥊 Next Challenge

Animation is the next challenge and JP considers it's an unsolved problem.

## 🤔 Chantastic's Insight

React team is making "right thing easy" to do with Suspense's `maxDuration` (the threshold time for the fallback).

It makes taking care of the `3rd state` (network state where loading data takes long or short) between "loading" state and "data" state.

## 📈 Upgrade Tips

Incrementally adopt these new features, instead because React is always incrementally adoptable & improvable.

**_e.g.)_** Suspense can be used in concurrent mode for

1. the whole app (with `ReactDOM.createRoot`)
2. partially (using `React.ConcurrentMode`)
3. or outside concurrent mode

Focus on movement not migration.

1. Use `React.lazy` for code splitting
2. Manage assets using cache to orchestrate loading & caching resources
3. Use Suspense + Cache to fetch and store data

⚠ **WARNING**: Wait on this tip because data normalization & validation features are missing (but coming).

### 🔹 Miscellaneous Tips

1. Make a plan
2. Budget available extra time.
3. Refactor only when necessary and do not refactor everything at once.

## 🙅 Don't rewrite your app at all

Jared has stressed this 4 times at

1. 31:20
2. 37:33
3. 44:25
4. 45:31

## 🏔 Resources

- [React Podcast #29](https://reactpodcast.simplecast.fm/29)
- [Chantastic](https://twitter.com/chantastic)
- [Jared Palmer](https://palmer.net/)
- [fresh-concurrent-react](https://github.com/sw-yx/fresh-concurrent-react) - Up-to-date Concurrent React documentation by [Swyx](https://twitter.com/swyx). (Not an official documentation but Swyx keeps it "fresh" 🍅.
