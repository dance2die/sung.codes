---
title: '''href'' vs. ''src'' in HTML'
date: '2019-07-17'
banner: ./images/featured-image.jpg
published_at: '2019-07-18T01:45:53.000Z'
tags: 'html, css, javascript'
author: Sung M. Kim
---

Last night, I vented out my frustration on `<link>` requiring `href` to point to a CSS stylesheet instead of `src`.

I will share the help I received and the history provided by wonderful folks, [Vuild](https://vuild.com/), [Brendan Eich](https://brendaneich.com/) (creator of JavaScript), and [Håkon Wium Lie](https://www.wiumlie.no/en.html) (creator of CSS) on Twitter.

## TL;DR

`href` resources are loaded based on a trigger while `src` resources are loaded automatically.  
Not 100% accurate because CSS files get loaded automatically.  
The confusion between `href` and `src` is due to a historical reason in early web standards era.

## Difference between "href" & "src"

[Vuild](https://twitter.com/vuildco) replied that `src` is for a request while `href` is for a link to a resource.

https://twitter.com/vuildco/status/1151288830860976128

Being unable to grasp the difference, I replied that "CSS" is a request to download/parse/apply, it should be using `src`. As Vuild felt the same way, and he [requested](https://mobile.twitter.com/vuildco/status/1151291872322760705) [Brendan Eich](https://mobile.twitter.com/BrendanEich), and [Håkon Wium Lie](https://mobile.twitter.com/wiumlie) for help.

Brendan Eich kindly replied that `src` is for "auto inclusion" while `href`'ed resources are loaded after an action occurs.

https://twitter.com/BrendanEich/status/1151317825908166656

https://twitter.com/BrendanEich/status/1151323779131305984

https://twitter.com/BrendanEich/status/1151326755749163008

But as for CSS, he agreed that `href` for CSS "[seems(ed) inconsistent](https://twitter.com/BrendanEich/status/1151324101157347328)".

## **link href**

Håkon Wium Lie kindly provided the history (how) and the rationale (why) behind it.

The rationale was because the "HTML2 specification said so".

https://twitter.com/wiumlie/status/1151458530567831553

_"[There we have it, HTML2 spec.](https://twitter.com/vuildco/status/1151462988798464002)" (Vuild took words out of my mouth 😀*).*  
Note that [it's the HTML2 spec not XHTML2](https://twitter.com/wiumlie/status/1151576065934012422)._

## **img src**

And then Håkon followed up with how and why `img` uses `src`.

`img.src` was [proposed](http://1997.webhistory.org/www.lists/www-talk.1993q1/0182.html) by [Marc Andreessen](https://twitter.com/pmarca) and [Sir Tim Berners-Lee](https://www.w3.org/People/Berners-Lee/) (inventor of World Wide Web) favored using an anchor tag with `href`!

``gist:dance2die/7c9f90350985fbb2e2a2ba4405ce632f``

<a href="https://gist.github.com/dance2die/7c9f90350985fbb2e2a2ba4405ce632f">View this gist on GitHub</a>

As you can see it's more "convenient" to use `img.src` thus that's what's implemented.

https://twitter.com/wiumlie/status/1151466527759224833

There you have it. The convenience factor has won over. 😃

## Additional History - HTTP Referer

After sharing the Twitter thread in [useReactNYC](https://usereact.nyc/) (a React Meetup in NYC) slack workspace, [Donavon](https://twitter.com/donavon) (one of the useReactNYC hosts and an active React community educator who loves to {...💖}) has shared a link on how an HTTP header `referer` (note it's not spelled as "referrer", missing one "r") [misspelling came about](https://en.wikipedia.org/wiki/HTTP_referer).

_**SPOILER**: An old spell checker didn't catch it._

## Parting Words

Many thanks to [Vuild](https://vuild.com/), [Brendan Eich](https://brendaneich.com/), and [Håkon Wium Lie](https://www.wiumlie.no/en.html) for the help and the hi/story.

It was a great experience as they spared their time to teach and share the experience.

You can check out [the original thread](https://twitter.com/dance2die/status/1151286723122466816) (but be warned, it has many branches and thus could be hard to follow 😉).

