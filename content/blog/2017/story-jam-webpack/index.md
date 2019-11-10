---
title: The Story of JAM – How they dealt with multiple JavaScript files
date: "2017-12-24"
banner: ./images/featured-image-jam-preparations-jars-fruit-48817.jpg
published_at: "2017-12-24T21:40:14.000Z"
tags: "blogentry, story, babel, es6"
author: Sung M. Kim
---

**DISCLAIMER**: All characters appearing here are purely _**fictional**_. They just share the same first names of awesome [CodingBlocks podcast hosts](https://www.codingblocks.net/about/).

_This is the story of JAM (Joe, Allen, and Michael), who are average developers and how they started using Webpack._

Keith, the Software Engineering Manager walks into the office one day to check the progress of the project started by JAM three days ago. He found Allen and Michael playing Call of Duty while Joe was working on his project by himself.

“Hey, guys. Why is Joe the only one working on the project?” Allen replies to Keith, “Joe is fixing a bug on this ‘main.js’ file, which both Michael and I need to update.”

“Couldn’t you guys just create a new branch?” Keith suggested. “We were waiting for Joe’s quick bug fix to mitigate merge conflicts. But Joe’s been working on the quick fix for a few hours.” Michael tried to justify the situation while scratching his head.

“Listen up. I say there is never a better than time now to refactor that ‘main.js’ file into smaller modules so that you guys can work on the project independently.”, and then Keith adds, “And Joe, I want you to follow up with me tomorrow.”

After Keith left Joe chuckles awkwardly and sighed. “I knew that this was coming but I have been too busy for this...” “Well, Joe, we are in this together, mate.” Allen said energetically. “OK, these bawls are on me.” Joe replied as he reaches into his wine cooler. They worked until late that night.

Joe followed up with Keith following day that they were able to break the “main.js” into smaller files. They barely managed to finish the project on time after a few nights of death marches. But that's the price they paid for creating hard-to-maintain code.

The following week, Keith rushes into the JAM’s office and declares DEFCON 1.

“There is a good news and a bad news, guys. Which one you guys want to hear first?” Keith said while wearing a gloomy expression. “Everyone usually asks for the bad news but I want to hear the good news first” Joe replied while Allen and Michael nodded.

“The good news is that the CEO was very satisfied with your work on the company home page. She considers very highly of your abilities and requested 10 new features." "That's a great news, Keith" guys agreed. "And the bad news is that” Keith pauses for a second while clearing his throat. “Within 5 days…” Keith slurs the end of the sentence and continues. “Well, let’s have a quick meeting and get cracking.”

Two days into the project, Keith realized that project was progressing slowly so he decided to drop by.

“The problem is that we have too many JavaScript files and nobody can figure out the correct HTML script tag orders. It keeps halting us since the site keeps breaking whenever we add a new feature or a file.” Allen explained to Keith.

They could not come up with a good solution so Keith decided to call an internationally renowned rock star developer, James in UK branch on a conference call.

“Hi James, this is Keith. How have you been?” “Keith, I have a trouble hearing you guys since I am in a lift going down to the basement” James replied. Keith explained the situation to James in a nutshell.

James suggested, "For a **web** page with many dependencies, just **pack** them into a single file using a **module bundler**. You can…” but then the call was dropped as James reached the basement.

All Keith and the JAM gang heard was “web..pack… module bundler” due to low call quality. They didn’t have much clue but started researching “Webpack module bundler.”

After hours of trial and failures, they were able to get Webpack configured to bundle all their JavaScript files into one file.

“Wow, this is amazing, Joe. Webpack takes care of all module dependencies and all we have to do is require other files and let Webpack does bundling.” Allen said ecstatically. “Oh yeah, and also I’ve always wanted to utilize my ES6 skills and finally I can go crazy with it now with babel with ease.” Joe replied as he was sprinkling cheese powder in his “bawls cooler”. “Did you guys know that we can also minify the bundled file with only a few configuration changes?” Michael added. JAM was having fun with Webpack like kids in a candy store.

Joe brought up an issue while debugging. “Uhm, Michael, I have a problem. Minifying works fine until I had to debug it. The bundle is a jumbled up mess!” “Ah, I forgot to share with you guys that you can just turn on the source map option in the Webpack configuration and you can see the original source in the browser dev tools.” Michael explained and continued. “Webpack is like an onion. The more you use it the more you gotta know. There are just so many things you can do that it can be a bit overwhelming”.

After ironing out some Webpack issues here and there, the project picked up the momentum and they muddled through to complete the project.

JAM was having a lunch together the following week.

“I usually create small to medium sized websites and Webpack seems to be an overkill since you need to configure everything.” Joe shared his thoughts. “There’s gotta be a way to bundle our files without all those nitty gritty configuration details.” Allen agreed. Shawn, a developer from another team walks by overhearing the conversation and jumps in. “You know what guys?”

- To be cont’d.
