---
title: "Infinite Scrolling in React using JavaScript Generator"
date: "2018-08-11"
coverImage: "featured-image.jpg"
---

While reading [A Quick, Practical Use Case for ES6 Generators: Building an Infinitely Repeating Array](https://dev.to/sreisner/a-quick-practical-use-case-for-es6-generators-building-an-infinitely-repeating-array-1onk), I happened to be checking out [Reddit API](https://www.reddit.com/dev/api/).

JavaScript Generator is a great way to infinitely return data and thought I could use it for 🥁🥁🥁 infinite scrolling.

Let's see how to implement infinite scrolling in React with JavaScript Generator.

## 🚀 JavaScript Generator?

A [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) is an easy way to implement both [Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol) and [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) protocols.

_As usual, I will be lazy and refer you to these articles._  

- [How I learned to Stop Looping and Love the Iterator](https://dev.to/kepta/how-i-learned-to-stop-looping-and-love-the-iterator-463j)
- [Generator - JavaScript MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

In a gist, think of it as an object that returns a sequence of data infinitely until you tell it to stop.

## 🚀 Generator to Return Reddit Data

Here is a generator function that returns ReactJS subreddit data.

[View Gist on GitHub](https://gist.github.com/dance2die/053647daae0fc976d56b6c1b4a9775c7)

First thing to note is that, generators are declared with keyword `function*` (notice the star after the function keyword).  
That `*` is what [makes a function a generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).  

On line#2, a URL is passed, with default value set to ReactJS API URL.  
Line#4 shows a declaration of `nextUrl`, which is constructed using the url from line#2 and `after` argument required to fetch next batch of data (we will see it in a moment).  

Now the `while` loop is where the interesting things happen.  
`nextUrl` is empty initially so it's set to `url` passed as a function argument.  

Then we fetch Reddit data as JSON, which has a shape shown below.  

[View Gist on GitHub](https://gist.github.com/dance2die/c337746b58ea1c53868179741c0feb1f)

Value stored in `after` property is what we need to fetch next batch of data.  
And line #10 constructs the next URL to query to fetch more data.  

[View Gist on GitHub](https://gist.github.com/dance2die/9fe429a44fbdb250eb9644b0594099ee)

_**Thank you [tills1993](https://www.reddit.com/user/tills1993) for finding the [bug](https://www.reddit.com/r/reactjs/comments/96i0oz/infinite_scrolling_in_react_using_javascript/e41d9m4) in the previous code.**_

Now you see this unfamiliar keyword `yield` that returns an array of data using `Array#map`.  
[Yield](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield) temporarily returns the data and gives up the control to the calling code.  

So when the calling code calls `getContent` again, all variables inside the `while` loop is restored thus `nextUrl` will contain the next URL not `null`.  
(_I am not sure if it's the work of [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) so I'd love to hear your feedback on it_)  

Lastly, we export `getContent` from `ContentRepo.js`.  
We've covered how the generator function, `getContent` works so let's move on to implement infinite scrolling in React.  

## 🚀 End Result

Before moving on, let's see how the end result looks visually.

https://youtu.be/L-aEA5c3EYs

Infinite Scrolling in action

It loads 4 stories with "Load More Stories" button.  
Infinite scrolling will happen when the page has stories that spans longer than the view port height.  
_Please pardon the color combinations, I tried my best to make it pretty…  
_  
Now you see how the end result looks, let's move on.  

## 🚀 Implementing Infinite Scrolling

Let's see the main component App's structure.

[View Gist on GitHub](https://gist.github.com/dance2die/e22997d6d642f6dac295f916714d252e)

App's state contains all Reddit posts, and a flag to see if we have reached the bottom of the page.

- `repo` is a generator that returns Reddit data infinitely as mentioned in [Generator to Return Reddit Data](#returnRedditData).
- `getNextPosts` returns next batch of Reddit posts (data fetch logic is hidden away in the generator function).
- `windowSizeHandler` is a callback that's triggered when the browser window is resized or scrolled.
- `componentDidMount` is where we register Window [Resize](https://developer.mozilla.org/en-US/docs/Web/Events/resize) & [Scroll](https://developer.mozilla.org/en-US/docs/Web/Events/scroll) events and get initial batch of Reddit posts.
- `componentWillUnmount` is where we unregister Resize & Scroll events to remove listeners.
- `loadMoreStories` is a helper function that's called by `Load More Stories` button.
- `render` is where we load posts and shows `Load More Stories` button.

Let's see the implementation of each method one by one.  

## 🚀 Component Implementation Details

### 🗿 componentDidMount

This is where we register two window events and fetch initial posts to display.  

[View Gist on GitHub](https://gist.github.com/dance2die/478cd39c072ae76ef774c63efc9735b5)

I've used [lodash.throttle](https://lodash.com/docs/4.17.5#throttle) function to limit the number of events generated.  
_Or else there will be too many events fired and make too many Reddit API requests._

_[spryes ](https://www.reddit.com/user/spryes)on reddit has pointed out that \`throttle\` would return a new function every time so I've created a reference to the throttled implementation in `thrrotledWindowHandler`._

The reason for choosing `throttle`  over `debounce` is because I wanted to load next batch of data without having to wait until user started/finished scrolling/resizing.

_For the difference, refer to_ [Debouncing and Throttling Explained Through Examples.](https://css-tricks.com/debouncing-throttling-explained-examples/)  

### 🗿 componentWillUnmount

[View Gist on GitHub](https://gist.github.com/dance2die/06c36e41bade67b3d95259a717ec4388)

Make sure to clean up and free up listeners when the component is unmounted.

### 🗿 windowSizeHandler

[View Gist on GitHub](https://gist.github.com/dance2die/7737098b139ab2607952530f70584864)

First we calculate whether we have reached the bottom of the viewport (`isBottomReached`).

- `window.scrollY` is how much one has scrolled vertically so far
- `window.innerHeight` is the viewport height
- `document.body.offsetHeight` indicates the total height of the content in `<body>`.

If the sum of `scrollY` and `innerHeight` is same as `document.bodyOffsetHeight`, then we have reached the bottom.

An arbitrary `heightOffset` value is for fetching data before reaching the bottom  
That means, users don't have to wait for story to load after reaching the bottom.

https://youtu.be/2WS5wptSg0c

Loading data before reaching bottom

### 🗿 getNextPosts

[View Gist on GitHub](https://gist.github.com/dance2die/b528f1f977bc000c3b1cde97146a1a9b)

We fetch next posts using the generator object instance, `(await this.repo.next()).value`.  
  
💁_ Note that you don't need to pass any arguments or keep a track of next URL to call. It's completely abstracted away._

In line#4, new posts (`posts: [...prevState.posts, ...newPosts]`) are added  
and turns off bottom flag since we just loaded new stories.

### 🗿 render

Here we construct reddit posts and display `Load More Stories` button.

[View Gist on GitHub](https://gist.github.com/dance2die/75ee7685c185f062e7daf8143b2ce8e8)

### 🗿 loadMoreStories

[View Gist on GitHub](https://gist.github.com/dance2die/c3519d71acc44e1dd1bab71165a97bbe)

`getNextPosts` is asynchronous so I wrapped it in an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (Immediately Invoked Function Expression) as [async rendering](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html) will be available in later version.

### 🗿 RedditPost

[View Gist on GitHub](https://gist.github.com/dance2die/c861dc490bd4eec2e28fdb098ea0a3a7)

Lastly, RedditPost component shows title and post content

## 👋 Parting Words

JavaScript generator abstracted away all nitty gritty details on how to fetch data, and keep track of next URL to fetch from.

And make sure you either throttle or debounce windows scroll & resize events as they fire very rapidly as explained in this post, [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/).

[![Edit window-bottom-check-v2](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/04v892702v)

Here is the link to the SandBox again.

I've also created a GitHub [repository](https://github.com/dance2die/throwaway.react.window_bottom_check) so you can clone it and play around with it locally.
