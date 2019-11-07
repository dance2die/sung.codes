---
title: Adding a Twitter Reply via Twitter API
date: '2019-07-28'
banner: ./images/featured-image.gif
published_at: '2019-07-28T22:45:07.000Z'
tags: 'blogentry, javascript, programming, selfnote'
author: Sung M. Kim
---

A quick note to self regarding adding a reply on Twitter using [Twitter NPM library](https://www.npmjs.com/package/twitter).

## POST statuses/update

POST statuses/update lets one "tweet" a status on Twitter.

But when you want to add a reply the an existing twitter, you can set the `in_reply_to_status_id` to the tweet ID you want to reply to.

The [documentation for](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update#parameters) `[in_reply_to_status_id](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update#parameters)` states that

> The ID of an existing status that the update is in reply to. **Note:** This parameter will be ignored unless the author of the Tweet this parameter references is mentioned within the status text. Therefore, you must include `@username` , where `username` is the author of the referenced Tweet, within the update.

Even though it says that it should be "mentioned within the status text", but it doesn't sound 100% correct as passing `username` mentioned in the following sentence was enough to trigger the reply thread.

``gist:dance2die/c4e463b8fa949d1fe7ae5761dd7ed3f9``

<a href="https://gist.github.com/dance2die/c4e463b8fa949d1fe7ae5761dd7ed3f9">View this gist on GitHub</a>

On line #17, username is passed and that's sufficient to make `in_reply_to_status_id` not to be ignored by Twitter.

![](https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/07/brave_cVXnc4x2aJ.png?fit=1024%2C837&ssl=1)

[https://mobile.twitter.com/dance2die/status/1155604901558456321](https://mobile.twitter.com/dance2die/status/1155604901558456321)

