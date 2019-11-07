---
title: Rollup Class Properties Transform Babel Plugin Issue
date: '2018-05-15'
banner: ./images/featured-image-1.jpg
published_at: '2018-05-16T02:23:24.000Z'
tags: 'blogentry, quicktip, babel, es6'
author: Sung M. Kim
---

I have an NPM library, [calendar-dates](https://www.npmjs.com/package/calendar-dates) built with [RollUp.JS](https://www.rollupjs.org/) ("RollUp" hereafter). As I was using an experimental JavaScript feature, [Class properties transform](https://babeljs.io/docs/plugins/transform-class-properties/) (to declare a static property in an ES6 class) with RollUp, I ran into the following error 🙅.

> \[!\] (commonjs plugin) SyntaxError: Unexpected token

`gist:dance2die/475dcb2ce42e908ea5cf94eb488654df`

I'll show you what I did and how I fixed the error. (I will assume that you are familiar with static class properties in ES6 and RollUp)

### 🤔 What I did before getting the error

My main class `CalendarDates` is declared with the static property, `monthTypes`, which caused the error in the introduction.

`gist:dance2die/1a7f2bb3a09335cbb196d49cd06158ea`

I installed the Class properties transform Babel plugin to the project as a devdependency.

`gist:dance2die/1486b7edfa11770bafe99a35e63b080a`

And added `transform-class-properties` plugin in `.babelrc` file.

`gist:dance2die/5505066d00e500a09c1fa160aa74f4a4`

Below was my original `rollup.config.js` file.

`gist:dance2die/7141177812ed6f382e24804614766a66`

The configuration takes `src/index.js` file as an input then

1. Resolves package (resolve())
2. Converts CommonJS to ES6 (commonjs())
3. Minimize the package (uglify())
4. Converts ES6 to ES5 (babel())

Lastly, outputs two files

1. calendardates.cjs.js - Common JS module - Enables the library to be imported using `require()`
2. calendardates.esm.js - ES6 module - Enables the library to be imported using `import()`

The logic above worked until I added Class transform properties plugin.

### ⛏️ How I Fixed It

It turns out that my logic was half-right.

What I had to do  was to transpile (with Babel) before piping the code into `commonjs()`.

`gist:dance2die/835d1fbb8b013d6f7be4fd63d08554f4`

Basically Babel converts ES6 code into ES5 and then `commonjs()` converts that ES5 back to ES6 so that the library can be `import`'ed in ES6 code. The order of how plugins are added matters!

Here is the result after the change.

`gist:dance2die/fb20a6e91439c9521ad46f97338e371d`

I hope you were making 😁 if you were having a similar issue.

### 🎐 Parting Words

Yeah, it was as simple as just moving plugin methods around. Learned something new that the order of plugin declaration mattered.

I only guessed to change the order around as I was used to using middlewares in ASP.NET Core, and Express. It seems like many programming concepts can be found in many places and can be used.

Here is the link to the updated [rollup.config.js](https://github.com/dance2die/calendar-dates/blob/add_date_metadata/rollup.config.js).

