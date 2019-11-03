---
title: "dotnet new install issue - Error: Value cannot be null"
date: "2018-04-08"
coverImage: "matt-lamers-399809-unsplash.jpg"
---

Photo by [Matt Lamers](https://unsplash.com/photos/R6uybPo0Lv0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/installation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

.NET CLI has made it easy to create a new template. Sometimes you might get a following error message while creating a SPA template.

`gist:dance2die/8b718a44aa893504105337808287b21d`

I will show you what has caused it and how to get around it.

### 🤔 The Cause

According to [Mike Lorbetske](https://github.com/mlorbetske), the error occurs when one of the `node_modules` folders contain a `template.json` file.

> TL;DR - the particular node modules that have been added to the project contain a `template.json` file

### 💡 Resolution

So if you have a `node_modules` folder in your template, **delete it** then you are good to go.

NOTE 📝: The next version of .NET CLI templating engine (dotnet new3) has `--trace:authoring` option but wouldn't be helpful in this case [according to Mike](https://github.com/dotnet/templating/issues/1498#issuecomment-378501905).

### 🚪 Closing Remark

I've reported [the issue](https://github.com/dotnet/templating/issues/1498) on GitHub and Mike is preparing a PR to address this issue. The issue page has the comprehensive steps to reproduce the error and how to resolve it.

This issue was found while creating a new SPA template for [ASP.NET Core with React.js with ES6](https://www.nuget.org/packages/ReactES6.Web/) because the default template uses TypeScript.

You can find more about how to use it on [dev.to](https://dev.to/dance2die/aspnet-core-2-reactjs-template-with-es6-not-typescript-f71) site 😉.
