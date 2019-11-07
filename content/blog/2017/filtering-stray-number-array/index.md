---
title: Filtering out a stray number in an array
date: '2017-10-07'
banner: ./images/Featured-Image-TransmissionCmosXORGate.jpg
published_at: '2017-10-07T19:11:33.000Z'
tags: 'javascript, csharp'
author: Sung M. Kim
---

I solved a [CodeWars](https://www.codewars.com) (programming challenge site) question and compared my answer to other solutions.

I was introduced to a different way of solving a question with a boolean operation.

Be prepared to be blown away.

**SPOILER ALERT!**: Answers are shown below so proceed at your own discretion (or try to solve the [question](https://www.codewars.com/kata/57f609022f4d534f05000024/) yourself first before proceeding to compare your answer)

### Question Detail

The question, [Find the stray number](https://www.codewars.com/kata/57f609022f4d534f05000024/), requires you to find a number in an odd-length array of numbers. There is only one element with length one.

As an example, suppose that there is an array, `int[] a = {1, 1, 2, 2, 3}` and the stray number is `3` because `1` and `2` have an even length.

### Typical Implementation

One would usually approach the problem by counting number of each element and find the one with odd count.

Here is my implementation submitted on CodeWars.

`gist:dance2die/c50e88d09b7782b974f9f6e1bbdc0d87`

The code above gets a count of each element(`GroupBy` then `Select`) and returns an item with an odd number of counts (`o.Count % 2 == 1`).

When your answer is accepted on CodeWars, you can see solutions posted by others.

Then I spotted a one-liner using a XOR (Exclusive OR) bitwise operation by [Unnamed](https://www.codewars.com/users/Unnamed) (that's a user ID).

`gist:dance2die/886360849deeebb4664a3b982a7e5f80`

Note that,

- `.Aggregate` in C# is to  [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=a) in Javascript as
- `.Select` is to  [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### How does that work?

If you have been programming, you might have seldom used XOR. But to recap, XOR returns true if two inputs being compared are different ([Wikipedia](https://en.wikipedia.org/wiki/Exclusive_or)).

So for an even number of elements, they will all come out as 0 (false) and be left with the value of one element (true).

To visualize what's going on, I created a [simple program](https://github.com/dance2die/Blog.FindTheStrayNumber/blob/master/FindTheStrayNumber/Program.cs) below.

`gist:dance2die/8a9bc2ba9fa1c2e265b3e7b9a91e5412`

It's just an iterative version of the one-liner answer by Unnamed.

So for two arrays, `a1` & `a2` above, `n1` would print 2 and `n2`, 3.

I've added `WriteLine` to show what is going on more visually.

`gist:dance2die/01a645b87df47fb3c53f8fba728d93c3`

**Note**: Numbers in parenthesis are binary representations.

As you can see, even number elements are canceling each other out and what's left is the stray number.

XOR trick work for an odd-length array where all other elements have even length and there is only one stray number.

E.g.) For an array "int\[\] a = {1, 1, 2, 2, 3}", `Stray(a)` would return 3.

### Conclusion

I hope you were surprised if you had solved the question before proceeding. It's just surprising how a simple boolean operation can be used to solve a seemingly unrelated problem.

But be aware that the one-liner was clever but it might cause too much cognitive load thus might not be readable.

**P.S.**

Would you share any other use cases that you have found for XOR or boolean/bitwise operations?

