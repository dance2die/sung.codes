---
title: "Technology Stack Rundown of SHaNc"
date: "2018-06-02"
coverImage: "featured-image.jpg"
---

In the [previous article](https://www.slightedgecoder.com/2018/05/26/introducing-shanc-a-static-hacker-news-clone/), I introduced [SHaNc](http://shanc.netlify.com/), a Static Hacker News clone. I will go into details of tech stack I used and why.

I will talk about following technologies used.

1. [GatsbyJS](https://www.gatsbyjs.org/)
2. [Styled Components](https://www.styled-components.com/)
3. [Netlify](https://www.netlify.com/)
4. [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)

### 🏭 Architecture - Reprise

Here is a the recap of the architecture in the previous article.

\[caption id="attachment\_1028" align="aligncenter" width="1024"\]![architecture](https://www.slightedgecoder.com/wp-content/uploads/2018/05/architecture.jpg) SHaNc architecture\[/caption\]

Gatsby is used to generate a static page, which is then deployed to Netlify. And Azure Function causes Netlify to rebuild the static page via build webhook.

I will go over each component one by one below.

### 📜 GatsbyJS

##### What❓

It's a static site generator using ReactJS (React hereafter) as UI template engine.

##### Why? 🤔

There are many static site generators out there, I picked it for two reasons.

1. My familiarity with React - It helped me create a MVP ([Minimum Viable Product](https://en.wikipedia.org/wiki/Minimum_viable_product))  fast
2. Easy to get started with great [documentations](https://www.gatsbyjs.org/docs/)

##### How? 🔨

Gatsby fetches Hacker News data via a publicly available [Hacker News API](https://github.com/HackerNews/API) (HN API hereafter) then merges it with React template to create a single HTML file.

##### Challenge 🤔

Gatsby can fetch external data only via [GraphQL](https://graphql.org/) data source (Reference [Querying Data with GraphQL](https://www.gatsbyjs.org/docs/querying-with-graphql/)). I wanted to use [Ryan Florence](https://twitter.com/ryanflorence/)'s [gatsby-source-firebase](https://github.com/ryanflorence/gatsby-source-firebase) as HN API hosted on Firebase.

Ryan's plugin required Firebase credential to be passed but HN API is public thus required no credential. Due to a default GitHub license issue, I could not fork, update, & publish my own plugin.

So the next option was to create a [custom GraphQL data source](https://github.com/dance2die/SHANc/blob/master/gatsby-node.js), which exposes fetched HN data. _(I will go into more details on how it was implemented in a later blog post)_

### 📜 Styled Components

##### What❓

It's a React library that lets you embed CSS in React ([Styled Components Home](https://www.styled-components.com/)).

##### Why? 🤔

I started using it out of a curiosity.

But then I realized that it made creating simple stylized React component with ease with familiar CSS syntax (React requires slightly different syntax, `className` for `class` attribute, and need to camelize CSS styles with `-`; `lineHeight` instead of `line-height`).

Another benefit I found is that I could name the container making the code readable (instead of using generic "div" or "span") and intentional.

You can see that `storiesComponents` is consisted of a story with rank, content, which contains body and meta data.

https://gist.github.com/dance2die/56d863a786182fc7a853084d5005a159

##### How? 🔨

As mentioned in "Why?", I used it to apply styles without an external CSS file keeping each component self-contained (but less flexible as I didn't use [theming functionality](https://www.styled-components.com/docs/advanced#theming)).

##### Why Not? 😤

CSS in JS is very controversial so I won't go into much details. But you could read up on [CSS in JS](https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc), and make your own decision 😉

### 📜 Netlify

##### What❓

[Netlify](https://www.netlify.com/) is a web site hosting company, which makes deploying from GitHub very easy (& 😀 free 💰).

##### Why? 🤔

I used it because Netlify's [Build WebHook](https://www.netlify.com/docs/webhooks/#incoming-webhooks) is more accessible than [GitHub WebHook](https://developer.github.com/webhooks/). It was a matter of making a simple HTTPS POST request for Netlify while GitHub required many other steps

##### How? 🔨

I deployed GitHub repo using similar steps I blogged about. _(Refer to my previous post [Deploying Existing Create-React-App on GitHub to Netlify](https://www.slightedgecoder.com/2017/12/09/deploying-existing-create-react-app-github-netlify/))_

Netlify is aware that a project is a Gatsby site thus filling out many values for you (what command to run and what folder to deploy to production)

And also publishing to a master branch (you can set it to another branch) continuously deploys to production as Netlify creates a webhook on GitHub and runs the build automatically.

### 📜 Azure Functions

##### What❓

It's sorta like a Web API you can invoke without requiring a server.

Here is an analogy I heard from somewhere (I think it was [Scott Hanselman](https://twitter.com/shanselman) in one of the Azure related podcasts).

> Building your own server to get something work done - is like "building your own car" to get to one point to another - You pay for car parts (server parts) and build costs Deploying your site to a cloud - is like "buying a car" (a server) - and you are responsible for maintaining it Calling/invoking Azure Functions - is like "renting a car" as you don't take care of the car (server) yourself. - You just want to go from one place to another (the purpose is to get a piece of work done without requiring a server).

#####  Why? 🤔

[AWS Lambda](https://aws.amazon.com/lambda/) was pain in the butt as I just needed a simple job that runs every hour without much security concern.

##### How? 🔨

It runs every hour doing a HTTPS POST request to the Netlify's Build WebHook (Using an experimental PowerShell version of Azure Functions).

Full implementation (I mean really)

https://gist.github.com/dance2die/970999b7fb5ba0e62001766ce55af9f7

Azure Functions Schedule (runs every 60 minutes on the hour)

https://gist.github.com/dance2die/b6d16c2b10cfbb7a635a02485dd6108c

### 👋 Parting Words

In this article, I've shown you tech stack used to build [SHaNc](http://shanc.netlify.com/). Most of the decisions are based on familiarity and ease of use.

In following posts, I will go more into details _(e.g. How to implement a custom GraphQL data source for GatsbyJS)._

Leave a feedback on [GitHub](https://github.com/dance2die/SHANc/issues).

Say hi on Twitter [@SlightEdgeCoder](https://twitter.com/slightedgecoder).
