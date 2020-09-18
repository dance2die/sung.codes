---
title: Check out repository before using GitHub @actions/glob
date: "2020-09-17"
published: true
tags: "github, actions, troubleshoot"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [Free-Photos](https://pixabay.com/photos/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1246588) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1246588)"
---

## TL;DR

Check out repository with [actions/checkout@v2](https://github.com/actions/checkout) before [@actions/glob](https://github.com/actions/toolkit/tree/master/packages/glob).

## Introduction

The goal was to use [GitHub JavaScript Action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action) to validate URLs in a repostory.

## Problem

The problem was that, `@actions/glob` library did not return any files even with a global matching pattern, `**`.

```js
const glob = require("@actions/glob")

const globber = await glob.create("**")
const files = await globber.glob()

// files = []
```

## Fix

To access the file in GitHub action, one needs to check out a repository to access files for.

e.g.)

```yml
name: Report broken URLs

on: push

jobs:
  report_job:
    runs-on: ubuntu-latest

    steps:
      # 👇 Check out the repository
      # to be able to access the repository files
      # in "my_action"
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Validate repository URLs and report broken link(s)
        uses: my_action@master
```

---

Image by <a href="https://pixabay.com/photos/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1246588">Free-Photos</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1246588">Pixabay</a>
