---
title: Tailwind for Create-React-App Cheat Sheet
date: "2020-02-26"
published: true
tags: "tailwind, tailwindcss, css, cheatsheet"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image Credit: [Patent Model of a Sheet-Feed Apparatus for Printing Machines](https://www.si.edu/object/nmah_998909)"
---

Based on https://github.com/billimarie/simple-react-tailwind-tutorial

## Table of Contents

1. Install DEV dependencies
1. Create Tailwind configuration file
1. Configure PostCSS for Tailwind
1. Create a Tailwind file
1. Create NPM scripts
1. Import Tailwind CSS Output

## 1. Install DEV dependencies

```bash
# yarn
yarn add -D @fullhuman/postcss-purgecss autoprefixer concurrently cross-env cssnano postcss-cli purgecss tailwindcss
# npm
npm i -D @fullhuman/postcss-purgecss autoprefixer concurrently cross-env cssnano postcss-cli purgecss tailwindcss
```

## 2. Create Tailwind configuration file

```bash
npx tailwind init tailwind.config.js
```

## 3. Configure PostCSS for Tailwind

1. Create a file `postcss.config.js` in the project root.

```bash
# bash
touch postcss.config.js
# Powershell
new-item postcss.config.js
```

2. Configure Post CSS to work with Tailwind
   1. [@fullhuman/postcss-purgecss][@fullhuman/postcss-purgecss] - Tree-shake unused CSS with "purgecss"
   1. [autoprefixer][autoprefixer] - Add browser specific prefixes such as `-webkit/-o/-moz`
   1. [cssnano][cssnano] - Minify CSS to reduce bundle size

```js
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./public/**/*.html"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
})

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    // Purge and minify CSS only production builds only
    ...(process.env.NODE_ENV === "production"
      ? [purgecss, require("cssnano")]
      : []),
  ],
}
```

## 4. Create a Tailwind file

Create a file `./src/styles/tailwind.css`.

```bash
# bash
mkdir -p ./src/styles/ && touch ./src/styles/tailwind.css
# Powershell
new-item ./src/styles/tailwind.css -ItemType File -Force
```

Add following Tailwind utilities

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 5. Create NPM Scripts

`package.json` scripts.

1. `build:css` - converts Tailwind to CSS
2. `watch:css` - Watch Tailwind changes and writes CSS
3. `start` - Watches Tailwind changes and starts CRA
4. `build` - Build Tailwind and production version of CRA site

```json
  "scripts": {
    "build:css": "postcss src/styles/tailwind.css -o src/styles/index.css",
    "watch:css": "postcss src/styles/tailwind.css -o src/styles/index.css --watch",
    "start": "cross-env NODE_ENV=development concurrently \"npm run watch:css\" \"react-scripts start\"",
    "build": "cross-env NODE_ENV=production concurrently \"npm run build:css\" \"react-scripts build\"",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

## 6. Import Tailwind CSS Output

1. Go to `./src/index.js`
1. Replace `import './index.css';` with `import './styles/index.css';`

[@fullhuman/postcss-purgecss]: https://github.com/FullHuman/postcss-purgecss
[autoprefixer]: https://autoprefixer.github.io/
[cssnano]: https://cssnano.co/

---

Image Credit: [Patent Model of a Sheet-Feed Apparatus for Printing Machines](https://www.si.edu/object/nmah_998909)
