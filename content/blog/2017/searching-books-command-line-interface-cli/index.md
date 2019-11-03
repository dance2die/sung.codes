---
title: "Searching for Books in Command Line Interface (CLI)"
date: "2017-11-26"
coverImage: "featured-image-redd-angelo-12845.jpg"
---

Featured Image Credit -Photo by [Redd Angelo](https://unsplash.com/photos/9o8YdYGTT64?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

I'd like to show you a Node CLI (Command Line Interface), [Google-Book-Shell](https://www.npmjs.com/package/google-book-shell) I created from a [throwaway code](https://www.slightedgecoder.com/2017/09/05/throwaway-code-dont-recycle-throw-away/).

Here are the three things you can do with it.

1. You can search for a book from Google Books.
2. The searched book detail can be viewed.
3. Open the book on Google Books or Amazon page in a browser.

### Background

I am a voracious reader being a somewhat bibliophile. Searching for books online was slow due to an overhead of browser too slow. At the time, I was learning how to create a Node CLI application as well as ES6 syntax. I just decided to write a program on a whim.

### Google-Book-Shell in Action

OK, I've rambled on too much. Here is the CLI in action (It's a GIF but click to go to YouTube video).

[![](https://i.imgur.com/YtI0HA0.gif "Google Book Shell Demo Video")](https://www.youtube.com/watch?v=XK4NgwJqw0s)

Here is the basic workflow.

- Search for a book with a [search](https://github.com/dance2die/google-book-shell/blob/master/README.md#1-search) command.
- View the detail of a book with a [view](https://github.com/dance2die/google-book-shell/blob/master/README.md#3-view) command.
- Optionally open the link in a browser (to Google Books or Amazon website) with an [open](https://github.com/dance2die/google-book-shell/blob/master/README.md#2-open) command.

Here is the [README](https://github.com/dance2die/google-book-shell/blob/master/README.md), which covers how to install it and use it more thoroughly.

### Notes on Open command

When you open an Amazon page, the CLI queries Amazon's [Product Advertising API](http://docs.aws.amazon.com/AWSECommerceService/latest/DG/Welcome.html) (PAA) via Azure Functions. I didn't want to expose my Amazon Product Key and Secret so I moved the PAA query functionality to Azure Functions (after failed attempt to use AWS Lambda...). Azure Functions sleeps after 5 minutes of inactivity so opening an Amazon page for the first time could take 10~30 seconds unfortunately for I have used a pay-per-use plan.

PAA requires a developer to sign up for Amazon Affiliate Program. Thus the Amazon link returned adds a finger print with my affiliate info. I've added a flag(`--strip-amazon-affiliate` or `-s`) in `open` command to strip it out in case you do not want that info in the link.

`gist:dance2die/9ee9df6afe17cb10e5e2acb3e75be95c`

(Please don't be mean to me 😞 )

### Parting Words

[Google-Book-Shell](https://www.npmjs.com/package/google-book-shell) will make your book searching easier. If you find any issues or suggestions, please leave a feedback on the GitHub [new issues page](https://github.com/dance2die/google-book-shell/issues/new).

I will write another entry on technical challenges I had as well as the architecture (and lack thereof).

WARNING: By the way, the source is very sloppy since it was built from a throwaway code while learning ES6 😊
