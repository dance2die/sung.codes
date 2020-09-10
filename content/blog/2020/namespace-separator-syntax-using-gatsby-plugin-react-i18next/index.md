---
title: Namespace separator syntax using gatsby-plugin-react-i18next
date: "2020-09-09"
published: true
tags: "svelte, javascript, selfnote"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [William Krause](https://unsplash.com/@williamk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) from [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)"
---

## Introduction

First time learning i18n (internationalization) using [gatsby-plugin-react-i18next](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/) 

I chose this specific Gatsby plugin as it wraps around [react-i18next](https://react.i18next.com/)

The reason is similar to Robin Wieruch's description in his blog, [React Internationalization with i18n > REACT INTERNATIONALIZATION: WHICH LIBRARY SHOULD I USE?](https://www.robinwieruch.de/react-internationalization#react-internationalization-which-library-should-i-use).


## Problem

But I had trouble accessing keys by namespace using ":" syntax.

e.g.) Accessing `text` under `header` namespace

```js
i18next.t('header:text')
```

declared as following file, `<project root>/locales/<language>/header.json`.

```json
{
    text: "Greetings"
}
```

The React page was displaying `header:text` instead of `Greetings`.

## Issue

The issue was to blindly copy the example configuration in the [gatsby-plugin-react-i18net > Configure the plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/) documentation.

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-react-i18next`,
    options: {
      path: `${__dirname}/locales`,
      languages: [`en`, `es`, `de`],
      defaultLanguage: `en`,

      // you can pass any i18next options
      // pass following options to allow message content as a key
      i18nextOptions: {
        interpolation: {
          escapeValue: false // not needed for react as it escapes by default
        },
        keySeparator: false,
        // 👇 issue here
        nsSeparator: false
      },
      pages: [
        {
          matchPath: '/:lang?/blog/:uid',
          getLanguageFromPath: true,
          excludeLanguages: ['es']
        },
        {
          matchPath: '/preview',
          languages: ['en']
        }
      ]
    }
  }
];

```

I didn't know each of those options without understanding each option.  
After few hours of digging around, the culprit turned out to be [nsSeparator](https://www.i18next.com/overview/configuration-options#misc).

## Solution

Either leave the `nsSeparator` option out for a default `:` separator or pass a string to it to use the namespace syntax.

e.g.)

```js
nsSeparator: ":"
```
