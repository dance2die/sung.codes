---
title: "How to Implement LINQ methods in JavaScript - Part 2"
date: "2018-03-04"
coverImage: "featured-image.jpg"
---

Photo by [Daniil Silantev](https://unsplash.com/photos/ioYwosPYC0U?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/mapping?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

In the [previous post](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/), I've covered most used LINQ methods and implemented them in JavaScript.

Here are the methods covered so far.

1. [Part 1](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/) 〰️ [Select](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#select), [Aggregate](https://www.slightedgemate-equivalent-linq-methods-javascript/#aggregate), [Where](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#where), OrderBy ([Ascending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByAscending), [Descending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByDescending))
2. [**Part** 2](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/) 〰️ [Any](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#any), [Distinct](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#distinct), [Concat](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#concat), [SelectMany](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#selectmany)
3. [Part 3](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/) 〰️ [Reverse](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#reverse), [Zip](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#zip), [Min/Max](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#minmax)
4. [Part 4](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/) 〰️ [Union](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#union), [Intersect](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#intersect), [Except](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#except)
5. [Part 5](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/) 〰️ [Sum](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#sum), [Average](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#average), [Count](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#count)
6. [Part 6](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/) 〰️ [First](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#first), [Last](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#last), [DefaultIfEmpty](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#defaultIfEmpty), [Skip](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#skip), [Take](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#take)
7. [Part 7](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7/) 〰️ [Empty](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#empty), [Repeat](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#repeat), [Range](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#range)
8. [Pa](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)[rt](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/) **[8](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)** 〰️ [All](#all), [Contains](#contains), [SequenceEqual](#sequenceEqual)

### 🔴 Overview

In this post, I will cover following methods.

\[table id=2 /\]

And I will try to stick to using [Vanilla JS](https://stackoverflow.com/questions/20435653/what-is-vanillajs).

The sample collection used in this part is the same as the previous one but I will list them again.

###### C#

gist:dance2die/91eccd44af4248a07ca031c7cb97c1d5

###### JavaScript

gist:dance2die/8ddcdfd02c4dc710d16cc71875a748c5

**⚡ NOTE ⚡** : In all of examples, `WriteLine` is used for printing result in console in both C# & JavaScript codes to make the code difference a bit easier to see.

In C#, it's statically imported as `using static System.Console`. In JavaScript, it's an alias of `console.log` declared as `const WriteLine = console.log`.

### 🔴 Examples

##### 🔸 Any

[some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) is equivalent to [Any](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.any(v=vs.110).aspx) in LINQ. They do the same thing and both LINQ & JavaScript might as well have an alias to both "some" and "any" as [TSQL does](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/some-any-transact-sql).

gist:dance2die/3e2e638f7c520ef91ef4b35b5e62b142

gist:dance2die/3dbc0bbddf1c096dd4b4ca69187787d2

###### Results

gist:dance2die/db8898560a8ba350b39495832dd02121

The only differences in JavaScript code are:

1. `some` is used instead of `Any`
2. `Year` is retrieved with a method call , `getFullyear()`

##### 🔸 Distinct

There are some equivalent methods in jQuery ([unique](https://api.jquery.com/jQuery.unique/)) or in Lodash ([uniqby](https://lodash.com/docs/4.17.5#uniqBy)) but I will show you two implementations in Vanilla JS.

gist:dance2die/faaecb5c7983a1d10d7baf34d9029193

gist:dance2die/d231f73111e8ba2ae50e0cf0d98ed563

###### Results

The results for all three methods are the same.

gist:dance2die/a68300269427c5c5407be7a09327a66d

`distinctDemo1` in JavaScript code uses `filter` to filter out records that does not show up as the first element in the list (Please refer to [this StackOverflow question](https://stackoverflow.com/a/14438954/4035) for more information for implementation details).

`distinctDemo2` uses a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object (sets by definition stores only unique values and is available from ES6) to store unique values in it, and uses a spread syntax to convert the `Set` object instance to an array (You could use another new ES6 addition, [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) if you think it's not readable enough, as shown below).

gist:dance2die/815fe01e43ab0bc048f341d150475330

##### 🔸 Concat

Thankfully 🙏, JavaScript has a method named [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat), which does what LINQ version does. ⚠️ WARNING: Beware of super contrived example used in this demo.

gist:dance2die/99bdf777a871ab15046dd58197863aba

gist:dance2die/ba57bf94913338798cc4769647efc021

###### Results

gist:dance2die/9a7be90fb858994df776e047edb7a46c

Syntax is exactly the same 😄(except capitalization), so moving right along to the next example⤵️, [SelectMany](#selectmany).

##### 🔸 SelectMany

This example does exactly the same thing (and just as contrived) as [Concat](#concat) does but wanted to share a different way you can implement it in JavaScript.

gist:dance2die/0250f31df2bc300ae0aea6cb4e6cfdb1

gist:dance2die/c75ae463ad1f7b2fa0eee1f39d813e85

###### Results

As you can see, the result is exactly the same as the one in [Concat](#concat) demo.

gist:dance2die/ff83b11a362f9e11a278cf55b903f11b

`SelectMany` basically flattens multiple collections into a single one, while `Spread syntax` in ES6 is used to flatten all arrays into a single one.

### 🔴 Closing Remark

I have selected frequently used LINQ methods (at least for me that is) and shown you the JavaScript implementations. I hope you found the mapping between LINQ to JavaScript code useful. Please let me know should you find any errors or improvements I can make to the codes.

The full source code and instructions on how to run them are on GitHub. (Same as the [first part](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/) as demos are added onto existing source code)

- [C# source](https://github.com/dance2die/blog.LinqAndJavascript.CSharpDemo)
- [JavaScript source](https://github.com/dance2die/blog.LinqAndJavascript.JavascriptDemo)
