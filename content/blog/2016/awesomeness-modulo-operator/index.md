---
title: Awesomeness of % (Modulo Operator)
date: "2016-12-25"
banner: ./images/featured-image-2016.12.25.jpg
published_at: "2016-12-25T14:30:06.000Z"
tags: "blogentry, programming, modulo, motivation"
author: Sung M. Kim
---

One day, I was solving a coding question, for which, I had to shift each element in an array to the right. It is an easy task to do but I wanted to know if there was more "elegant way". After doing some Googling, I found one entry on [StackOverflow](https://stackoverflow.com), which blew my mind and I'd like to share it.

I've never much utilized an operator for modulo except when I had to check for "even" or "odd" numbers.

// right shift with modulus
for (int i = 0; i < arr.length; i++) {
demo\[(i+1) % demo.length\] = arr\[i\];
}

The code snippet above is an [answer](https://stackoverflow.com/a/21385230/4035) by [Artemkller545](https://stackoverflow.com/users/3123545/artemkller545) to this question, [shifting array elements to right?](https://stackoverflow.com/questions/21385066/shifting-array-elements-to-right/21385230#21385230) on StackOverflow. An example of shifting each element array to right would be

> you have an array, 1 2 3 4 5 6
>
> Shifting it to right by one: 6 1 2 3 4 5

When I looked at the code, it broadened my view of how I can use modulo and thought that I can use other operators in more clever way like that. The code isn't clever enough so that it'd need more than a minute to understand but it makes the shifting look dead simple.

I've learned a new trick today and just knowing one such application of an operator broadened my horizon.
