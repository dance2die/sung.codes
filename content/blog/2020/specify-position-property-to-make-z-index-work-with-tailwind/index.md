---
title: Specify position property to make Z-index work
date: "2020-02-29"
published: true
tags: "tailwind, tailwindcss, css, z-index selfnote"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image Credit: [Commercial Trochus, Commercial Top Shell, Commercial Trochus, Commercial Top Shell](https://www.si.edu/object/nmnheducation_10008427)"
---

Just sharing what I learned today.

I was implementing a simple hamburger menu while learning Tailwind.  
Clicking on 🍔 (open button) would trigger a full page menu to open and replace the button with ❌ (close button).

The menu shows up but hid the close button.  
_thus unable to close the menu._

I initially put z-index value set to 10 with `z-10` on the menu item.

```js
<nav className="md:hidden">
  <span
                👇
    className="z-10 cursor-pointer text-3xl"
    onClick={toggleMenu}
  >
    {isMenuOpen ? "❌" : "🍔"}
  </span>
  {isMenuOpen && <FullMenu />}
</nav>
```

But the button was still shown under full page menu, `<FullMenu />`.

I found this article, [Z-index not working – troubleshooting](https://cssreset.com/z-indexnotworking/) after some Googling.

The article states that

> The Z-Index property will simply not work if there isn’t a specific positioning for an element that isn’t static

In my case, as `fixed/absolute/sticky` renders the button elsewhere, I assigned [relative](https://tailwindcss.com/docs/position/) position property.

_The equivalent CSS would be `position: relative;`_

```js
<nav className="md:hidden">
  <span
                       👇
    className="z-10 relative cursor-pointer text-3xl"
    onClick={toggleMenu}
  >
    {isMenuOpen ? "❌" : "🍔"}
  </span>
  {isMenuOpen && <FullMenu />}
</nav>
```

Now the button show up on the top.

<iframe
     src="https://codesandbox.io/embed/react-hamburger-1-rleky?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react hamburger #1"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

---

Image Credit: [Commercial Trochus, Commercial Top Shell, Commercial Trochus, Commercial Top Shell](https://www.si.edu/object/nmnheducation_10008427)
