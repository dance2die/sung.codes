---
title: Docusaurus Alpha TypeScript with Husky
date: "2020-10-29"
published: true
tags: "docusaurus, cheatsheet, typescript, husky"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [Bernadette Wurzinger](https://pixabay.com/users/einladung_zum_essen-3625323/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4171459) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4171459)"
---

## Introduction

I wanted to use Docusaurus v2, which supports MDX but is in Alpha.  
This is just my cheatsheet on how to set it up with TypeScript and Commitizen support using Husky.

_I will use yarn instead of npm._

## Bootstrap Docusaurus

Create a new Docusaurus project.  
https://v2.docusaurus.io/docs/installation

```bash
npx @docusaurus/init@next init [name] [template]
```

e.g. `npx @docusaurus/init@next init doc-demo classic`

## Set up TypeScript

### 1. Install TypeScript and types

```bash
yarn add -D typescript @docusaurus/module-type-aliases @types/react @types/react-router-dom @types/react-helmet @tsconfig/docusaurus
```

**Important**: Make sure that the version of `@docusaurus/module-type-aliases` matches that of `@docusaurus/core` in `package.json`.

I had trouble as the bootstrapped project used `@docusaurus/core` version of `alpha.66` while the latest `@docusaurus/module-type-aliases` was `alpha.51`.

![npm module-type-aliases](./images/module-type-aliases.jpg)

I manually upgraded `@docusaurus/module-type-aliases` to `@docusaurus/module-type-aliases@2.0.0-alpha.66` like

```bash
yarn add -D @docusaurus/module-type-aliases@2.0.0-alpha.66
```

### 2. Configure tsconfig.json

Extend as shown in the official documentation.  
https://v2.docusaurus.io/docs/typescript-support

```json
{
  "extends": "@tsconfig/docusaurus/tsconfig.json",
  "include": ["src/"]
}
```

### 3. Rename the main page source extension

Change the `./src/pages/index.js` to `./src/pages/index.tsx`.

### 4. Add type-check to test TypeScript

Add `type-check` script in `package.json`.

```json
"scripts": {
    ...
    "type-check": "tsc"
}
```

Run the command to see if there is any error.

```bash
yarn type-check
```

If there is no error, you should be able to run it with `yarn start`.

## Set up Husky

## Set up Commitizen
