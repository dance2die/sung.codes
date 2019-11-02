---
title: "You don't always need to import React"
date: "2018-11-26"
---

[r/reactjs](https://www.reddit.com/r/reactjs/) has a Weekend Reads, which is a "'book club' type thing where we read something every weekend".

[Last week's topic](https://www.reddit.com/r/reactjs/comments/9zw638/weekend_reads_react_docs_on_jsx_in_depth/) was [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html), and I would like to share something that's been bothering me but learned why.

The question is "why do you import React" when "React" is not used anywhere in your component code?

## 🎶 Intro

When you start learning react, you might been told to always import React, `import React from "React"` in your component file.

**_But that's not always necessary._**

To understand why, let's see what JSX is.

## 🤔 JSX?

The subtitle in [JSX in Depth](https://reactjs.org/docs/jsx-in-depth.html) describes JSX as

> Fundamentally, JSX just provides syntactic sugar for the `React.createElement(component, props, ...children)` function

You can either use the JSX syntatic sugar 🍬 to create components or use `React.createElement` directly if you are not transpiling your source code.

## 🙄 Then shouldn't you import React everywhere?

No. not unless you use React object for your component.

You can create a [**"function"** component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) that returns value(s) of a simple JavaScript primitives, such as string or number.

<script src="https://gist.github.com/dance2die/9202791c070d40ac3274731ab762e587.js"></script>

<a href="https://gist.github.com/dance2die/9202791c070d40ac3274731ab762e587">View this gist on GitHub</a>

That is the full source for `App.js`.

In this case, `React` object is not used anywhere so you can leave out the import statement (but still is a valid component).

📒 _Note: If you are creating a **class** component, you need to import React as it needs to extend_ `_React.Component_`_._

And then you can import `App.js` just like any React component (Line #4).

<script src="https://gist.github.com/dance2die/833e1c1977ef11b10ce59fbbb3ea1bb8.js"></script>

<a href="https://gist.github.com/dance2die/833e1c1977ef11b10ce59fbbb3ea1bb8">View this gist on GitHub</a>

## 👋 Parting Words

I hope this has solved for the need to import React for components.

99% of the time, you'd use React object in someway to create a component so probably a good idea to import React anyway.  
☝ [Forget about this ever written](https://www.reddit.com/r/reactjs/comments/a0ms8s/you_dont_always_need_to_import_react_sungs/eaivaip/)...😅

## 🏔 Resources

- [Weekend Reads](https://www.reddit.com/r/reactjs/search?q=flair_name%3A%22Weekend%20Reads%22&restrict_sr=1) on [r/reactjs](https://www.reddit.com/r/reactjs/) - One article per week.
- [JSX in Depth](https://reactjs.org/docs/jsx-in-depth.html)
- See how [BabelJS transpiles JSX](https://babeljs.io/repl) - Just paste your React code in it.
- [Demo Sandbox](https://codesandbox.io/s/71wv195okj)
