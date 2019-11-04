---
title: 'K closest points to the origin in C#'
date: '2018-11-14'
published_at: '2018-11-15T02:38:31.000Z'
tags: 'problemsolving, programming, selfnote, algorithm'
author: Sung M. Kim
---

_Photo by _[_Rick Mason_](https://unsplash.com/photos/2FaCKyEEtis?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/heap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

**_Self note on what I did/learned today..._**

Today I implemented "K closest points to the origin" problem in C#.

## Full Implementation

``gist:dance2die/d8d1e851c6e26236eefe90dfa93a8830``

<a href="https://gist.github.com/dance2die/d8d1e851c6e26236eefe90dfa93a8830">View this gist on GitHub</a>

## Explanation

This problem requires you to calculate distances of all points and find the points with smallest distances.

To keep a track of smallest distances, MaxHeap (not MinHeap as you might expect initially) is used to keep the first kth distances.

As you go thru the rest of points (after kth position), if the current point's distance is smaller than the value in the MaxHeap, then replace that max value with the current point in the MaxHeap.

Eventually, you will be left with points with smallest distances.

## k farthest points from the origin

One can also find the opposite using MinHeap instead of MaxHeap to find the farthest points from the origin.

## Thoughts...

I've initially implemented MinHeap then implemented MaxHeap from scratch. To solve this problem, I had to implement MaxHeap yet again but instead of holding a plain "int" value, I made it more generic and passed a comparer object.

Implementing "Heap" data structure really solidified the understanding thereof and when it can come in handy.

Max/MinHeap is very underused IMO.

## Resources

- Source code of [KClosePointsToOriginTest.cs](https://gist.github.com/dance2die/d8d1e851c6e26236eefe90dfa93a8830) on GitHub.
- [Amazon Coding Interview Question - K Closest Points to the Origin](https://www.youtube.com/watch?v=eaYX0Ee0Kcg)
- [Data Structures: Heaps](https://www.youtube.com/watch?v=t0Cq6tVNRBA) by [Gayle Laakmann McDowell](http://www.gayle.com/)

