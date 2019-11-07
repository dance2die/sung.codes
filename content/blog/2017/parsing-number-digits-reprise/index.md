---
title: Parsing a number into digits - Reprise
date: '2017-05-27'
banner: ./images/featured-image-numbers.jpg
published_at: '2017-05-28T00:09:17.000Z'
tags: 'blogentry, programming, c, digits'
author: Sung M. Kim
---

Featured Image - "[Numbers](https://www.flickr.com/photos/pagedooley/33012371924/in/photolist-Sic33h-axZ5BR-fmHjf2-ftyZh-cdkHVG-bVYosr-cdkHUd-bVYomR-cdkJaU-cdkJ9W-bVYooZ-cdkJ3L-bVYoo4-cdkJ33-cdkJ4A-cdkHWU-7XEruh-6aoKMB-58TTn-7pMfPC-5BCf-6cJTod-7mVfDM-bVYopD-DNnYH-7Dpz8d-jWGuhC-7ixpfM-pnNLmy-9A6rSx-pEgSWu-pnMNrB-oHqqL6-eoTrMt-6Smdj9-fYfgZq-6358Sy-a1DxLo-9mqFmA-m3CPo-mTjBQ-6q7D14-5pf3JR-9v4CfC-buw58e-qJyamo-9tM3Lx-9tQ1qE-iQhVK-kwYL7)" by [Kevin Dooley](https://www.flickr.com/photos/pagedooley/ "Go to Kevin Dooley's photostream"), used under [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)

On 3/11/2017, I wrote a blog entry [Parsing a Number into Digits](https://www.slightedgecoder.com/2017/03/11/parsing-number-digits/). While it's not hard to implement the method to parse a number into digits, I wanted a simpler way for quick tests.

After solving a problem, [Recursive Digit Sum](https://www.hackerrank.com/challenges/recursive-digit-sum), I fiddled around with a few different ways.

I will discuss the implementation as well as dis/advantage of it.

Before posting the 3/11 blog, I used to parse each digit at a time using [int.Parse()](<https://msdn.microsoft.com/en-us/library/b3h1hf19(v=vs.110).aspx>).

```csharp
private static IEnumerable<int> GetArray2(int value)
{
	if (value < 0) value = -1; // or Math.Abs

	string text = value.ToString();
	for (int i = 0; i < text.Length; i++)
	{
		yield return int.Parse(text\[i\].ToString());
	}
}
```

While reading the problem discussion forum, I ran into this [GO implementation of digit sum](https://www.hackerrank.com/challenges/recursive-digit-sum/forum/comments/293394) of a number by [sei40kr](https://www.hackerrank.com/sei40kr). I noticed that he simply subtracted a number character by '0'. It's just a simple ASCII algebra but that thought never occurred to me.

By the way, here is how the ASCII subtraction works.

E.g.) Ascii value of '1' is 49, '0' is 48, '2' is 50 and '9' is 57.  So basically subtracting an ASCII value of current number character with '0' becomes the number.

> '1' - '0' = 1 (49 - 48) '2' - '0' = 2 (50 - 48) ... '9' - '0' = 9 (57 - 48)

This implementation was faster than the "int.parse" one but still slower than the stack version. But the advantage is that it's easier to implement, more intuitive thus less error prone.

The implementation is the same as `GetArray2` and the only difference is that `GetArray3` returns an integer using subtraction (line# 8).

```csharp
private static IEnumerable<int> GetArray3(int value)
{
if (value < 0) value = -1; // or Math.Abs

    string text = value.ToString();
    for (int i = 0; i < text.Length; i++)
    {
    	yield return text\[i\] - '0';
    }
}
```

ASCII subtraction version is about 2~3 times faster than the int.parse version.

### Conclusion

For a quick testing, I'd use the int.parse version but for production code, I'd use the stack implementation.

While the former is easier to implement and less error prone, the latter is still much faster by the fact of two (Stack version is about 5~6 times faster than int.parse version).

A contrived benchmarking result came out as follows.

> Implementation using Stack: 00:00:04.0093535 Implementation using int.parse: 00:00:22.2908904 Implementation using ordinal number: 00:00:08.3212206

The source for this test is on [GitHub](https://github.com/dance2die/Demo.LearnByDoing/blob/66cb2da206d195f9989124bd160045890ca57276/Demo.LearnByDoing.General/ConvertIntegerToArrayProgram.cs).

