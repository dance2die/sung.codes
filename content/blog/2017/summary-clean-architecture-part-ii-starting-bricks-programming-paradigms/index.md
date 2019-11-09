---
title: 'Summary of Clean Architecture Part II '
Starting with the Bricks: Programming Paradigms"
date: '2017-11-05'
banner: ./images/featured-image.jpg
published_at: '2017-11-05T20:35:28.000Z'
tags: 'blogentry, bookreview, programming, book'
author: Sung M. Kim
---

After reading Clean Architecture, I've had a trouble understanding differences of each programming paradigm;

- [Structured Programming](https://en.wikipedia.org/wiki/Structured_programming) (SP)
- [Object-oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming) (OOP)
- [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming) (FP)

Let me share a summary of [ Clean Architecture](https://www.goodreads.com/book/show/18043011-clean-architecture) Part II, **Starting with the Bricks: Programming Paradigms**.

Firstly, what is,

### A Programming Paradigm?

It is a programming _**discipline**_, used to decide which form of programming structure (SP, OOP, FP) to use.

Each paradigm places a constraint on a programmer.

**NOTE**: "Paradigm" is pronounced as [par\-uh\-dahym](https://www.dictionary.com/browse/paradigm) **NOT** as [par-uh-dig-uhms](https://www.codingblocks.net/podcast/clean-architecture-programming-paradigms/).

### Disciplines imposed by each paradigm

- ##### Structured Programming
  > A direct transfer of control
  **Example**: `goto` statement is discouraged or removed.
  Instead of using a `goto` statement for an unconstrainted control flow, programmers are forced to use (now familiar) constructs such as `if/else`, `for/while` loops.
- ##### Object-oriented Programming
  > An indirect transfer of control
  **Example**: Function pointers are eliminated.
  OOP provides a plug-in architecture with a use of polymorphism. Polymorphism also enables a programmer to change the code dependencies with [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle).
- ##### Functional Programming
  > A variable assignment
  **Example**: Cannot assign a new value to a variable.

### What problem(s) each paradigm solves

- ##### Structured Programming
  > SP causes noodlers (preventing [spaghetti codes](https://en.wikipedia.org/wiki/Spaghetti_code)) to become an endangers species
  **How?**  By discouraging the use of goto and encouraging functional decomposition and use of data structures.
- ##### Object-oriented Programming
  > Complete control over code dependencies and flows.
  **How?** By using dependency inversion with the use of [polymorphism](<https://en.wikipedia.org/wiki/Polymorphism_(computer_science)>).
- ##### Functional Programming
  > All race/deadlock conditions, and concurrent update problems.
  **How?** Problems mentioned above are caused by variable mutation. FP prevents variable assignment, thus those problems can't occur.

### Programming Paradigm Use Cases

Initially, I thought about when to use each paradigm. When you consider a software architecture as a whole, it makes more sense to use each one appropriately.

So as an example, write low-level methods with SP principles, and separate immutable components (written with FP) from mutable components to mitigate resource contention and control flows with OOP.

### Surprises 🎉

1. Science theories and laws are not provable, only _falsifiable_.
2. [Encapsulation](https://en.wikipedia.org/wiki/Object-oriented_programming#Encapsulation), [Inheritance](https://en.wikipedia.org/wiki/Object-oriented_programming#Composition.2C_inheritance.2C_and_delegation), and [Polymorphism](https://en.wikipedia.org/wiki/Object-oriented_programming#Polymorphism) concepts are not introduced in OOP! - These concepts were available in C, but the usages were unsafe and OOP made it safer/easier to use.
3. Access modifiers, ` public``private ` and `protected` in OOP are just a _hack_ necessitated by technical reasons! - C header files hid member variables but C++ header files had to expose member variables because [C++ compilers have to know the size of the instances of each class](https://stackoverflow.com/questions/4341570/). Even worse, modern OOP languages such as C#/Java do not separate a class declaration from its implementation therefore, those modifiers are necessary evils.
4. In FP, variables do NOT vary!

### Conclusion

1. Each paradigm tells a programmer what NOT to do.
2. [Clean Architecture](https://www.goodreads.com/book/show/18043011-clean-architecture) is a book written by Robert C. Martin, aka Uncle "Bob".
3. [Coding Blocks](https://www.codingblocks.net/) guys talk about it in more detail in [Episode 69 – Clean Architecture – Programming Paradigms](https://www.codingblocks.net/podcast/clean-architecture-programming-paradigms/).

