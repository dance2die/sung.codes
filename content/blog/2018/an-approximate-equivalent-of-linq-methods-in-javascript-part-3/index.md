---
title: "How to Implement LINQ methods in JavaScript - Part 3"
date: "2018-03-11"
coverImage: "featured-image-1.jpg"
---

Photo by [Chris Lawton](https://unsplash.com/photos/o0l-M8W_7wA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/mapping?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

This is the 3rd part of the series. Here are the methods covered so far.

1. [Part 1](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/) 〰️ [Select](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#select), [Aggregate](https://www.slightedgemate-equivalent-linq-methods-javascript/#aggregate), [Where](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#where), OrderBy ([Ascending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByAscending), [Descending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByDescending))
2. [Part 2](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/) 〰️ [Any](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#any), [Distinct](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#distinct), [Concat](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#concat), [SelectMany](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#selectmany)
3. [**Part** 3](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/) 〰️ [Reverse](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#reverse), [Zip](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#zip), [Min/Max](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#minmax)
4. [Part 4](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/) 〰️ [Union](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#union), [Intersect](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#intersect), [Except](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#except)
5. [Part 5](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/) 〰️ [Sum](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#sum), [Average](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#average), [Count](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#count)
6. [Part 6](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/) 〰️ [First](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#first), [Last](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#last), [DefaultIfEmpty](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#defaultIfEmpty), [Skip](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#skip), [Take](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#take)
7. [Part 7](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7/) 〰️ [Empty](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#empty), [Repeat](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#repeat), [Range](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#range)
8. [Par](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)[t](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/) **[8](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)** 〰️ [All](#all), [Contains](#contains), [SequenceEqual](#sequenceEqual)

### 🔴 Overview

Here are the methods covered.

\[table id=3 /\]

And I will try to stick to using Vanilla JS as I have so far.

The sample collection used in this part is the same as all previous ones but I will list again.

###### C#

`gist:dance2die/91eccd44af4248a07ca031c7cb97c1d5`

###### JavaScript

`gist:dance2die/8ddcdfd02c4dc710d16cc71875a748c5`

OK, now let's dive into some examples 👍.

### 🔴 Examples

##### 🔸 Reverse

Ah yes. Yet again, there is another JavaScript method named same as in LINQ, [reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse). **⚡ NOTE ⚡**: Both in LINQ & JavaScript, reverse has a side effect; it alters current collection and doesn't return a new array.

`gist:dance2die/b1d35b898bb62f577854b10571fc81ee`

`gist:dance2die/30d8fa3f3c240c8cbafcf2c16ad2d161`

###### Results

`gist:dance2die/164aa4763dd5a74aacbcc50398cce795`

**Reverse** is different from [OrderByDescending](https://msdn.microsoft.com/en-us/library/bb534855(v=vs.110).aspx) that you don't specify which element to reverse with. It simply reverses the  current sequence in opposite order.

So to make the demo show how reverse works, I flipped first half and last half of the orders and reversed the list.

And now let's move onto the next example, [Zip](#zip), which is you might use seldom.

##### 🔸 Zip

There is no one-to-one equivalence in JavaScript but you can emulate one. Note that Lodash has [zipWith](https://lodash.com/docs/4.17.5#zipWith) method which works the same as the LINQ version (Maybe I will write LINQ -> Lodash equivalent methods as a next series 😉).

`gist:dance2die/346e92a6beaf551c8120652d6351d3e7`

`gist:dance2die/36a0b9f37a5d98d908b886522597972a`

###### Results

`gist:dance2die/fe2e148190c62aadca83e65d80f64540`

As [Zip](https://msdn.microsoft.com/en-us/library/dd267698(v=vs.110).aspx) returns one element from each collection in order, we can emulate the functionality in JavaScript with [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), which accepts a callback with an index. We can simply retrieve the matching second collection's item (`const text = orderNumbersInText[index]`) with the callback's index. Refer to a simpler case on this [StackOverflow answer](https://stackoverflow.com/questions/22015684/how-do-i-zip-two-arrays-in-javascript/22015771#22015771).

##### 🔸 Min/Max

Although Lodash has a similar methods, [minBy](https://lodash.com/docs/4.17.5#minBy) and [maxBy](https://lodash.com/docs/4.17.5#maxBy) that works the same way as LINQ, I will show you a way to implement it using [Math.min](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min) and [Math.max](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max). (I've combined two methods since both `min` and `max` are called the same way)

`gist:dance2die/4c00edfc21e4e6d1122fb37ae90eb26b`

`gist:dance2die/07ef47f94bac0fc2ffa5f2f4b416e95c`

###### Results

`gist:dance2die/1ffc1636e85a872de0078e35ccf182ee`

You can use "Math.min/max" functions to emulate LINQ versions of Min/Max.

Notice that spread syntax (`...orders`) is used within Math.min/max functions because those functions accept a list of values, not an array, So the array destructuring is required.

If you use "min/max" frequently or make it look just like the LINQ version, you can simply extend the Array prototype as shown below.

`gist:dance2die/dedfbb43f3b0b32820ac960b0b4a4533`

Now the it looks the same as the LINQ version.

### 🔴 Closing Remark

I've chosen some random LINQ methods this time but I will show you how to convert LINQ methods dealing with [set operations](https://en.wikipedia.org/wiki/Set_(mathematics)#Basic_operations) (union, intersect, etc) in JavaScript.

The full source code and instructions on how to run them are on GitHub.

- [C# source](https://github.com/dance2die/blog.LinqAndJavascript.CSharpDemo)
- [JavaScript source](https://github.com/dance2die/blog.LinqAndJavascript.JavascriptDemo)
