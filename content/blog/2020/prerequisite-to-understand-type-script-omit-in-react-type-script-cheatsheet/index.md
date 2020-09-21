---
title: Prerequisite to understanding TypeScript Omit in React TypeScript Cheatsheet
date: "2020-09-21"
published: true
tags: "selfnote, typescript, react"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [Edward Lich](https://pixabay.com/users/AJEL-676477/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2969490) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2969490)"
---

## Introduction

A note to self lest I forget the resources I learned from.

As I was going thru [Swyx](https://twitter.com/swyx)'s React TypeScript Cheatsheet, [Props: Omit prop from a type](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#props-omit-prop-from-a-type), I had trouble understand the definition of `Omit`.

```ts
// this comes inbuilt with TS 3.5
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

Could not wrap my heads around it so Googled and found [Marius Schulz](https://twitter.com/mariusschulz)'s blog posts.

## Blog read order

I read these backwards initially but the posts in following order seems to make sense.

1. [keyof and Lookup Types in TypeScript](https://mariusschulz.com/blog/keyof-and-lookup-types-in-typescript) - Learn about `keyof` used for `Omit` and `Exclude`
1. [Conditional Types in TypeScript](https://mariusschulz.com/blog/conditional-types-in-typescript) - To understand `Exclude`
   ```ts
   type Exclude<T, U> = T extends U ? never : T
   ```
1. [The Omit Helper Type in TypeScript](https://mariusschulz.com/blog/the-omit-helper-type-in-typescript) - To finally learn how `Omit` is implemented

## References

[Advaned utlity type document](https://www.typescriptlang.org/docs/handbook/utility-types.html) and [sources](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts) for

1. `Omit<Type, Keys>`

   - **Definition**: Constructs a type by picking all properties from Type and then removing Keys.
   - **Documentation**: https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
   - **Source**: https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1504

   ```ts
   /**
    * Construct a type with the properties of T except for those in type K.
    */
   type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
   ```

1. `Pick<Type, Keys>`

   - **Definition**: Constructs a type by picking the set of properties Keys from Type.
   - **Documentation**: https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
   - **Source**: https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1480

   ```ts
   /**
    * From T, pick a set of properties whose keys are in the union K
    */
   type Pick<T, K extends keyof T> = {
     [P in K]: T[P]
   }
   ```

1. `Exclude<Type, ExcludedUnion>`

   - **Definition**: Constructs a type by excluding from Type all union members that are assignable to ExcludedUnion.
   - **Documentation**: https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion
   - **Source**: https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1494

   ```ts
   /**
    * Exclude from T those types that are assignable to U
    */
   type Exclude<T, U> = T extends U ? never : T
   ```

## Misc. Link

Need to watch Marius Schulz's Egghead course, [Advanced Static Types in TypeScript](https://egghead.io/courses/advanced-static-types-in-typescript).

---

Image by <a href="https://pixabay.com/users/AJEL-676477/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2969490">Edward Lich</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2969490">Pixabay</a>

_cuz, Donut's hole reminds me of Omit 😉_
