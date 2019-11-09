---
title: Background image loading from SVG to Full Image
date: '2018-02-17'
banner: ./images/featured-image.jpg
published_at: '2018-02-17T19:38:31.000Z'
tags: 'blogentry, problemsolving, programming, codepen'
author: Sung M. Kim
---

Photo by [Vaughn Wright](https://unsplash.com/photos/okyXCkrhHHg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/around?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) resized to 600x480

My [landing page](https://www.sungkim.co/) background from [Unsplash](https://unsplash.com/) has been loading slowly because it's a fairly big file and was loading from different domain.

After reading this great article [Using SVG as placeholders — More Image Loading Techniques](https://jmperezperez.com/svg-placeholders/) by José M. Pérez , I decided to show a lightweight SVG background and then load a full background image.

Everything was fine on Chrome but all other browsers flickered when SVG background image is being replaced with full background image using Javascript.

Here is a workaround I used to get around the flickering issue.

### Initial Attempt

The initial attempt was to set `body.backgroundImage` with an SVG file and replace it from Javascript when the image is loaded (refer to the Javascript file under "babel" tab).

https://codepen.io/dance2die/pen/NyXyPX?editors=0010#0

Codepen example doesn't flash but the transition from SVG to full image is not gradual.

Here is how the site looked on the landing page. First browser shows Chrome, which works fine but the 2nd browser (FireFox Quantum) flickers 😱 as if you get flashed by a 📷.

https://youtu.be/n5IfLffxtzQ

### Workaround

Workaround for the flicker was generously provided by [Robert](https://twitter.com/bytefluxio) & Mehdi Merah (Sorry, couldn't find his info on Slack) on two separate Slack servers ([CodingBlocks](https://www.codingblocks.net/slack/) & [Animation at Work](https://damp-lake-50659.herokuapp.com/)).

Instead of replacing the background, load the full image in another tag and layer the full image on top of SVG.

https://codepen.io/dance2die/pen/ddJJEo

And now SVG looks like it's fading away as a full image loads on FireFox & IE.

https://youtu.be/dlp-foryr0o

### Help Needed

I am just getting used to the front-end development and this issue has taken me 2 days to test many of Google results and failures.

I'd appreciate it if anyone can suggest me another workaround and/or how I can improve my current code base, which is available on [GitHub](https://github.com/dance2die/dance2die.github.io).

