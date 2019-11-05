---
title: React Sticky Event with Intersection Observer
date: "2019-08-24"
coverImage: featured-image.jpg
published_at: "2019-08-24T20:55:35.000Z"
tags: "react, css"
author: Sung M. Kim
---

_Photo by _[_Kelly Sikkema_](https://unsplash.com/@kellysikkema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/sticky-notes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

There isn't a way to monitor stickiness of a component in CSS (`position: sticky`).

This nice article on Google, [An event for CSS position:sticky](https://developers.google.com/web/updates/2017/09/sticky-headers) shows how to emulate sticky events in vanilla JavaScript without using scroll event but using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

I will show how to create React components to emulate the same behavior.

## Table of Contents

- [Prerequisite](#prerequisite)
- [What we are building](#building)
  - [Here is the working Sandbox](#sandbox)
- [Using sticky event components](#usage)
- [Implementing Sticky Components](#implementation)
  - [StickyViewport](#stickyviewport)
  - [StickyProvier](#stickyprovider)
  - [StickyBoundary](#stickyboundary)
    - [useSentinelOffsets](#useSentinelOffsets)
    - [useObserveTopSentinels](#useObserveTopSentinels)
    - [useObserveBottomSentinels](#useObserveBottomSentinels)
  - [Sticky](#sticky)
- [Resources](#resources)

## Prerequisite

This article is based on [An event for CSS position:sticky](https://developers.google.com/web/updates/2017/09/sticky-headers), which also provides a nice [demo](https://ebidel.github.io/demos/sticky-position-event.html) and explanation on how it was implemented as well as the [source code](https://github.com/ebidel/demos/blob/master/sticky-position-event.html).

The basic idea is that, you add top & bottom sentinels around the sticky boundary, and observe those sentinels using `[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)`.

Left is the terms used in the linked article above and the right is corresponding component name used here.

- Scrolling Container -> `<StickyViewport />`
- Headers -> `<Sticky />`
- Sticky Sections -> `<StickyBoundary />`

![](https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/08/Sticky-Component-Overview.png?fit=1024%2C760&ssl=1)

## What we are building

Before moving on, let's see what we are building.

https://youtu.be/Mq-g7bSEQvg

Sticky headers styles are changed as they stick and unstick without listening to [scroll event](https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event), which can cause site performance issue if not handled correctly.

### Here is the working Sandbox.

<iframe src="https://codesandbox.io/embed/react-sticky-javascript-refactored-w8otj?fontsize=14&amp;view=preview" title="react-sticky-javascript-refactored" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

_You can click on `Toggle Debug` button to show sentinels._

You can see that the sticky headers change the color and the box shadow styles.  
Let's see the usage of sticky components.

## Using sticky event components

Here is the how one might use the component to observe un/stuck events.

<script src="undefined.js"></script>

<a href="undefined">View this gist on GitHub</a>

`gist:dance2die/a39355c83f23f5e8c66747eb612c7c3a`

<a href="https://gist.github.com/dance2die/a39355c83f23f5e8c66747eb612c7c3a">View this gist on GitHub</a>

Usage

1. Specifies the viewport in which the IntersectionObserver should base on "threshold" with ([root](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root)). By default, IntersectionObserver's root is set to the viewport. `as` specifies which element the DOM should be rendered as. It's rendered as `main` in this case where default is `div`.
2. shows the section within which the sticky component sticks. (This is where "top/bottom" sentinels are added as shown in the Google doc)
3. The boundary is where the un/stuck events can be subscribed via following props.
4. Render a sticky component as "h1" - This is the component that will stick within the `StickyBoundary` on scroll.
5. shows event handlers. `handleChange` handler changes the background color and the box shadow depending on sticky component's stickiness.

Now let's see how each component is implemented.

## Implementing Sticky Components

I will start from top components toward the bottom because I've actually written the rendered component (how the components should be used) before writing down implementations for them.

_I wasn't even sure if it'd work but that's how I wanted the components to work._

### ⚛ StickyViewport

Let's take a look at how it's implemented.

`gist:dance2die/d2c410470a75b612ec38e94af3011126`

<a href="https://gist.github.com/dance2die/d2c410470a75b612ec38e94af3011126">View this gist on GitHub</a>

<script src="undefined.js"></script>

<a href="undefined">View this gist on GitHub</a>

1. It's basically a container to provide a context to be used within the Sticky component tree ("the tree" hereafter).
2. The real implementation is within `StickyRoot`, which is not used (or made available via module export) in the usage above.
   - While `StickyViewport` makes context available within the tree without rendering any element, `StickyRoot` is the actual "[root](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root)" (of IntersectionObserver option).
3. To make the container ref available down in the tree, action dispatcher is retrieved from the custom hook, `useStickyActions` (,which is a `dispatch` from `useReducer`) in the provider implementation.
4. Using the `dispatcher.setContainerRef`, we make the reference available in the tree for the child components.

Now let's see what state and actions `StickyProvider` provides in the tree.

### ⚛ StickyProvider

The context is implemented using the pattern by Kent C. Dodd's article, [How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively).

Basically, you create two contexts, one for the state, another for dispatch and create hooks for each.

The difference in `StickyProvider` is that, instead of exposing raw `dispatch` from `useReducer` directly, I've encapsulated it into actions.

_I'd recommend reading Kent's article before moving on._

`gist:dance2die/07659aef6b54ed1305bb67f7fe88498d`

<a href="https://gist.github.com/dance2die/07659aef6b54ed1305bb67f7fe88498d">View this gist on GitHub</a>

1. `containerRef` refers to the ref in `StickyRoot`, which is passed to the IntersectionObserver as the `root` option while `stickyRefs` refers to all `<Sticky />` elements, which is the "target" passed to event handlers.
2. `setContainerRef` is called in the `StickyRoot` to pass to `StickyBoundary` while `addStickyRef` associates TOP & BOTTOM sentinels with `<Sticky />` element.  
   We are observing TOP & BOTTOM sentinels so when `<StickyBoundary />` fires events, we can correctly retrieve the target sticky element.
3. I am not returning a new reference but updating the existing "state" using `Object.assign(state,...)`, not `Object.assign({}, state, ...)`.  
   Returning a new state would infinitely run the effects, so only `stickRefs` are updated as updating the state reference would cause `containerRef` to be of a new reference, causing a cascading effect (an infinite loop).
4. `StickyProvider` simply provides states raw, and
5. creates "actions" out of dispatch, which makes only allowable actions to be called.
6. and
7. are hooks for accessing state and actions (I decided not to provide a "Consumer", which would cause a false hierarchy as render prop would.).
8. `StickySectionContext` is just another context to pass down TOP & BOTTOM sentinels down to `Sticky` component, with which we can associate the sticky `target` to pass to the event handlers for `onChange, onUn/Stuck` events.
   It was necessary because we are observing TOP & BOTTOM sentinels and during the declaration, we don't know which sticky element we are monitoring.

Now we have enough context with state & actions, let's move on and see implementations of child components, `StickyBoundary`, and `Sticky`.

### ⚛ StickyBoundary

The outline of `StickyBoundary` looks as below.

`gist:dance2die/c494a38b8923f83f1e4ee4963817d14e`

<a href="https://gist.github.com/dance2die/c494a38b8923f83f1e4ee4963817d14e">View this gist on GitHub</a>

1. The boundary is where you'd subscribe stickiness changes.
2. Create TOP & BOTTOM sentinel references, with which, we observe the stickiness of sticky components.
3. Compute sentinel offsets.
4. This hook observes top sentinel and fires events depending on the boundary calculation in relation to the viewport.
5. This hook observes BOTTOM sentinel and fires events depending on the boundary calculation in relation to the viewport.
6. Saving the sentinel refs to associate with sticky component somewhere down in the tree.
7. `StickyBoundary` simplys wraps the children with TOP & BOTTOM sentinels and applies computed offsets calculated in step 3.

So basically `StickyBoundary` wraps children with TOP & BOTTOM sentinels, with which we can tell whether a sticky component is stuck or unstuck.

Now let's implement hooks.

#### 🎣 useSentinelOffsets

`gist:dance2die/b334739cabccfc716d1b177f303af947`

<a href="https://gist.github.com/dance2die/b334739cabccfc716d1b177f303af947">View this gist on GitHub</a>

1. TOP margin & BOTTOM height calculation requires the top sentinel ref.
2. This is where the calculation occurs whenever sticky elements, and top sentinel ref changes (`[stickyRefs, topSentinelRef]`).
3. We've associated sticky elements with TOP & BOTTOM sentinels via context, so fetch the sticky node associated with the top sentinel.
4. Get the sticky element styles required for calculation.
5. Calculate the BOTTOM sentinel height.
6. We make the calculated states available to the caller.

#### 🎣 useObserveTopSentinels

`gist:dance2die/f26f7b64094d635ae8de5498c3ac4cb1`

<a href="https://gist.github.com/dance2die/f26f7b64094d635ae8de5498c3ac4cb1">View this gist on GitHub</a>

OK, this is now where it gets messy a bit. I've followed the logic in [the Google doc](https://developers.google.com/web/updates/2017/09/sticky-headers) so will be brief and explain only relevant React codes.

1. These are the events to be triggered depending on the TOP sentinel position.
2. We have saved the references via context actions. Retrieve the container root (viewport) and the stick refs associated with each TOP sentinel.
3. This is where observation side effect starts.
4. The logic was "taken" from the Google doc, thus will skip on how it works but focus on events.
5. As the TOP sentinel is moved up, we fire the "stuck" event here.
6. And when the TOP sentinel is visible, it means the sticky element is "unstuck".
7. We fire whenever either unstuck or stuck is even fired.
8. Observe all TOP sentinels that are registered.

#### 🎣 useObserveBottomSentinels

The structure is about the same as `useObserveTopSentinels` so will be skipping over the details.

The only difference is the logic to calculate when to fire the un/stuck event depending on the position of BOTTOM sentinel, which was discussed in the Google doc.

`gist:dance2die/f813bd90dcf680bf67fdde163dca3a89`

<a href="https://gist.github.com/dance2die/f813bd90dcf680bf67fdde163dca3a89">View this gist on GitHub</a>

Now time for the last component, `Sticky`, which will "stick" the child component and how it works in conjunction with aforementioned components.

### ⚛ Sticky

`gist:dance2die/4483589c5ff5ed9cc9a6fc9ecd2588be`

<a href="https://gist.github.com/dance2die/4483589c5ff5ed9cc9a6fc9ecd2588be">View this gist on GitHub</a>

1. First we get the TOP & BOTTOM sentinels to associate with
2. so that we can retrieve correct child target element from either a top sentinel or a bottom sentinel.
3. We simply wrap the children and apply `position: sticky` around it using a class module (not shown here).

Let's take a look at the working demo one more time.

<iframe src="https://codesandbox.io/embed/react-sticky-javascript-refactored-w8otj?fontsize=14&amp;view=preview" title="react-sticky-javascript-refactored" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Resources

- Google Documentation
  - [An event for CSS position:sticky](https://developers.google.com/web/updates/2017/09/sticky-headers)
    - [Demo](https://ebidel.github.io/demos/sticky-position-event.html)
    - [Source Code](https://github.com/ebidel/demos/blob/master/sticky-position-event.html)
  - [IntersectionObserver’s Coming into View](https://developers.google.com/web/updates/2016/04/intersectionobserver)
- MDN
  - [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
  - IntersectionObserver [root](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root) option
- [Sandbox](https://codesandbox.io/s/react-sticky-javascript-refactored-w8otj)
