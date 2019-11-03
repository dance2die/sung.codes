---
title: "How to Implement LINQ methods in JavaScript - Part 1"
date: "2018-02-25"
coverImage: "featured-image-600x400.jpg"
---

Photo by [Simon Migaj](https://unsplash.com/photos/sa7KClvDBpo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/map?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) LINQ has been around [since 2007](https://msdn.microsoft.com/en-us/library/bb308959.aspx?f=255&MSPPError=-2147217396). It made the code more readable as you specify what you do with a collection not how to process it.JavaScript is the de facto standard so you should be working with it often if you are doing web development.

I will share some "approximate" JavaScript equivalents below for those working primarily with .NET but want to use the existing skill in JavaScript.

_Since each method do not match exactly one to one functionality wise, I will drop "approximate" hereafter._

Here are the methods covered so far.

1. [**Part** 1](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/) 〰️ [Select](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#select), [Aggregate](https://www.slightedgemate-equivalent-linq-methods-javascript/#aggregate), [Where](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#where), OrderBy ([Ascending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByAscending), [Descending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByDescending))
2. [Part 2](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/) 〰️ [Any](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#any), [Distinct](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#distinct), [Concat](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#concat), [SelectMany](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#selectmany)
3. [Part 3](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/) 〰️ [Reverse](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#reverse), [Zip](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#zip), [Min/Max](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#minmax)
4. [Part 4](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/) 〰️ [Union](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#union), [Intersect](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#intersect), [Except](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#except)
5. [Part 5](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/) 〰️ [Sum](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#sum), [Average](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#average), [Count](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#count)
6. [Part 6](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/) 〰️ [First](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#first), [Last](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#last), [DefaultIfEmpty](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#defaultIfEmpty), [Skip](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#skip), [Take](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#take)
7. [Part 7](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7/) 〰️ [Empty](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#empty), [Repeat](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#repeat), [Range](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#range)
8. [Par](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)[t](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/) **[8](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)** 〰️ [All](#all), [Contains](#contains), [SequenceEqual](#sequenceEqual)

### 🔴 Overview

Here are the examples I will show you in this article. [table id=1]

I tried to match the code look similar to each other (as you can see the full source codes in [LINQ](https://github.com/dance2die/blog.LinqAndJavascript.CSharpDemo/blob/master/Program.cs) & [JavaScript](https://github.com/dance2die/blog.LinqAndJavascript.JavascriptDemo/blob/master/index.js) on GitHub).

Here are the sample collections I will use to demo each method.

###### CSharp

gist:dance2die/91eccd44af4248a07ca031c7cb97c1d5

###### JavaScript

gist:dance2die/8ddcdfd02c4dc710d16cc71875a748c5

### 🔴 Examples

##### 🔸 Select

`map` is the equivalent of `Select`.

gist:dance2die/8da7e590187ff210510519b1f1f937d2

gist:dance2die/163b8cf88f85a62c08372f7783d7b18f

Syntax-wise, it's basically one-to-one replacement from `Select` to `map`. I said "equivalent" but I lied. While `map` returns a new array, `Select` has a side effect (it can update the iterating collection). Just remember this difference for the rest of JavaScript methods.

Results of calling `SelectDemo` and `mapDemo`.

gist:dance2die/34f32390c65c0852575315a65bba8ad3

##### 🔸 Aggregate

`reduce` works the same way `Aggregate` does.

gist:dance2die/6dfb6a38bc0faaa74f0f29c3cb09570e

gist:dance2die/741d1c59e2c3aecbb8a3346b1d9a3f48

**⚡ NOTE ⚡**: While the initial value for the accumulator is passed as a first argument in `Aggregate`, it's passed as the last one in `reduce`.

Results of calling `AggregateDemo` and `reduceDemo`.

gist:dance2die/52273094e42444491749169afa7e6555

##### 🔸  Where

As you might have guessed it 😉, `Where` is for _filtering_ records in a collection.  So the equivalent is..., 🎉 `filter`.

gist:dance2die/80fa116898f3f57857551f96bd116eef

gist:dance2die/61d8ab6a503e7b26be4a83524fc1c238

Another drop-in replacement of `filter` for `Where`. The code so far looked the same thanks to the Lamda expression syntax in both C# & JavaScript (ES6).

Results of calling `WhereDemo` and `filterDemo`.

gist:dance2die/145a586dc68343e7c1694e7577130a50

##### 🔸 OrderBy

Now here is where it gets tricky.

While there are two methods for ordering (ascending/descending) in LINQ, there is only one method in Javascript, `sort`, which can handle both scenarios.

`sort` is more roughly equivalent to .NET's [Array.Sort](https://msdn.microsoft.com/en-us/library/bzw8611x%28v=vs.110%29.aspx?f=255&MSPPError=-2147217396) method which accepts an object instance of type [IComparer<T>](<https://msdn.microsoft.com/en-us/library/8ehhxeaf(v=vs.110).aspx>), which works the same as a callback in `sort`.

In the examples below, if the callback, which requires two arguments, returns a value less than 0, then the left value comes before right value, and vice versa. For 0, the order is not changed.

That's why you can emulate `OrderBy` and `OrderByDescending` with only `sort`.

###### 1. Ascending Order

gist:dance2die/e2d987d315f9c1ad954a30eab61beafc

gist:dance2die/adc7daccc0b290e238de5f254a7bcd8b

In `sortByAscendingDemo`, if `o1.quantity - o2.quantity` returns a negative value, then `o1` comes before `o2` and vice versa. If quantity in both objects are equal (the difference is 0) then the order is not changed.

Results of calling `OrderByDemo` and `sortByAscendingDemo`.

gist:dance2die/3eb8c296149fc6107226248b2fd49caf

###### 2. Descending Order

gist:dance2die/90f8485e2a88d682bc695a87279ab8bb

gist:dance2die/66b66906596ca7151778c7628391ceba

In this JavaScript function, `sortByDescendingDemo`, two objects are switched from `sortByAscendingDemo`. To emulate the descending order, we simply switch `o1` and `o2`, which will negate the return values from the callback.

Result of `OrderByDescendingDemo` and `sortByDescendingDemo`.

gist:dance2die/363d8cd1c5f24a0161c4173f1da6be6f

### 🔴 Closing Remark

In this article, I've shown examples of each LINQ method (approximate) equivalents in JavaScript.

Please feel free to leave a feedback on errors you might have spotted 😎.

The full source code and instructions on how to run them are on GitHub.

- [C# source](https://github.com/dance2die/blog.LinqAndJavascript.CSharpDemo)
- [JavaScript source](https://github.com/dance2die/blog.LinqAndJavascript.JavascriptDemo)
