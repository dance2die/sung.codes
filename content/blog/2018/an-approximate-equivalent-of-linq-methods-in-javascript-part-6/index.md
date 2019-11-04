---
title: How to Implement LINQ methods in JavaScript - Part 6
date: '2018-04-14'
coverImage: featured-image.jpg
published_at: '2018-04-15T01:59:34.000Z'
tags: 'blogentry, programming, quicktip, series'
author: Sung M. Kim
---

Photo by [Baher Khairy](https://unsplash.com/photos/Q3a0FHRS4BU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/six?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) I will cover methods for getting subset of sequence.

Here are the methods covered so far.

1. [Part 1](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/) 〰️ [Select](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#select), [Aggregate](https://www.slightedgemate-equivalent-linq-methods-javascript/#aggregate), [Where](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#where), OrderBy ([Ascending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByAscending), [Descending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByDescending))
2. [Part 2](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/) 〰️ [Any](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#any), [Distinct](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#distinct), [Concat](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#concat), [SelectMany](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#selectmany)
3. [Part 3](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/) 〰️ [Reverse](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#reverse), [Zip](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#zip), [Min/Max](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#minmax)
4. [Part 4](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/) 〰️ [Union](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#union), [Intersect](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#intersect), [Except](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#except)
5. [Part 5](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/) 〰️ [Sum](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#sum), [Average](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#average), [Count](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#count)
6. [**Part** 6](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/) 〰️ [First](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#first), [Last](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#last), [DefaultIfEmpty](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#defaultIfEmpty), [Skip](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#skip), [Take](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#take)
7. [Part 7](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7/) 〰️ [Empty](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#empty), [Repeat](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#repeat), [Range](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#range)
8. [Pa](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)[rt](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/) **[8](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)** 〰️ [All](#all), [Contains](#contains), [SequenceEqual](#sequenceEqual)

### 🔴 Overview

In this article, I will cover following methods.

\[table id=6 /\]

The sample collections used in this part are shown as below.

<!-- prettier-ignore -->
###### C#

`gist:dance2die/50ecc824ac0690b748578638506c37f0`

###### JavaScript

`gist:dance2die/37d6e62df1b39297660d25172618028b`

### 🔴 Examples

##### 🔸 First/FirstOrDefault

`gist:dance2die/2b0e7371513d10b396e3fdc86f225c2c`

`gist:dance2die/6a79b6f46445dfc4189ef507da18cf90`

###### Results

`gist:dance2die/630c89d4a1ca751a73702dd23f83304e`

I've just used "first" in JavaScript to implement "First/FirstOrDefault". JavaScript is dynamically typed so it wouldn't know what default value is unless you specify unlike in C#.

##### 🔸 Last/LastOrDefault

`gist:dance2die/bafb9c165141c783febb91a2472b91d7`

`gist:dance2die/0ff8b541482d346b866f943dbb5af5fd`

###### Results

`gist:dance2die/4dd6aad78993228f6ea885637678c52d`

Same as "first", I used "last" in JavaScript to implement both "Last/LastOrDefault"

##### 🔸 DefaultIfEmpty

`gist:dance2die/7fe8e3e97d6c6c8d15f028774963386c`

`gist:dance2die/10e63dd4b2533668c9b65afd6e9c496c`

###### Results

`gist:dance2die/98d00030a6159282bbc580e03d16814d`

In JavaScript, `filter` returns an array of size 0 if no record is returned. So I am checking for the size and return `nullOrder` if the length is 0.

##### 🔸 Skip/SkipWhile

`gist:dance2die/a3c27c88d4bc36e07496ab1c69701dfe`

`gist:dance2die/f7d63fb3456beff63103efa94b1671b8`

###### Results

`gist:dance2die/c1dcef1c836a1d7d601df711af8657e2`

The callback in [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) also has an access to current index being process. So the implementation for `skip` simply filters out records below the given `count` while `skipWhile` filters out records that do not match the predicate.

##### 🔸 Take/TakeWhile

`gist:dance2die/6c2ce82f63d7772a675dc0a3e073f136`

`gist:dance2die/84d3bb00fafdb1ced427fc349c4135d7`

###### Results

`gist:dance2die/5a50966c2239ff9a9c92d16127bc930c`

Take is the opposite of `skip` so the boolean conditions are reversed.

### 🔴 Closing Remark

JavaScript is dynamically typed so returning a "default" value is tricky as a variable type is defined upon initialization. I've skipped implementing "OrDefault" methods for that reason.

Please let me know should you find any errors or improvements I can make to the codes.

The full source code and instructions on how to run them are on GitHub.

- [C# source](https://github.com/dance2die/blog.LinqAndJavascript.CSharpDemo)
- [JavaScript source](https://github.com/dance2die/blog.LinqAndJavascript.JavascriptDemo)

