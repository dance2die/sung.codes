---
title: Ubuntu - IBus not working on Visual Studio Code
date: "2020-09-03"
published: true
tags: "vscode, ibus, ime, troubleshoot"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [Philipp Reiner](https://pixabay.com/users/philippreiner-685280/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=590114) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=590114)"
---

## TL;DR

Install the official `.deb` version of VS Code.

## Issue

Running Ubuntu 20.04 LTS, I was unable to type in Korea in VS Code as I was trying out [react-i18next](https://react.i18next.com/).

IBus IME doesn't work on [Snap version of VS Code](https://snapcraft.io/code), reported on GitHub but not addressed.

1. [Snap: keyboard input method ibus for Korean doesn't work. #68625](https://github.com/microsoft/vscode/issues/68625)
1. [Can't input Chinese in Linux system #46941](https://github.com/Microsoft/vscode/issues/46941)

## What happened?

Ubuntu 20.04 version of "Ubuntu Software" now installs snap version of software.  

Refer to [Ubuntu Switches to a Snap’d Software Store for 20.04](https://www.omgubuntu.co.uk/2020/02/ubuntu-snap-store-transition)

## Resolution

Go and download the official `.deb` version of VS Code...  
Yes. That worked great.

> Refer to the "answer #4" in [linux - japanese input is not possible on vscode on ubuntu](https://www.tutorialfor.com/questions-81682.htm)

---

Image by <a href="https://pixabay.com/users/philippreiner-685280/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=590114">Philipp Reiner</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=590114">Pixabay</a>