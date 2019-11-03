---
title: "How to Implement LINQ methods in JavaScript - Part 4"
date: "2018-03-22"
coverImage: "featured-image-2.jpg"
---

Photo by [Chris Lawton](https://unsplash.com/photos/yRf7ABVDddM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/mapping?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) This is the 4th part of the series and I will cover common [Set operations](https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php) in this article.

Here are the methods covered so far.

1. [Part 1](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/) 〰️ [Select](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#select), [Aggregate](https://www.slightedgemate-equivalent-linq-methods-javascript/#aggregate), [Where](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#where), OrderBy ([Ascending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByAscending), [Descending](https://www.slightedgecoder.com/2018/02/24/approximate-equivalent-linq-methods-javascript/#orderByDescending))
2. [Part 2](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/) 〰️ [Any](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#any), [Distinct](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#distinct), [Concat](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#concat), [SelectMany](https://www.slightedgecoder.com/2018/03/03/approximate-equivalent-linq-methods-javascript-part-2/#selectmany)
3. [Part 3](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/) 〰️ [Reverse](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#reverse), [Zip](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#zip), [Min/Max](https://www.slightedgecoder.com/2018/03/10/an-approximate-equivalent-of-linq-methods-in-javascript-part-3/#minmax)
4. [**Part** 4](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/) 〰️ [Union](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#union), [Intersect](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#intersect), [Except](https://www.slightedgecoder.com/2018/03/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-4/#except)
5. [Part 5](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/) 〰️ [Sum](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#sum), [Average](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#average), [Count](https://www.slightedgecoder.com/2018/03/31/an-approximate-equivalent-of-linq-methods-in-javascript-part-5/#count)
6. [Part 6](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/) 〰️ [First](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#first), [Last](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#last), [DefaultIfEmpty](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#defaultIfEmpty), [Skip](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#skip), [Take](https://www.slightedgecoder.com/2018/04/14/an-approximate-equivalent-of-linq-methods-in-javascript-part-6/#take)
7. [Part 7](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7/) 〰️ [Empty](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#empty), [Repeat](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#repeat), [Range](https://www.slightedgecoder.com/2018/04/21/an-approximate-equivalent-of-linq-methods-in-javascript-part-7#range)
8. [Par](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)[t](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/) **[8](https://www.slightedgecoder.com/2018/04/28/how-to-implement-linq-methods-in-javascript-part-8/)** 〰️ [All](#all), [Contains](#contains), [SequenceEqual](#sequenceEqual)

### 🔴 Overview

Here are the methods covered. [table id=4 /] There is no one-to-one equivalent in JavaScript, so I added [Lodash](https://lodash.com/docs) equivalents in the table this time. For production codes, use Lodash as their implementation is thoroughly battle-tested.

The sample collections used in this part are shown as below. (`Orders` is same as last 3 series and I added `DomesticOrders` and `InternationalOrders` for examples this time)

###### C

`gist:dance2die/970ab56eb3e4f8bafdbb8c7efd87ab66`

###### JavaScript

`gist:dance2die/df3097d46a30783bcd5948384137f4c8`

### 🔴 Examples

##### 🔸 Union

[Union](<https://msdn.microsoft.com/en-us/library/system.linq.enumerable.union(v=vs.110).aspx>) combines two sequences (of type [`IEnumerable<T>`](<https://msdn.microsoft.com/en-us/library/9eekhta0(v=vs.110).aspx>)) into one without duplicates.

`gist:dance2die/9bbfd498df8aff4386c2ef90eb9b476b`

`gist:dance2die/c314cca86619171bdd1f9c43f73ed4ff`

###### Results

`gist:dance2die/5c9fd4d6b744e1456c431474d4d8b0f5`

I've extended the Array prototype to make the JavaScript version look similar to the LINQ version. 📝**NOTE**: "Union" in Lodash is named [\_.union](https://lodash.com/docs/4.17.5#union).

##### 🔸 Intersect

"Intersect" compares two sequences and return another sequence with a "common" value.

How do you check for the "commonness"? [Intersect](<https://msdn.microsoft.com/en-us/library/system.linq.enumerable.intersect(v=vs.110).aspx>) in LINQ provides an overload that lets you specify how to compare each value in two sequences by passing an object of type implementing [`IEqualityComparer<T>`](<https://msdn.microsoft.com/en-us/library/ms132151(v=vs.110).aspx>) interface.

`gist:dance2die/8391d61650a16a3c9c25800e305ac6e6`

`gist:dance2die/ace99d382339e96a75da8ac08dea8df9`

###### Results

`gist:dance2die/a6db6ac8f6a8976e180d1d905fb4a19e`

Our contrived `order` array contains objects with a property called `id` so I passed a callback (`idSelector`) to let `Array.prototype.intersect` to use it to make a comparison for each value in two sequences.

📝**NOTE**: While [Intersect](<https://msdn.microsoft.com/en-us/library/system.linq.enumerable.intersect(v=vs.110).aspx>) in LINQ is similar to [\_.intersectionWith](https://lodash.com/docs/4.17.5#intersectionWith) in Lodash, JavaScript version is roughly equivalent to \_.[intersectionBy](https://lodash.com/docs/4.17.5#intersectionBy).

##### 🔸 Except (Difference)

"Except" compares two sequences and return a new sequence with values that exists in the caller but not in the compared.

`gist:dance2die/00b325ab6c05f3fb40f4085720c177fb`

`gist:dance2die/ee35c21462154dfaa9881bf81934c5d1`

###### Results

`gist:dance2die/61816659a4be8fd961b86c2dfdccaf78`

The implementation of `Array.prototype.except` is almost same as [intersect](#intersect).

The only difference between `Array.prototype.intersect` and `Array.prototype.except` is whether to include the record in the other set or not.

Take a close look at callback in `filter` method.

`gist:dance2die/b0d97fd31fd6eb533e9e9b81812944f5`

📝**NOTE**: While [Except](<https://msdn.microsoft.com/en-us/library/system.linq.enumerable.except(v=vs.110).aspx>) in LINQ is similar to[ \_.differenceWith](https://lodash.com/docs/4.17.5#differenceWith) in Lodash, JavaScript version is roughly equivalent to [\_.differenceBy](https://lodash.com/docs/4.17.5#differenceBy).

### 🔴 Closing Remark

"Union", "Intersect", and "Except" are the most common Set operations. I hope this article helped you understand how to implement Set operations in JavaScript.

JavaScript implementations in the examples above are not production ready as it's not optimized/tested. So as I mentioned before, use Lodash for Set operations in JavaScript.

Any feedback or error reports are always welcome.

The full source code and instructions on how to run them are on GitHub.

- [C# source](https://github.com/dance2die/blog.LinqAndJavascript.CSharpDemo)
- [JavaScript source](https://github.com/dance2die/blog.LinqAndJavascript.JavascriptDemo)
