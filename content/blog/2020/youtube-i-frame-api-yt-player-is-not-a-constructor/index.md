---
title: Youtube iFrame API - YT.Player is not a constructor
date: "2020-06-08"
published: true
tags: "javascript, youtube, iframe, error"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [SplitShire](https://pixabay.com/users/SplitShire-364019/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=407212) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=407212)"
---

As I was playing around with [YouTube Player API Reference for iframe Embeds](https://developers.google.com/youtube/iframe_api_reference), I was getting the following error,

> TypeError  
> YT.Player is not a constructor

The error occurred when I was creating a new `YT.Player` instance.

```js
new YT.Player("player", {
  height: "390",
  width: "640",
  videoId: "M7lc1UVf-VE",
  events: {
    onReady: onPlayerReady,
    onStateChange: onPlayerStateChange
  }
});
```

I was looking at [this reply](https://stackoverflow.com/a/54848637/4035) for the question, Uncaught [TypeError: YT.Player is not a constructor](https://stackoverflow.com/questions/52062169/uncaught-typeerror-yt-player-is-not-a-constructor) but it didn't really answer what the "fix" is.

After some digging I found a working CodeSandbox sandbox, https://codesandbox.io/s/youtube-iframe-api-tpjwj (this uses jQuery), which used a undocumented API, `YT.ready()`.

It seems to wait until the player instance is "ready" to be created similar to [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event) for DOM.

So the fix it to wait within the callback of `YT.ready`.

```js
 function setupPlayer() {
    /**
     * THIS FAILS!!!!!
     */
    // player = new YT.Player("player", {
    //   height: "390",
    //   width: "640",
    //   videoId: "M7lc1UVf-VE",
    //   events: {
    //     onReady: onPlayerReady,
    //     onStateChange: onPlayerStateChange
    //   }
    // });

    /**
     * Need to wait until Youtube Player is ready!
     */
    window.YT.ready(function() {
      player = new window.YT.Player("video", {
        height: "390",
        width: "640",
        videoId: "M7lc1UVf-VE",
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    });
  }
```

The working Sandbox (I converted the jQuery version to Vanillia JS) - https://codesandbox.io/s/soanswer52062169-mem83?file=/src/index.js:406-1242

---

Image by <a href="https://pixabay.com/users/SplitShire-364019/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=407212">SplitShire</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=407212">Pixabay</a>