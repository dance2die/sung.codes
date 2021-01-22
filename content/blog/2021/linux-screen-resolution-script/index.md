---
title: Linux screen resolution script
date: "2021-01-21"
published: true
tags: "linux, bash, script, screen"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [Pexels](https://pixabay.com/users/pexels-2286921/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1868496) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1868496)"
---

## TL;DR

Change Ubuntu desktop resolution using `xandr`.

1. Create a script to change resolution

```bash
#!/bin/bash
xrandr --output eDP-1-1 --mode $(basename $0)
```

2. Create "hard" symlinks with resolution as file names

```bash
# Make `resolution.sh` executable
# Create hard symlinks on the desktop
chmod +x ./resolution.sh
ln ./resolution.sh ~/Desktop/1920x1080
ln ./resolution.sh ~/Desktop/1280x720
```

## Introduction

During the pandemic, I started playing CS:GO ([Counter Strike: Global Offensive](https://blog.counter-strike.net/)) a lot.

When the desktop resolution doesn't match the game resolution, the game looks blurry.  
I play at 720p while the desktop is 1080p.

Changing resolution via Nautilus has its annoyance because it displays so many resolution options.

So I decided to write a bash script to change the resolution  
with a click of a button.

## Scripts

Initially I created two scripts

File Name: `1280x720`

```bash
#!/bin/bash
xrandr --output eDP-1-1 --mode 1280x720
```

File Name: `1920x1080`

```bash
#!/bin/bash
xrandr --output eDP-1-1 --mode 1920x1080
```

It worked great.  
But in [Coding Blocks slack channel](https://www.codingblocks.net/slack/) (#Linux), [Dave Follett](https://twitter.com/davefollett) gave me a tip that I can "abstract" the resolution by reading the file name as the resolution.

And why not?

## Abstracting the script

Dave taught me that `$0` [expands the name of the shell/script](https://bash.cyberciti.biz/guide/$0) and to extract the resolution (file name), I could use [basename](https://linux.die.net/man/1/basename).

So basically for a file on Desktop, `~/Desktop/1280x720`, `$0` returns `/home/dance2die/Desktop/1280x720` while `basename $0` will remove the directory, returning `1280x720`.

Then the result `1280x720` is passed to `xrandr`.

## Implementation

This means, I need to create 3 files; One main script, two hard symlinks.

Mainscript: `~/scripts/resolution.sh`

```bash
#!/bin/bash
xrandr --output eDP-1-1 --mode $(basename $0)
```

And then create two hard symlinks.

```bash
# Make `resolution.sh` executable
chmod +x ./resolution.sh
# Create hard symlinks on the desktop
ln ./resolution.sh ~/Desktop/1920x1080
ln ./resolution.sh ~/Desktop/1280x720
```

---

Image by <a href="https://pixabay.com/users/pexels-2286921/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1868496">Pexels</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1868496">Pixabay</a>
