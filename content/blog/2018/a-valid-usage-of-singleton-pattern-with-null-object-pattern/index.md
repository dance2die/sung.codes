---
title: "A valid usage of Singleton Pattern (with Null object Pattern)"
date: "2018-03-26"
coverImage: "featured-image-3.jpg"
---

Photo by [Chetan Menaria](https://unsplash.com/photos/oxVjCyH_ldQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/loneliness?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Singleton has a bad rep for being an anti-pattern. You might have been burned bad with it.

I learned from [Michael Outlaw](https://www.codingblocks.net/author/outlaw/) from [Coding Blocks podcast episode 16](https://www.codingblocks.net/podcast/episode-16-design-patterns-part-2-oh-behave/) that [Singleton pattern](https://en.wikipedia.org/wiki/Singleton_pattern) can come in handy in conjunction with [Null object pattern](https://en.wikipedia.org/wiki/Null_object_pattern).

Let's dive in.

### Why implement a Null object as a singleton?

42 minutes into the Coding Blocks Episode 16, Michael Outlaw explains two reasons.

1. "If you have two versions of null objects, they should be identical, why waste memory to have same nothingness repeated".
2. For equality checks - Each null object can be compared by reference.

Depending on a situation you might not even need to do a equality check as a null object usually does nothing (as you can see in the [example](#example) section below.)

**TL;DR** - You can stop reading here.

### Example

Here is an example of how you can use a Singleton pattern with a Null object pattern.

Suppose that there is a simple factory (PaymentStrategyFactory) that returns a strategy object instance for processing a payment given a provider name.

gist:dance2die/aad6b604536afeb10f71771cc42e3853

PayPal & ApplePay strategies return "Successful" or "Failed" process status at random.

gist:dance2die/8d0f0f6f47f01a516f1657a7e500dd7b

gist:dance2die/496655cf6ec63b4dd74da93c4e6e180b

If a provider name is not supported, the `PaymentStrategyFactory` simply returns an object of type `NullPaymentStrategy`, which implements `IPaymentStrategy`.

Singleton instance is achieved with a private constructor and a static `Instance` property.

gist:dance2die/8ae2a62261d3784c713a44b6eed24b56

gist:dance2die/dee349d007060c5701652fadfcbc4009

Let's put them together and process payments.

gist:dance2die/5897ad07ed0411dfec9cc2c22b0d3fbc

Results of `ProcessPayments()`.

gist:dance2die/1c76839c8c7f358018c2df0fa27ee2a0

### Conclusion

Googling [Singleton Anti Pattern](https://www.google.com/search?q=singleton+anti+pattern) results in many reasons why Singleton pattern is bad.

But when used judiciously, it can improve your code quality/memory/speed.

Source code is available on [GitHub](https://github.com/dance2die/blog.NullObjectSingletonPatterns).
