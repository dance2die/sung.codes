---
title: "Eliminating a Switch statement"
date: "2017-10-28"
coverImage: "featured-image-2.jpg"
---

I was solving [Make the Deadfish Swim](https://www.codewars.com/kata/make-the-deadfish-swim/) on [CodeWars](https://www.codewars.com), which seemed to require many if or switch (conditional) statements.

I was impressed with two Functional Programming in Javascript articles ([Rethinking JavaScript: The if statement](https://hackernoon.com/rethinking-javascript-the-if-statement-b158a61cd6cb) & [Rethinking JavaScript: Eliminate the switch statement for better code](https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d)), by [Joel Thoms](https://hackernoon.com/@joelthoms) so I wanted to give it a try without conditional statements.

What was involved to solve the question without `switch`?

### TL;DR

> Use a dictionary & a lambda expression

### Question?

[Make the Deadfish Swim](https://www.codewars.com/kata/make-the-deadfish-swim/) is about parsing a string of commands and perform operations on an initial value of 0.

> Write a simple parser that will parse and run Deadfish. Deadfish has 4 commands, each 1 character long. 'i' will increment the value ( initially 0 ). 'd' will decrement the value. 's' will square the value. 'o' will output the value into the return array.

 

> Invalid characters should be ignored.
> 
> `Deadfish.Parse("iiisdoso") => new int[] {8, 64};`

At a glance, a simple `ifs` or a  `switch` would be required to solve it.

Let's implement it using a `switch` statement.

### "With" Switch

gist:dance2die/638139dd386ec7a3b806327aa470911a

Iterative version **matches** against each command and performs **operations**.

`cmd` is a character in `data`, which is `"iiisdoso"` in the question.

The code **iterates** each command and operate on the `sum`.

### How do we get rid of the switch statement?

We want to rid `switch` and there are two aspects to consider.

1. What'd be a good **Data Structure** (DS) for **matching** and getting a value?
2. How do  **operate** on a value?

For the first question, a hashtable/dictionary is a good fit because the time complexity for a key lookup is `O(1)`.

For the latter, [a lambda/anonymous function](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions) would do the job. (I am using C#, which provides [Func<T, TResult>](https://msdn.microsoft.com/en-us/library/bb549151(v=vs.110).aspx)).

We all the pieces in place, let's look at the version without the `switch` statement.

### "Without" Switch

gist:dance2die/067a741bca0d2bce5024567e05eb8e2a

The first thing I did was to create a [dictionary](https://msdn.microsoft.com/en-us/library/xfhwa508(v=vs.110).aspx), `commands` for a fast lookup.

And for the operation (values of `commands`), a lambda expression (which accepts an integer and returns an integer) is used.

`data` operates on each character (command) and operates on the `value`using [**Select**](https://msdn.microsoft.com/en-us/library/bb548891(v=vs.110).aspx) LINQ statement.

### Why?

First of all, why would I want to eliminate `switch`?

Instead of instructing **how** a problem needs to be solved, FP requires you to think in terms of **what** to solve.

I could've gone the whole nine yards and used a [Command Design Pattern](https://en.wikipedia.org/wiki/Command_pattern) but it seemed like Object Oriented Programming trying to emulate Functional Programming (FP).

And also the problem is small enough to dabble with FP.

### Parting Words

I am just getting started with FP way of writing programs in C# and started using LINQ heavily.

Still wrapping my head around on FP so I'd appreciate it if you can provide me pointers on how to go further with FP.

The source code is available on [GitHub](https://github.com/dance2die/Demo.LearnByDoing/blob/master/Demo.LearnByDoing.Tests/CodeWars/Kyu6/MakeTheDeadFishSwimTest.cs).
