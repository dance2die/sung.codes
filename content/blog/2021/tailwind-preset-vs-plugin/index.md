---
title: Tailwind Preset vs Plugin
date: "2021-01-21"
published: true
tags: "tailwind, tailwindcss, comparison, selfnote"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [Pexels](https://pixabay.com/users/pexels-2286921/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1868496) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1868496)"
---

## Introduction

Tailwind provides [Presets](https://tailwindcss.com/docs/presets) and [Plugins](https://tailwindcss.com/docs/plugins) to customize Tailwind CSS ("TW" hereafter).

The difference is hard to grasp from descriptions.

> Creating your own reusable configuration presets.  
> **Presets**

> Extending Tailwind with reusable third-party plugins.  
> **Plugins**

Note that both promotes "re-usability". A bit confusing because of the recursive definition of presets.

## What are they?

Here is the gist.

- **Presets**: A base configuration to override
- **Plugins**: A JavaScript code to create custom styles

## When to use?

- **Presets**: To provide common configurations across projects for consistent Look & Feel
- **Plugins**: To create styles requiring manual copy/paste

## Why choose one over the other?

Presets is more of an abstraction and  
they can contain plugins, while the reverse is not true.

## How

### Presets

You'd normally create a custom TW configuration options such as base, components, utilities ("styles" hereafter).  
As mentioned above, Presets can add plugins.

As it's still a TW configuration, you can either override or extend styles.

The following preset will

1. [override spacing](https://tailwindcss.com/docs/customizing-spacing#overriding-the-default-spacing-scale)
2. while extending [z-index](https://tailwindcss.com/docs/z-index) (TW provides `z-index` from 10 to 50 incremented by 10).
3. TW's official typography and [text truncation](https://github.com/tailwindlabs/tailwindcss-line-clamp) plugins

`custom-preset.js`

```js
module.exports = {
  theme: {
    spacing: {
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
    },
    extend: {
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
}
```

You can see that the Preset provides a base configuration and can include plugins.

Check out [Creating a preset](https://tailwindcss.com/docs/presets#creating-a-preset) for an official example.

### Plugins

Better to refer you to official [Plugin documentation](https://tailwindcss.com/docs/plugins) for examples (it's flexible.)
