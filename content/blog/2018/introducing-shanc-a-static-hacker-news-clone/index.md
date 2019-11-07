---
title: Introducing SHanC - A Static Hacker News Clone
date: '2018-05-26'
banner: ./images/featured-image-2.jpg
published_at: '2018-05-26T18:33:11.000Z'
tags: showdev
author: Sung M. Kim
---

I read [Hacker News](https://news.ycombinator.com/) (HN hereafter) daily. The way I read is that, I _**skim through**_ titles and open 5~10 stories and actually read 2~5.

Two problems I have with HN.

1. Each HN page shows 30 stories only and
2. having to click on "more" for a post-back seemed too much of a pain

_And I don't need real-time updates of the story._

So I created [SHaNc](http://shanc.netlify.com/), a Static page Hacker News clone.

I will only introduce you SHaNc in this article. Details on how it was built and problems faced while building it will be discussed in the next post.

### ❓ Why?

It solves two problems mentioned above.

1. Skimming through 30 pages at a time takes focus away
2. Loading next page with a post-back is slow

SHaNc loads all stories in one page (solves the first problem) and fast as it's a static page _and also learn [GatsbyJS](https://www.gatsbyjs.org/) & [Styled Components](https://www.styled-components.com/) along the way._

### 🤷 What?

SHaNc is a static page, which displays all stories (Best & New story pages planned), which solves both problems - loads all stories & fast (for being a static page).

A static page is by definition doesn't change. So the page is rebuilt every hour on the hour. _So you will probably be at most 1 hour behind._

### 🤔 How about other static HN clones? 😕

There are other two awesome static HN clones.

1. [Nuxt Hacker News](https://hn.nuxtjs.org/news)
2. [Hacker Next](https://next-news.now.sh/)

They are fast but I still had the problem of having to load next page manually, which takes your focus away.

### 🏭 Tech Stack & Architecture

Nothing fancy.

1. [GatsbyJS](https://www.gatsbyjs.org/) - a static site generator using [ReactJS](https://reactjs.org/)
2. [Styled Components](https://www.styled-components.com/) - CSS in JS
3. [Netlify](https://www.netlify.com/) - deployment & Build WebHook
4. [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) - triggering site build via Build WebHok every hour

Hand-drawn on a piece of paper 😝.

\[caption id="attachment\_1028" align="alignleft" width="1024"\]![architecture](./images/architecture.jpg) SHaNc architecture\[/caption\]

### 🏃‍♂️ Parting Words

If you have a similar HN reading style, I hope [SHaNc](https://shanc.netlify.com/) can help to address your problems.

Please leave a feedback, issues, suggestion on [GitHub page](https://github.com/dance2die/SHANc/issues) (MIT licensed).

