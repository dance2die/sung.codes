---
title: Tailwind for Create-React-App Cheat Sheet
date: "2020-02-26"
modified_date: "2020-02-29"
published: true
tags: "tailwind, tailwindcss, css, cheatsheet"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image Credit: [Patent Model of a Sheet-Feed Apparatus for Printing Machines](https://www.si.edu/object/nmah_998909)"
---

## **Updated on 2020-06-12**

1. Replaced `autoprefixer` with [postcss-preset-env](https://github.com/csstools/postcss-preset-env#autoprefixer), which supports `autopprefixer` and more. Set up instruction can be found in [the official documentation](https://tailwindcss.com/docs/using-with-preprocessors/#future-css-features) too.
1. Tailwind CSS version 1.4.4 supports purge css natively. Installation for `purgecss` & `@fullhuman/postcss-purgecss` are removed.

---

## **Updated on 2020-02-29**

1. Replaced `concurrently` with [npm-run-all](https://www.npmjs.com/package/npm-run-all)
2. Fixed initial empty page load - Added `sleep 5` in package.json.

---

Based on https://github.com/billimarie/simple-react-tailwind-tutorial

## Assumption

I will assume that you know how to create a new React site using [Create-React-App](https://reactjs.org/docs/create-a-new-react-app.html) and created a site.

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
yarn add -D npm-run-all cross-env cssnano postcss-cli purgecss tailwindcss postcss-preset-env
# npm
npm i -D npm-run-all cross-env cssnano postcss-cli purgecss tailwindcss postcss-preset-env
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
   1. [postcss-preset-env][postcss-preset-env] - Supports newer CSS syntax and much more! (e.g. replaces `autoprefixer`)
   1. [cssnano][cssnano] - Minify CSS to reduce bundle size

```js
module.exports = {
  plugins: [
    require("tailwindcss"), 
    require("postcss-preset-env")
  ]
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
1. `watch:css` - Watch Tailwind changes and writes CSS
1. `env:dev/prod` - Sets an environment variable for development or production mode
1. `react-scripts:start`: Starts 5 seconds later to prevent an initial empty page
1. `react-scripts:build`: Creates a production-ready bundle
1. `start` - Watches Tailwind changes and starts CRA
1. `build` - Build Tailwind and production version of CRA site

```json
"scripts": {
  "build:css": "cross-env NODE_ENV=production postcss src/styles/tailwind.css -o src/styles/index.css",
  "watch:css": "cross-env NODE_ENV=development postcss src/styles/tailwind.css -o src/styles/index.css --watch",
  "react-scripts:start": "sleep 5 && react-scripts start",
  "react-scripts:build": "react-scripts build",
  "start": "run-p watch:css react-scripts:start",
  "build": "run-s build:css react-scripts:build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
```

## 6. Import Tailwind CSS Output

1. Go to `./src/index.js`
1. Replace `import './index.css';` with `import './styles/index.css';`

[autoprefixer]: https://autoprefixer.github.io/
[cssnano]: https://cssnano.co/
[postcss-preset-env]: https://github.com/csstools/postcss-preset-env

## Resources

1. `create-react-app` template in TypeScript (created by me 🙂), [cra-template-tailwindcss-typescript](https://github.com/dance2die/cra-template-tailwindcss-typescript).
    - Scaffold a new CRA app like `npx create-react-app my-app --template tailwindcss-typescript`
    - Most of steps in this post is used in the project
1. Demo repository - https://github.com/dance2die/template.tailwind.cra
   - Created by following this post
1. CodeSandbox template - https://codesandbox.io/s/create-react-app-tailwind-oqvyu
   - You can fork and play around with Tailwind + React with this one :)

---

Image Credit: [Patent Model of a Sheet-Feed Apparatus for Printing Machines](https://www.si.edu/object/nmah_998909)
