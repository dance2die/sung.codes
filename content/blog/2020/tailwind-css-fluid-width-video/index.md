---
title: Tailwind CSS - Fluid Width Video
date: "2020-10-10"
published: true
tags: "tailwind, tailwindcss, css, youtube, cheatsheet"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [Rudy and Peter Skitterians](https://pixabay.com/users/skitterphoto-324082/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1017451) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1017451)"
---

## Introduction

Learned how to make YouTube videos from this CSS Tricks article, [Fluid Width Video](https://css-tricks.com/fluid-width-video/).

The following code snippet is a Tailwind CSS version of [&lt;iframe&gt; Video (YouTube, Vimeo, etc.)](https://css-tricks.com/fluid-width-video/#iframe-video-youtube-vimeo-etc) section.\_

## Fluid Width iFrame Video

1. Add a wrapper element with following classes

   1. [relative](https://tailwindcss.com/docs/position#relative)
   2. A Tailwind CSS `padding` extension
      ```js
      module.exports = {
        purge: [...],
        theme: {
          extend: { padding: { "fluid-video": "56.25%" } },
        },
        variants: {},
        plugins: [],
      }
      ```
   3. Remove the wrapper height with [h-0](https://tailwindcss.com/docs/height#app).

2. Position `iframe` with an [absolute](https://tailwindcss.com/docs/position#absolute) positioning on [top left](https://tailwindcss.com/docs/top-right-bottom-left#app) (`top-0`, `left-0`), with 100% [width](https://tailwindcss.com/docs/width#app) and [height](https://tailwindcss.com/docs/height#app) (`w-full`, `h-full`).

```jsx
<div id="responsiveVideoWrapper" className="relative h-0 pb-fluid-video">
  <iframe
    className="absolute top-0 left-0 w-full h-full"
    src="https://www.youtube.com/embed/zihoyz0u_cs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
```

---

Image by <a href="https://pixabay.com/users/skitterphoto-324082/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1017451">Rudy and Peter Skitterians</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1017451">Pixabay</a>
