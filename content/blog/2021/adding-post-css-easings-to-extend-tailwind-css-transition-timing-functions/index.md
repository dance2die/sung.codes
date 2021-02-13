---
title: Adding PostCSS-Easings to Extend Tailwind CSS Transition Timing Functions
date: "2021-02-12"
published: true
tags: "tailwind, tailwindcss, easings, transition"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [zmortero](https://pixabay.com/users/zmortero-1348534/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=912247) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=912247)"
---

## Introduction

Tailwind CSS ("TW" hereafter) provides [Transition Timing Functions](https://tailwindcss.com/docs/transition-timing-function) (TTFs hereafter. I will use `easings` and `TTFs` interchangably).

- ease-linear
- ease-in
- ease-out
- ease-in-out

Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#Keywords_for_common_cubic-bezier_easing_functions

Sometimes, you want more of such TTFs.

[PostCSS-Easings](https://github.com/postcss/postcss-easings) provide most of easing functions on [Easings.net](https://easings.net/)

_Note_: "Most" because some easing functions require JavaScript, and non-trivial to add to TW thus not covered.

## Implementation

Here are the steps to add PostCSS-Easings to TW.

1. Install PostCSS-Easings

```bash
npm install --save-dev postcss postcss-easings
```

2. Extend `transitionTimingFunction` in TW configuration file, `tailwind.config.js`.

```js
const { easings } = require("postcss-easings")

module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: { ...easings },
    },
  },
  // Other configurations
  // ..
}
```

## Usage

When you extend `transitionTimingFunction`, the new TTFs can be accessed with `ease-*` prefix.

```html
<img
  src="..."
  class="h-1/3 w-1/3 transition ease-easeInOutBack duration-300"
  alt="logo"
/>
```

`ease-easeInOutBack` will work like https://easings.net/#easeInOutBack.

## Sharing Easings

You can also create a local preset, which can be shared in another project (in a monorepo) or even create an NPM library out of it.

`./tailwind-preset.js`

```js
const { easings } = require("postcss-easings")

module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: { ...easings },
    },
  },
}
```

And apply the above preset in `tailwind.config.js`.

```js
module.exports = {
  purge: [],
  presets: [require("./tailwind-preset.js")],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```
