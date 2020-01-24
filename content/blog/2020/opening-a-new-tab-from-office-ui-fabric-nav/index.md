---
title: Opening a new tab from Office UI Fabric Nav
date: "2020-01-23"
published: true
tags: "react, ui fabric, office ui fabric, selfnote"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [Oberholster Venita](https://pixabay.com/users/ArtsyBee-462611/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1047275) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1047275)"
---

I was working with [Office UI Fabric](https://developer.microsoft.com/en-us/fabric#/controls/web) React library.  
Out of 9 links, I had to make 3 of them external (with `target="__blank"`)

The [documentation](https://developer.microsoft.com/en-us/fabric#/controls/web/nav) didn't show how to add external links nor a demo.

A quick search for `target` returned no result.  
There is this hard-to-find button, `See more`. Expanding it will show a `target` property.

![target not found](./images/target-not-found.jpg)

So all you have to do is to add `target` property with `__blank`.  
**Reference**: [Anchor target on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target).

```javascript
<Nav
  styles={{ root: { width: 300 } }}
  ariaLabel="Nav example similiar to one found in this demo page"
  groups={[
    {
      name: "Basic components",
      expandAriaLabel: "Expand Basic components section",
      collapseAriaLabel: "Collapse Basic components section",
      links: [
        {
          key: "React",
          name: "React Home Page",
          url: "https://reactjs.org/",
          target: "__blank",
        },
        {
          key: "r/reactjs",
          name: "r/reactjs",
          url: "https://www.reddit.com/r/reactjs/",
          target: "__blank",
        },
        {
          key: "sung.codes",
          name: "Sung's Home Page",
          url: "https://sung.codes/",
          target: "__blank",
        },
      ],
    },
  ]}
/>
```

## Demo

<iframe
     src="https://codesandbox.io/embed/nervous-hypatia-yeqyh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Office UI Fabric Nav external links"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Security Concerns

Opening a new link with `target="__blaink"` needs `rel="noopener noreferrer"` because [Links to cross-origin destinations are unsafe](https://developers.google.com/web/tools/lighthouse/audits/noopener).

Nav is to [add "rel" automatically for external links](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Nav/Nav.base.tsx#L105) with target specified but it didn't.

I've filed an [issue](https://github.com/OfficeDev/office-ui-fabric-react/issues/11785) to notify.

---

Image by <a href="https://pixabay.com/users/ArtsyBee-462611/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1047275">Oberholster Venita</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1047275">Pixabay</a>
