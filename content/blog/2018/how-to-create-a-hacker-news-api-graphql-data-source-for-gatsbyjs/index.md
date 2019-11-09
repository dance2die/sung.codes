---
title: How to create a Hacker News API GraphQL data source for GatsbyJS
date: '2018-06-16'
banner: ./images/featured-image-1.jpg
published_at: '2018-06-16T18:20:50.000Z'
tags: 'gatsby, webdev, javascript'
author: Sung M. Kim
---

In the [previous post](https://www.slightedgecoder.com/2018/06/02/technology-stack-rundown-of-shanc/), I introduced a tech stack for [SHaNc](https://shanc.netlify.com/).

I will go into more details on how to create a Hacker News [GraphQL](https://graphql.org/) data source for [GatsbyJS](https://www.gatsbyjs.org/).

## ❓ Why?

Because GatsbyJS can query data only via GraphQL endpoints. _Refer to [Querying with GraphQL](https://www.gatsbyjs.org/docs/querying-with-graphql/)._

## 🤔 Assumption

I will assume that you are familiar with JavaScript [promises](https://developers.google.com/web/fundamentals/primers/promises), and [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).

##  💭 Terminologies & Concepts

Let's make sure we are on the same page.

1. [GraphQL Source](https://www.gatsbyjs.org/docs/create-source-plugin/) - This is the data that GatsbyJS can query via GraphQL.
2. **Node** - A node is called a "model" (according to documentation), which is a shape of how the data looks (Not Node.JS).
3. **gatsby-node.js** - This is where you define your GraphQL sources and it's located in the project root.

Now we've cleared some terms and concepts, let's' review Hacker News API.

##  🔍 Hacker News API Overview

The Official [Hacker News API](https://github.com/HackerNews/API) ("HN API" hereafter) exposes top level endpoints for "Top", "Best", and "New" stories.

Top level endpoints returns only IDs with no other data associated with it.

Calling "https://hacker-news.firebaseio.com/v0/topstories.json" 
returns an array of story IDs 

\[ 9127232, 9128437, 9130049, 9130144, 9130064, 9130028, 9129409, 9127243, 9128571, ..., 9120990 \]

So you'd need to make a call for each story ID returned from the top level endpoint. It's not an optimal design and [HN team admits it](https://github.com/HackerNews/API#design). _But I am thankful that HN team has provided a public API for their stories._

So with that in mind, let's move on to creating a source.

##  🏙 Implementation Steps

Now let's see how one can turn Hacker News API into a GraphQL Source by wrapping it as a Node by following steps below.

1. [Get all top level story IDs from HN API](#step1)
2. [Create source nodes](#step2)
3. [Make it available to GatsbyJS](#step3)

##### 💡 Get all top level story IDs from HN API

Let's get all top level story IDs from HN API.

`gist:dance2die/342880490bd1d274625bcc928b6ca358`

There are duplicate stories in Top, New, and Best stories. So let's cache only distinct story IDs.

`gist:dance2die/cf9a6685c577b704a0317b9043dcc910`

Getting all stories is as simple as calling an endpoint with story ID as part of the URL.

`gist:dance2die/cb721d594a3c717569499f6239901710`

You are creating sources for "Top", "New", and "Best" stories where "data" contains arrays of story IDs that were fetched in previously.

We've now fetched all data, now let's create story nodes  to expose it for GatsbyJS.

##### 💡 Create source nodes

We've retrieved `top/new/BestResults` from the previous step, and we now use them to create nodes as shown above.

`gist:dance2die/2751e37f89bba9cd2f963294df42a6d8`

Let's take a look at the implementation of aptly named, `createStoryNodes` method.

`gist:dance2die/ba1a6630fcae0f7a9e7932334e9a1697`

The shape is defined by `storyNode` between line 4~11. Let's go over each property.

1. **id**
    - This is created by combining the type with story ID, where the types are "TopStories", "BestStories", and "NewStories".
    - This makes each record distinct so that you can get this record and only this record if you need to.
    - This is similar to a primary key if you are familiar with database terms.
    - You can't just use a story ID as an ID, as Top, Best, and New stories can contain duplicate stories, that was the reason for the "type" to make each record distinct globally.
2. **parent & children**
    1. I honestly do not know 😅 exact use cases for this yet as I could not find any good documentations for them yet.
    2. The best I found was [this documentation](https://www.gatsbyjs.org/docs/node-interface/) but without a concrete example, I had to look at other source plugins like [gatsby-source-firebase](https://github.com/ryanflorence/gatsby-source-firebase/blob/master/gatsby-node.js).
    3. _A shameless begging - I'd appreciate it if you can help me understand why, where, and hows of these parameters_
3. **internal** -
    1. This is how you want the name of GraphQL type
    2. ![graphql - topstories.jpg](https://www.mindmeister.com/generic_files/get_file/9305386?filetype=attachment_file)
    3. For three `createStoryNodes` method calls, I passed "TopStories" for the first call so it's available as "topStories" in GraphQL.
4. **storyId** - This is self-explanatory, skip!
5. **item** - This contains actual story data but what's that `items.get(storyId)`?

Remember that we defined `getStories` function but never called? `items` is a map of all stories fetched using `getStories` as shown below.

`gist:dance2die/6ef5401930840c141464a2e2965af038`

The code above fetches stories and caches them into a map, from which we can construct the stories with. _A new [Map object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) (**not** [Array#map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)) is used for a constant time ([O(1)](https://en.wikipedia.org/wiki/Time_complexity#Constant_time)) look up for an efficient data retrieval._

[Content Digest](https://www.gatsbyjs.org/docs/bound-action-creators/#createNode) (scroll down to "Parameters") helps GatsbyJS track whether data has been changed or not enabling it to be more efficient. The implementation of `buildContentDigest` is shown below.

`gist:dance2die/dba912d6e2ad633b02e06f633015e502`

It uses to serialize story into a hex representation using MD5 hashing algorithm. _Honestly again, I used the implementation in the documentation as I don't know much about GatsbyJS's internal details._

##### 💡 Make it available to GatsbyJS

Now you export the stories source for GatsbyJS at the bottom of `gatsby-node.js` file.

`gist:dance2die/0b2c3858ed300836f2efebec8e34b655`

##  📞 How to call (use the source)

GatsbyJS automatically converts ``graphql`...` `` function [behind the scene](https://www.gatsbyjs.org/tutorial/part-four/#wait--where-did-the-graphql-tag-come-from), so all you have to do is to query the data source you created ([full source](https://github.com/dance2die/SHANc/blob/master/src/pages/index.js)).

`gist:dance2die/6d6b4234050801d4c90b05ea64fd5396`

GatsbyJS passes a prop containing `data` property, which in turn contains actual data fetched using GraphQL.

Here is the full source code of [gatsby-node.js](https://github.com/dance2die/SHANc/blob/master/gatsby-node.js).

`gist:dance2die/86b91a3e8544676d51f3a6f2cfe53d55`

## 👋 Parting Words

The code might not be optimal at fetching data, but static site generator will cache it before generating sites so wouldn't affect the site performance in the end.

_But I'd love to see if you have any suggestions on how to improve it :)_

You can create an issue on [GitHub](https://github.com/dance2die/SHANc/issues) or send me a [tweet](https://twitter.com/slightedgecoder). Full source for `gatsby-node.js` can be found [here](https://github.com/dance2die/SHANc/blob/master/gatsby-node.js).

