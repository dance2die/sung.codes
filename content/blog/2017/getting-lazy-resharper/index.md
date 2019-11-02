---
title: "Getting lazy with Resharper"
date: "2017-02-04"
coverImage: "Featured-Image-by-Martin-Cron.jpg"
---

 Featured Image by [Martin Cron](https://www.flickr.com/photos/martincron/4127880673/in/photolist-5Uz3so-2s5eGW-2rZNMD-7hLt7r-5xjUSF-uB4au9-uBbC6n-64Qkeb-9EcyP-7VF6zc-9Tym55-9TvuTM) \*

I've been using [Resharper](https://www.jetbrains.com/resharper/) (R#), a Visual Studio plug-in for over 7 years. I've finally been able to convince the company I work for to purchase R# for other developers.

![](https://www.slightedgecoder.com/wp-content/uploads/2017/02/Resharper-300x116.jpg)

But a problem arose for a developer.

R# to the rescue.

A developer was having a problem dealing with Data Access Layer (DAL) DLL she was referencing in her website. She needed to change a stored procedure (sproc) called. It's not a significant problem since she has an access to the source code. It was just a matter of finding the project, open it, and then search for the method called.

But then she wanted to be "lazy" in a good way. She was looking for a more efficient way of finding the sproc name. If you ![](https://www.slightedgecoder.com/wp-content/uploads/2017/02/process-explorer-300x183.png)have ever used Visual Studio (VS), it's very resource intensive so that opening an instance takes a while, not to mention 5~6 instances she had to open to search different DAL projects.

(An instance of Visual Studio eats up _at least_ 300+ MB of memory when idle)

 

She's been using R# only for few months so she wasn't proficient. It was time to demonstrate the laziness I've been enjoying all these years.

It was just a matter of going to the method in question then VS would have decompiled the source when someone tries to go to the definition. But she had set a different default set so she was getting directed to "Object Explorer" window, which shows only class member names in DLLs.

Instead of changing the default, I just showed her how to use [Navigate To Decompiled Sources](https://www.jetbrains.com/help/resharper/2016.3/Navigation_and_Search__Navigate_from_Here__Decompiled_Code.html) context menu in R#. As soon as she selected the option, R# decompiled the source and she was able to find the sproc being called.

She just saved about 3~5 minutes of time. It doesn't sound like much but time adds up when you have to check 10 sprocs, which is equivalent to 30~50 minutes of developer time. Considering we, developers, are known to abhor menial tasks that take focus away, it was a huge gain in both time and effort.

### Conclusion

The transition to motivate other developers to use R# was tough since R# increases memory and CPU usage of VS. I was glad that someone wanted to become "lazy" and I was able to get a developer into using R# more.

By the way Bill Gates said it the best regarding being lazy.

> I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it
