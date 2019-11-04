---
title: React + TypeScript with Parcel
date: '2019-01-22'
coverImage: featured-image.jpg
published_at: '2019-01-23T03:46:32.000Z'
tags: 'programming, quicktip, react, selfnote'
author: Sung M. Kim
---

_Photo by _[_Kira auf der Heide_](https://unsplash.com/photos/IPx7J1n_xUc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_ on _[_Unsplash_](https://unsplash.com/search/photos/parcel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Learned today that it's easy to create React + TypeScript site with Parcel without using CRA (create-react-app).

Parcel Documentation has a whole (short but complete) section on how to use TypeScript file with Parcel.

[https://parceljs.org/typeScript.html](https://parceljs.org/typeScript.html)

Just include TypeScript file (either `.ts` or `.tsx` for React components) in an HTML file, and Parcel will know what to do with it.

``gist:dance2die/18a5d6e192c3bab736b79f8abd437f7d``

<a href="https://gist.github.com/dance2die/18a5d6e192c3bab736b79f8abd437f7d">View this gist on GitHub</a>

including TypeScript file

One caveat is that you need to set a `jsx` option in `tsconfig.json` to `react` for it to work.

``gist:dance2die/d3e4b01bbf49c09c82103be4137d31f2``

<a href="https://gist.github.com/dance2die/d3e4b01bbf49c09c82103be4137d31f2">View this gist on GitHub</a>

jsx option in tsconfig.json

## Resources

- [Parcel Documentation on TypeScript](https://parceljs.org/typeScript.html)
- [React + TypeScript with Parcel repo](https://github.com/dance2die/demo.typescript-mobx-parcel)

