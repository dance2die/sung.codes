---
title: Prefetch lazy-loaded component
date: "2019-11-29"
published: true
tags: "react, devjournal, selfnote"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "[Image Credit](https://imgflip.com/i/25pd8f): Created with the Imgflip [Meme Generator](https://imgflip.com/memegenerator)"
---

[Cory House](https://twitter.com/housecor) has posted following tweet today.

https://twitter.com/housecor/status/1200554167644966912

Cory has pointed out a feature in [CRA](https://create-react-app.dev/) to enable prefetching lazy component, but I learned of a way to apply it on a project.

---

## Scenario

Suppose that you are building a customer intake site.

When a user receives a call, the user can quickly load up the initial customer page  
because the site is small because non-essential code is split (lazy loaded).

Validating user (to confirm that the user has the correct customer's page on) will be the idle time to prefetch the lazy component such as tabs to fill in the customer's information, and modal confirmation boxes, etc.

The typical workflow will be,

1. User searches for the customer
1. Customer page is loaded fast (initial site is small due to code split)
1. User confirms with customer if the right page is loaded (providing idle time for prefetch)
1. During the idle time, non-essential (not needed right away on load) such as modal or forms in tabs are loaded.
1. User can gather data from customer, and enter it quickly.

## Thoughts

So this would especially be effective for LOB (line of business) apps with lots of data to enter or look up.

Ones I can think of are,

1. **Intake screen** - where a user confirms the right customer page, and during that time, other forms/modals or non-essential but needed components are loaded.
1. **Dashboard** - where graphs outside the viewport is lazily but prefetched (user analyzing the top graph will give enough time for other graphs outside the viewport to be prefetched during that time)
1. Any **Master-detail** pages - e.g.) A site with lots of image with modal for details such as
   - [Unsplash](https://unsplash.com/)
   - [Pixabay](https://pixabay.com/)
1. **Nav menu** - Top level menu is loaded right away, and menu items shown on hover are loaded lazy but prefetched.

---

[Image Credit](https://imgflip.com/i/25pd8f): Created with the Imgflip [Meme Generator](https://imgflip.com/memegenerator)
