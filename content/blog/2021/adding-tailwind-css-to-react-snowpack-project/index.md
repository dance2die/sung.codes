---
title: Adding Tailwind CSS to React Snowpack Project
date: "2021-01-28"
published: true
tags: "tailwind, tailwindcss, snowpack, cheatsheet"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [zmortero](https://pixabay.com/users/zmortero-1348534/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=912247) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=912247)"
---

## Introduction

This is a cheatsheet for adding Tailwind CSS support for a Snowpack project (bootstrapped with React+TypeScript template).

## Commandline Steps

### 1. Create a project

```bash
# Pass '--use-yarn' to use yarn
npx create-snowpack-app app-name \
	--template @snowpack/app-template-react-typescript

# Go to the project
cd app-name

# Optional: Change git master to main
git branch -M master main
```

You can find more templates (`@snowpack/app-template-*`) in the offical repository.  
https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli#official-app-templates

### 2. Install NPM packages

```bash
npm install --save-dev \
  @snowpack/plugin-postcss postcss postcss-cli \
  tailwindcss autoprefixer cssnano
```

### 3. Create configuration files

```bash
touch postcss.config.js && npx tailwindcss init
```

**Note**: `npx tailwindcss init` creates `tailwind.config.js` file with empty options

## Configuration Steps

### 4. Add PostCSS support to Snowpack

`snowpack.config.js`,

```js
module.exports = {
  plugins: [
    //... other plugins
    "@snowpack/plugin-postcss",
  ],
}
```

### 5. Configure PostCSS for Tailwind CSS

`postcss.config.js`

```js
const cssnano = require("cssnano")
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")

const plugins =
  process.env.NODE_ENV === "production"
    ? [tailwindcss, autoprefixer, cssnano]
    : [tailwindcss, autoprefixer]

module.exports = { plugins }
```

### 6. Add Tailwind CSS Utilities

Replace `./src/index.css` content with Tailwind directives

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Check out the official Taiwlind CSS [Installation documentation](https://tailwindcss.com/docs/installation#installing-tailwind-css-as-a-post-css-plugin) for more options.

---

Image by <a href="https://pixabay.com/users/zmortero-1348534/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=912247">zmortero</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=912247">Pixabay</a>
