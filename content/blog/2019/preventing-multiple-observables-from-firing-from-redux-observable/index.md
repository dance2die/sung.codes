---
title: "Preventing multiple observables from firing from Redux-Observable"
date: "2019-10-19"
coverImage: "featured-image.jpg"
---

_Image by_ [_Brett Hondow_](https://pixabay.com/users/Brett_Hondow-49958/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1205609) _from_ [_Pixabay_](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1205609)

I've recently finished a basic course on RxJS. The main reason was to use [Redux-Observable](https://redux-observable.js.org/) after watching this video, "[Netflix JavaScript Talks - RxJS + Redux + React = Amazing!](https://www.youtube.com/watch?v=AslncyG8whg)" referred to by [Nicolas Marcora](https://twitter.com/nicolasmarcora).

[A basic example](https://redux-observable.js.org/docs/basics/Epics.html#a-basic-example) shows how to do "ping/pong", which was simple to implement.  
But the problem is that, when you ping more than once, multiple observables are created.

After hours of struggle, I asked on the official Gitter page for Redux-Observable.

I will share what's done in public ([Learn in Public](https://www.swyx.io/writing/learn-in-public/)) as the Gitter conversation is private.

## Error Demo

Below shows multiple "ping/pong" actions being dispatched as you click on "PING" button.

![](https://i2.wp.com/www.slightedgecoder.com/wp-content/uploads/2019/10/01-multiple-observables-dispatched.gif?fit=1024%2C999&ssl=1)

The code that generated the mess above is shown below.

<script src="https://gist.github.com/dance2die/dc5105212fb76aa64fb0c41cc3389eec.js"></script>

<a href="https://gist.github.com/dance2die/dc5105212fb76aa64fb0c41cc3389eec">View this gist on GitHub</a>

For being a new RxJS (, which is a prerequisite for `redux-observable`) user, I couldn't figure it after hours of reading documentation and playing around.

[Kevin Ghadyani](http://kevinghadyani.info/) generously spent time to review the code and provide a solution for the issue.

<script src="https://gist.github.com/dance2die/236f83b3e9777089f51fdb88bee0a1a9.js"></script>

<a href="https://gist.github.com/dance2die/236f83b3e9777089f51fdb88bee0a1a9">View this gist on GitHub</a>

1️⃣ uses [switchMap](https://rxjs.dev/api/operators/switchMap), which implicitly cancels previous observable. So when `PING` button is clicked while the `PING` action is already dispatched, previous timer observable is canceled and a new one is started.

Kevin's forked Sandbox shows the fix.

https://codesandbox.io/s/basic-example-kgq57

Kevin also shows how to accomplish the same task using [takeUntil](https://rxjs.dev/api/operators/takeUntil).

<script src="https://gist.github.com/dance2die/3eecf3ac350c6470ab64078bb6b1e783.js"></script>

<a href="https://gist.github.com/dance2die/3eecf3ac350c6470ab64078bb6b1e783">View this gist on GitHub</a>
