---
title: "Tips on running React page with Node backend"
date: "2017-11-12"
coverImage: "featured-image-1.jpg"
---

As I was learning React, I've run into a situation where I needed to use node as a backend. I found this wonderful article [Create React App with an Express Backend](https://daveceddia.com/create-react-app-express-backend/) by Dave Ceddia.

But debugging required opening two command windows; One for node server, another for webpack dev server.

- SET PORT=3001 && node bin/www
- SET PORT=3000 && yarn start

Can we do better?

### TL;DR;

> Use `concurrently` & `nodemon`

### Prereq or not...

Please read [Create React App with an Express Backend](https://daveceddia.com/create-react-app-express-backend/) first on how to set up react page with node backend.

### Problem

When you chain commands together with `&&` or `&` (in Mac/Linux), command on the right-hand side doesn't execute until the left-hand side finishes.

Let's run following code in a command window.

gist:dance2die/c3f9a268abecaab47d92d11912325c07

[Node CLI](https://nodejs.org/api/cli.html) (`node bin/www`)doesn't return until interrupted thus `SET PORT=3000 && yarn start` doesn't get a chance to run.

We need a way to run both `node` and `yarn` "concurrently".

### Running node server & Webpack dev server "Concurrently"

This is where [concurrently](https://www.npmjs.com/package/concurrently) command comes into play. The NPM page describes the functionality as,

> Run multiple commands concurrently

Now let's install "concurrently" globally and locally for `react-backend` site (not under "/client" but in the express project).

gist:dance2die/9774b070edbff8c3235c193005b51ae3

**Note**: I installed it globally as well to run the command before adding it to "package.json" file.

`concurrently` accepts a variable number of arguments in quotes separated by space.

gist:dance2die/40060330c105b0c328a8fe375d8a01af

In our case, we want to run node & webpack dev server, so the command to run looks like following.

gist:dance2die/fd72542593ba26727c1c02cb4b80480c

The command line runs the node server and starts webpack dev server as shown below.

gist:dance2die/c2de06e6850fe49da74e22baf1ce6b50

And if the `react-scripts` ran successfully as shown above, a browser will open and display the react page.

### Another problem

Refreshing the browser after updating a node file would not reflect the change you made as shown below.

https://youtu.be/fpe5E-OdZb4

To monitor the change in node script changes, there are multiple options. To name a few,

- [nodemon](https://www.npmjs.com/package/nodemon)
- [supervisor](https://www.npmjs.com/package/supervisor)
- [lite-server](https://www.npmjs.com/package/lite-server)

I will use `nodemon` since it lets me add only 3 characters (yes, I am lazy... but check out other commands that suits your needs).

### Watching node file change

All you need to do is to replace `node` with `nodemon` within `concurrently` call.

So let's install `nodemon` first (I am installing it globally again to test in command window).

gist:dance2die/1c5db9617202aa0770967fc42b90eae9

Now the command becomes

gist:dance2die/1d361a3574f3ff4f787c8e3da61a0440

You can see that `nodemon` starts monitoring and runs `react-scripts` to start webpack dev server.

gist:dance2die/2acda1816d0ba4068d8dd3f30b80dc38

If you refresh the browser after making a change in the backend, the page will reflect the update.

https://youtu.be/Avqr8-8KCsM

### Saving Private Ryan Keystrokes

Now let's get lazier and add the `concurrent` command to the "package.json" under express project root as `startall`.

(You can use a single quote around `concurrently` in Mac/Linux not to escape double quotes but it won't work on Windows. That was the case for ReactJS.org website so I had made a [PR](https://github.com/reactjs/reactjs.org/pull/166) to make it work on Windows).

gist:dance2die/f5628f28771e7c7762bea4aa8a1741b6

Now you can run `concurrently` as shown below.

gist:dance2die/1af6333cb26c5b1268b0284df2541a1a

### Parting Words

I've blabbered a lot but it's basically a two-step process.

1. Install concurrently & nodemon: `npm i concurrently --dev && npm i nodemon --only=dev`
2. Start servers using \`concurrently\` by adding the \`concurrently\` command to package.json: `npm run startall` or `yarn startall`

I hope these two **extra** steps save you time and money.
