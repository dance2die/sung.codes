---
title: Learning Python and...
date: '2016-12-11'
published_at: '2016-12-11T05:00:38.000Z'
tags: 'blogentry, python, todayilearned'
author: Sung M. Kim
---

I've started learning Python recently and fell in love with expressiveness of the language. There were sometimes too many ways to get the same job done, which made me feel uneasy since it'd mean there could be many different patterns of code people could be writing.

I deal with mostly with .NET stack so I tried to give IronPython a try. I install IronPython support for Visual Studio 2015. I tried to install a package using PIP but there weren't many documentations or even blog posts that deal IronPython PIP support. I found a page but wasn't that helpful.

IronPython PIP required "ipy.exe" but it was nowhere to be found in my system, thus I had to install IronPython again, after installing one for Visual Studio 2015.

Everything should be good to go for me to install a PyPI package now.

Wrong!

The package I was trying to install called [ImageHash](https://pypi.python.org/pypi/ImageHash), had failed to install using "ipy.exe".

I tried to install the package using "pip" this time.

Failed again.

I am just trying to get a simple library installation but ended up spending 3+ hours.

I believe this is because I still don't see how Python works as a whole.

This is part of the learning curve and I gladly accept it.

