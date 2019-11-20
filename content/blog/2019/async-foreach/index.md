---
title: Async Foreach
date: "2019-11-19"
published: true
banner: ./images/featured-image.jpg
tags: "javascript, til, devjournal"
author: Sung M. Kim
---

Read an article [Exploring the JavaScript forEach Method for Looping Over Arrays](https://alligator.io/js/foreach-array-method/) by [Jack Misteli](https://twitter.com/jackmisteli) today.

Jack announced the post on Coding Blocks Slack channel, and mentioned that,

> I think most of you won't learn anything here it's pretty beginner stuff, hopefully there will be a nugget of new information.

He was right. I did get "a nugget of new information".

Wasn't aware of `async foreach` method can work differently that I thought.  
Setting `await` outside `Array#foreach` doesn't necessarily await/resolve promise inside it.

---

## Reproducing the behavior

An `await` on `Array#foreach` would not resolve promise(s) inside it.

In the code snippet below, following output will print all at once after one second, **NOT wait 1 second per number**.

```javascript
const waitFor = ms => new Promise(r => setTimeout(r, ms))

;[1, 2, 3].forEach(async n => {
  await waitFor(1000)
  console.log(`first number`, n)
})
```

_result after 1 second (1000 milliseconds)._

```bash
first number 1
first number 2
first number 3
```

Go ahead and click the play ▶ button to run the sample below.

<iframe height="400px" width="100%" src="https://repl.it/@dance2die/01-basic-example?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

But what if you want to wait for 1 second per each iteration?

## Using asyncForEach method

I also googled and foudn this articled, [JavaScript: async/await with forEach()](https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404), which dived deeper into the particular topic.

The author, [Sébastien Chopin](https://twitter.com/Atinux), created a wrapper method named `asyncForEach`, which accepts an array, and a callbac, to operate on the array.

```javascript
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
```

It reads like, given an array, await on callback of each array item.

The code below

```javascript
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const waitFor = ms => new Promise(r => setTimeout(r, ms))
async function main() {
  asyncForEach([1, 2, 3], async n => {
    await waitFor(1000)
    console.log(`main 'asyncForEach' num=${n}`)
  })
}

main()
```

results in following output, where each line is printed after one second.

```bash
main 'asyncForEach' num=1
main 'asyncForEach' num=2
main 'asyncForEach' num=3
```

Go ahead and click the play ▶ button to run the sample below.

<iframe height="400px" width="100%" src="https://repl.it/@dance2die/02-async-wrapper?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Using "for await...of".

There is a new syntax in town, [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of), which became avaiable in [ECMAScript2018](https://www.ecma-international.org/ecma-262/9.0/#sec-for-in-and-for-of-statements).

Let's say, you are mapping over an array, which does an async task.

_Overly contrived for brevity_

```javascript
// You can use `fetch` logic here to get users or posts, etc. for `getN`.
const getN = async n => n
const waitFor = ms => new Promise(r => setTimeout(r, ms))

async function main() {
  for await (const n of [1, 2, 3].map(getN)) {
    await waitFor(1000)
    console.log(`main 'for await of' num=${n}`)
  }
}

main()
```

The code above will output each line every second, not at once.

```bash
main 'for await of' num=1
main 'for await of' num=2
main 'for await of' num=3
```

The behavior is the same as using `asyncForEach` wrapper, just imperative.

<iframe height="400px" width="100%" src="https://repl.it/@dance2die/03-for-await-of?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
