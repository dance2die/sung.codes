---
title: Living on the edge with "dangerous"
date: "2019-01-13"
coverImage: "dangerous-logo.jpg"
---

As I've been using [Styled Components](https://www.styled-components.com/) (SC hereafter) and been wondering about the magic behind it.

Thankfully, Max Stoiber (a creator of SC) has written an article, [The magic behind styled-components](https://mxstbr.blog/2016/11/styled-components-magic-explained/) on how Styled Components work with [Tagged Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

At the end of article, Max finished the article with following sentence.

> I’m very excited to see what other use cases for tagged template literals people come up with!
>
> Max Stoiber

So I created [dangerous](https://www.npmjs.com/package/dangerous), a tagged template literal function, which accepts a dangerous text (such as malicious user input) and sets inner HTML of a component in SC like style.

##

Prerequisite

I will skip on what tagged template literal is or how it works as Max has [explained quite wel](https://mxstbr.blog/2016/11/styled-components-magic-explained/)l.

##

☢ What is "dangerous"?

When you pass a string to component, they are encoded to prevent malicious user input/scripts.

React team has made it hard to set `innerHTML` of a component to help developers accidentally set malicious string to prevent [XSS attacks](<https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)>).

But `dangerous` makes it easy to set an `innerHTML` value and returns a component with the unsafe HTML string.

<script src="https://gist.github.com/dance2die/e219cafdc2ffb319c37aea2ee994470d.js"></script>

<a href="https://gist.github.com/dance2die/e219cafdc2ffb319c37aea2ee994470d">View this gist on GitHub</a>

![](https://www.slightedgecoder.com/wp-content/uploads/2019/01/demo.gif)

Result of DangerousApp.js

As you can with SC, you can pass a component or an HTML tag to the `dangerous` like or even wrap SC component and vice versa.

<script src="https://gist.github.com/dance2die/ec603aaec1fe0bf7b735762ac58b9472.js"></script>

<a href="https://gist.github.com/dance2die/ec603aaec1fe0bf7b735762ac58b9472">View this gist on GitHub</a>

<iframe src="https://codesandbox.io/embed/14xvzn25lj?autoresize=1&amp;module=%2Fsrc%2Fdangerous.js&amp;view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

So if you need to style the dangerous component, either pass a SC component or wrap the dangerous component in SC component.

##

🤔 Why did you create it then?

I will be frank. It's quite useless in practice and promotes bad behavior.

It was mostly an academic project to learn how tagged template literal works & get used to TypeScript.

And a plan to migrate to TypeScript for React, and learn how to test it.

##

💀 Failures?

I've implemented it on [CodeSandbox](https://codesandbox.io/s/o85m91j8z) using vanilla JavaScript but wanted to try TypeScript.

_Like a kid with FOMO_

- Creating a JavaScript library with Webpack when using TypeScript wasn't as easy as I had anticipated.
  1. Trying to do/learn too many things at once (TypeScript, tagged template literal, CircleCI, etc) really made it worse.
  2. I've given up on writing tests in the prev v1.0 release (currently it's at 0.1.x).
  3. I decided to hold off after finishing Kent C. Dodd's Testing JavaScript course.

So the easy way out was to use [RollUp](https://github.com/rollup/rollup), which I've used before.

_But with TypeScript in play, it was harder as TypeScript has its own transpiler._

I also ended up bloating up the library size and had to learn how to fix it.

_Fixed by marking react methods as external dependencies in tsconfig._

![](https://www.slightedgecoder.com/wp-content/uploads/2019/01/bundle-phobia-size-comparison.jpg)

Size comparison on BundlePhobia

I remember making the same mistake while first learning React, trying to learn Redux, Node, Express, and all other related technologies all at once and got no where after shaving the yak for months.

But learning from these failures (try to use Rollup for simple libraries, don't use new language \[typescript\] without understanding how it works first, etc) was a great lesson.

##

👋 Parting Words

Many thanks to Max Stoiber to his [blog](https://mxstbr.blog/2016/11/styled-components-magic-explained/) & [Styled Components](https://github.com/styled-components/styled-components) for sharing his knowledge and code in public.

Frankly speaking, I've never had much need to use [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) at all.

Please don't hesitate to give me [any feedback](https://github.com/dance2die/dangerous/issues) (good or harsh, both are welcome) or changes required.

## 🏔 Resources

- [The magic behind styled-components](https://mxstbr.blog/2016/11/styled-components-magic-explained/)
- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) on MDN
- dangerous
  - [Source Code](https://github.com/dance2die/dangerous) (MIT) on GitHub
  - [NPM](https://www.npmjs.com/package/dangerous)
- [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Styled Components](https://www.styled-components.com/)
