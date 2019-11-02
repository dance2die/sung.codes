---
title: "How to Implement LINQ methods in JavaScript - Part 5"
date: "2018-03-31"
coverImage: "featured-image-4.jpg"
---

Photo by [Jonas Vincent](https://unsplash.com/photos/xulIYVIbYIc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/high-five?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

I will cover common number aggregate methods in this article.

Here are the methods covered so far.

1. [Part 1](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/) 〰️ [Select](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#select), [Aggregate](https://www.slightedgemate-equivalent-linq-methods-javascript/#aggregate), [Where](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#where), OrderBy ([Ascending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByAscending), [Descending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByDescending))
2. [Part 2](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/) 〰️ [Any](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#any), [Distinct](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#distinct), [Concat](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#concat), [SelectMany](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#selectmany)
3. [Part 3](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/) 〰️ [Reverse](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#reverse), [Zip](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#zip), [Min/Max](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#minmax)
4. [Part 4](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/) 〰️ [Union](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#union), [Intersect](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#intersect), [Except](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#except)
5. [**Part** 5](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/) 〰️ [Sum](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#sum), [Average](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#average), [Count](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#count)
6. [Part 6](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/) 〰️ [First](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#first), [Last](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#last), [DefaultIfEmpty](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#defaultIfEmpty), [Skip](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#skip), [Take](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#take)
7. [Part 7](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7/) 〰️ [Empty](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#empty), [Repeat](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#repeat), [Range](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#range)
8. [Par](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)[t](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/) **[8](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)** 〰️ [All](#all), [Contains](#contains), [SequenceEqual](#sequenceEqual)

I've covered "min" and "max" in [part 3](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#minmax) so I won't cover them again here.

### 🔴 Overview

In this article, I will cover following methods.

\[table id=5 /\]

And I will try to stick to using VanillaJS as I have so far.

The sample collections used in this article.

###### C#

https://gist.github.com/dance2die/91eccd44af4248a07ca031c7cb97c1d5

###### JavaScript

https://gist.github.com/dance2die/8ddcdfd02c4dc710d16cc71875a748c5

### 🔴 Examples

##### 🔸 Sum

I will show you "Sum" demo first since "Average" is basically a sum divided by count.

https://gist.github.com/dance2die/6a39ea12bc4253c0eda08f456162650b

https://gist.github.com/dance2die/10f4e530b7cc145d84c9efa5cf4f2134

###### Results

https://gist.github.com/dance2die/8257620ec4b39b0fc4ad8de1c6b50717

`Array.prototype.sum` simply reduces each order quantity by summing it in the callback. Note 📝: It's exactly the same as the [reduceDemo](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#aggregate).

##### 🔸 Average

Now let's get an average quantity ordered.

https://gist.github.com/dance2die/3a50fa4e91997ac7518f2a55f0332992

https://gist.github.com/dance2die/0013a7255e993ac11914e663799fd8c8

###### Results

https://gist.github.com/dance2die/8d5c5e20e7a453004eda71053bbd1bba

The only difference here is that sum is divided by the order count to calculate an average.

##### 🔸 Count

Count is overloaded in LINQ; [One](https://msdn.microsoft.com/en-us/library/bb338038(v=vs.110).aspx) that simply returns a number of element in a sequence, and [the other](https://msdn.microsoft.com/en-us/library/bb535181(v=vs.110).aspx) that accepts a predicate which lets you test each item.

I will implement the one with the predicate as the former is too simple.

https://gist.github.com/dance2die/e625943d0df70bfcf2248edbd220e187

https://gist.github.com/dance2die/a33e3a0fbad62840fdba9ad70260aef1

###### Results

https://gist.github.com/dance2die/8910c67f5533f20b747f191ae34e0793

The demo counts number of orders placed on and after March of 2018. Count without a predicate is same as `array.length` but `filter` is required for testing each element in an array.

### 🔴 Closing Remark

[Sum](#sum), [Average](#average), and [Count](#count) are often used and easy to implement (using for/each loops). I used reduce and filter to implement to make it look as similar to LINQ methods.

As always, I've not tested edge cases for Array prototypes so use the code at your own risk 😃. Please let me know should you find any errors or improvements I can make to the codes.

The full source code and instructions on how to run them are on GitHub.

- [C# source](https://github.com/dance2die/blog.LinqAndJavascript.CSharpDemo)
- [JavaScript source](https://github.com/dance2die/blog.LinqAndJavascript.JavascriptDemo)
