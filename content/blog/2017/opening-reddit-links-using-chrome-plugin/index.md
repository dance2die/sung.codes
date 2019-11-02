---
title: "Opening Reddit Links using Chrome Plugin"
date: "2017-06-25"
coverImage: "featured-image-2.jpg"
---

It was Saturday night. I had a lot of time on my hands so I decided to browse [Reddit](https://www.reddit.com/).

Reddit has so many links, clicking on each link manually was a burden to my hands and wasn't time efficient.

I decided to automate opening each link.

As mentioned, the first problem is that, I had to manually click each link on a page. 

<iframe style="border: 1px solid black;" width="560" height="315" src="https://www.youtube.com/embed/5oIhFixcm8Q" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

 

So I wrote a simple JavaScript to open links in Chrome developer console.

https://gist.github.com/dance2die/82ecc246b6def6233d94bd9acb5bad2b

But [Chrome prevents JavaScript from opening multiple tabs](https://stackoverflow.com/a/16757736/4035). So I used Internet Explorer, which allows JavaScript to open multiple tabs. 

<iframe style="border: 1px solid black;" width="560" height="315" src="https://www.youtube.com/embed/1gFCtkylShU" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

A problem occurred when I went to other Sub-Reddits in a new tabs. I had to open developer console again and paste JavaScript.

I found out that Chrome Plugin allows opening multiple tabs using JavaScript. After implementing a [simple plugin](https://github.com/dance2die/Chrome.Plugin.OpenRedditLinks), I was able to open links with a click of a button. 

<iframe style="border: 1px solid black;" width="560" height="315" src="https://www.youtube.com/embed/zo8Lp1XbURE" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

The last problem is that, I didn't want to click the plugin every time. So I decided to bind the plugin with a keyboard shortcut. 

<iframe style="border: 1px solid black;" width="560" height="315" src="https://www.youtube.com/embed/u6Uy_EoPc6A" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

Now I can open all links with a keyboard shortcut, `Ctrl+Alt+F`. 

<iframe style="border: 1px solid black;" width="560" height="315" src="https://www.youtube.com/embed/MVxDNaq_muo" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

 

### Conclusion

I was able to browse Reddit much faster than I could have had than clicking on each link manually.

There is already a Chrome plugin called [Reddit Enhancement Suite](http://redditenhancementsuite.com/) (RES), which was pointed out by "Aaron C" on Coding Blocks Slack Channel.

![](https://www.slightedgecoder.com/wp-content/uploads/2017/06/slack_2017-06-25_09-15-15.png)

 

 

 

This is a real handy plugin, which toggles all images in the main feed.
