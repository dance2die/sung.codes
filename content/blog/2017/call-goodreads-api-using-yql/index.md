---
title: "How to call GoodReads API using YQL"
date: "2017-06-20"
coverImage: "featured-image-1.jpg"
---

Featured Image - "[Reading](https://www.flickr.com/photos/zapthedingbat/3591108120)" by [Sam Greenhalgh](https://www.flickr.com/photos/zapthedingbat/), used under [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)

I have been trying to use [GoodReads](https://www.goodreads.com/) data to display my reading statistics and to find patterns using Javascript.

The problem is that GoodReads API did not enable [Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS) headers thus AjAX calls were failing.

How can we get around the issue?

#### 1st Hurdle

Here is the code for the first attempt.

gist:dance2die/251e12bf0bb6f27c955d9f93ca50cf19

Above code returns following error message.

> XMLHttpRequest cannot load https://www.goodreads.com/shelf/list.xml?key=SECRET_KEY&user_id=25927588&page=1&format=json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access.

This GoodReads Developer [forum post](https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin) shows that other people are having the same issue.

There is a workaround found in this [post](https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin#comment_159292838) that one of the workarounds is to use a proxy server.

#### 2nd Hurdle

If you have never set up a proxy server, you'd need to search for documentations and read them and so on.

Instead of setting up your own proxy server, you can use Yahoo's [YQL](https://developer.yahoo.com/yql/) (Yahoo Query Language) as an external proxy.

The following code snippet wraps a GoodReads URL using `[YqlAjax](https://github.com/dance2die/Blog.Javascript.GoodReadsAPI/blob/master/js/yql_ajax.js)`, which does an AJAX request and returns a promise. `secondAttempt` runs without an issue and returns a record from GoodReads.

gist:dance2die/2ab0c052994b8f500501589917d7f202

gist:dance2die/e1f033ab2a6180929cdeb71e8da5f00b

#### 3rd Hurdle

The last problem is that it's quite a pain to generate a YQL URL and is error prone. Creating another Javascript file ([yql_ajax.js](https://github.com/dance2die/Blog.Javascript.GoodReadsAPI/blob/master/js/yql_ajax.js)) seems unnecessary.

There is an NPM package called [proxify-url](https://www.npmjs.com/package/proxify-url), which returns a new YQL URL given any URL. Now the code becomes simpler and you have one less file to create/maintain.

gist:dance2die/f4e3fb47fe75fac1fb65cebc13f88acc

One thing to note is that GoodReads API returns data in XML format instead of JSON. So you need to pass `{ inputFormat: 'xml' }` as an option to `proxyfy` method.

The code is now much more readable using existing library.

### Conclusion

Using Yahoo Proxy with YQL, we can circumvent CORS restriction and query GoodReads API.

You can find the source code on [here](https://github.com/dance2die/Blog.Javascript.GoodReadsAPI). Refer to the [README.md](https://github.com/dance2die/Blog.Javascript.GoodReadsAPI/blob/master/README.md) file on how to set up the project and run it.
