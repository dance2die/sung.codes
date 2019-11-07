---
title: Union-Find Algorithm
date: '2017-05-13'
banner: ./images/Featured-Image-Union-St.-Street-Sign-in-Bodie.jpg
published_at: '2017-05-13T13:37:30.000Z'
tags: 'blogentry, programming, todayilearned, algorithm'
author: Sung M. Kim
---

 Featured Image - "[Union St. Street Sign in Bodie](https://www.flickr.com/photos/39908901@N06/14815502318/in/photolist-ozcjF9-nrKv69-a3tpyD-3fSBwq-a4wb5c-aLmjVz-pfSRLp-9qyvtR-myYQ7T-nA4G5s-ptfmGt-dh5bf2-gtf6dZ-db4Vqo-9YYbF1-a7d8AL-8FA6cF-freTSE-oLyZYY-coggGb-bT6Mkk-9QJjyk-2Si9ig-aNmeLa-7oSdMS-9yXosF-nGqW7x-cvdzP1-oRpHsX-dH3t8z-aou2qc-svQKHc-9kTby1-eeUcL8-83Fd5K-LFGHJ-4hdkBZ-aEvL7W-8PAyxv-iHZ35u-e8iHdf-agAMsy-9xsrSf-bji9xB-dd2kHq-ae26nH-wQRgYr-dfTsmM-dknx5Z-qHMjuV)" by [m01229](https://www.flickr.com/photos/39908901@N06/), used under [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/) (Medium sized image)

There is a really cool course on Coursera regarding [Union-Find](https://www.coursera.org/learn/algorithms-part1/supplement/aYr6R/overview). The course was quite refreshing because I was never exposed to this simple concept before.

I just wanted to share the link for those learning graph theory as I am.

Now comes the boring stuff (how I found out about it and what I did with it).

I ran into a problem solving a question, [Maximal Tourism](https://www.hackerrank.com/contests/rookierank-3/challenges/maximal-tourism) on HackerRank. The problem is about getting most connected node counts in a graph given sets of connected nodes per line.

It seemed like a very simple problem but I had trouble due to timeouts. I wanted to get some tips on how to solve the problem so I decided to check Discussion forum (I try to solve myself for hours or days before resorting to this usually).

[Mikhail](https://www.hackerrank.com/mikesmnx?hr_r=1)(@mikesmnx) posted a link to a Coursera course for those having a problem solving the problem. I was hesitant at first but decided to watch the video. After the first video in the course, I started digging it. After finishing the course, I screamed, "[I know Kung-Fu](https://youtu.be/6vMO3XmNXe4)".

Union-Find made me realize the flaw in my approach that I was just busy finding ways to build graphs. The better way was to caching or keeping track of connected nodes as I am building the graph. Using a tree structure never came into my mind during my attempts to solve it before watching the course.

Here is the C# version of Union-Find converted from Java (using Improved algorithm, which tracks sizes)

`gist:dance2die/27b1c7f81bbc459c4dd7f85892f4b84e`

I was able to solve the problem with this code without any timeouts. Learning a new algorithm will make your day as well!

The full source for the Maximal Tourism answer is posted on [GitHub](https://github.com/dance2die/Problems.HackerRank/blob/master/ProblemsHackerRank.Contests.HourRank17/RookieRank%203/MaximalTourism.cs).

### **Conclusion**

Check out Union-Find and see how you can integrate it into your existing code base.

You can find Union-Find algorithm applications in the [last video](https://www.coursera.org/learn/algorithms-part1/lecture/OLXM8/union-find-applications) in the course.

