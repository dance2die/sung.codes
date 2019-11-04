---
title: Passing an API Key to Heroku Node Application
date: '2017-09-09'
coverImage: featured-image.jpg
published_at: '2017-09-09T19:57:04.000Z'
tags: 'blogentry, programming, apikey, deployment'
author: Sung M. Kim
---

I was learning [how to publish a node app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction), [GitHub Traffic View](https://github-traffic-dance2die.herokuapp.com/?user=dance2die)(source on [GitHub](https://github.com/dance2die/github-traffic-views)), which requires a GitHub API key to be passed to Heroku application.

### Problem

Initially, the API key is stored in a file, which is untracked by Git. It was fine until when I found out that Heroku requires files to be published to be tracked by Git.

I didn't want to expose my secret string to GitHub, which is very easily searchable as Jamie Taylor points out in his blog post, [User Secrets – What Are They And Why Do I Need Them?](https://dotnetcore.gaprogman.com/2017/09/07/user-secrets-what-are-they-and-why-do-i-need-them/) (Jamie talks about how to use User Secrets, please refer to it if you are dealing with .NET Core).

So the alternative is to use an environment variable and make it available on Heroku.

### Recap of Accessing API key locally

In a previous blog post, [Hiding API Keys on GitHub](https://www.slightedgecoder.com/2017/07/08/hiding-api-keys-github/), I wrote about how to hide an API using an environment variable.

Suppose that your node app access a key via an environment variable, `process.env.GITHUB_DEVELOPER_KEY`

`gist:dance2die/bad081a2b6087d35308b0296a2e43dea`

In Windows, you can set the environment variable as follows

`gist:dance2die/a980d158b15283e67bd0a66aaa491267`

But the problem is that, `GITHUB_DEVELOPER_KEY` is available only in your local machine and won't be available after publishing to Heroku.

So after publishing your application to Heroku, you need to set an environment variable for `GITHUB_DEVELOPER_KEY` on deployed Heroku application, as well.

### How do we set the environment variable on Heroku?

When publishing to Heroku, you need to use [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). One of the options for the command is to set a configuration variable.

The command is `heroku config:set<ENVIRONMENT_VARIABLE>=<VALUE>` and the documentation is available on [Heroku Dev Center page](https://devcenter.heroku.com/articles/config-vars).

After deploying the node application, just set the configuration variable as shown below.

`gist:dance2die/51d26b65d120668ffd881c5f73941fe3`

- `heroku config:set` lets you set an environment variable on Heroku application, while
- `heroku config:get` retrieves the environment variable value.
- `heroku config` will return all the configuration values set for the application.

Now your node app will use that config var value set on Heroku application.

### Conclusion

I just showed you one of the ways to use Heroku config vars, which is to hide an API key.

You can use it to configure your app differently or pass other sensitive information such as database connection string.

