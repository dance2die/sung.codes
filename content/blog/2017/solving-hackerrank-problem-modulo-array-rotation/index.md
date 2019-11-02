---
title: "Solving a HackerRank Problem with Modulo Array Rotation"
date: "2017-01-14"
coverImage: "featured-image-2017.01.13.jpg"
---

On December 25th of 2016, I wrote about [AWESOMENESS OF % (MODULO OPERATOR)](https://www.slightedgecoder.com/2016/12/25/awesomeness-modulo-operator/). I was able to apply the knowledge I learned to solve a [HackerRank](http://hackerrank.com/) warm-up question, [Circular Array Rotation](https://www.hackerrank.com/challenges/circular-array-rotation).

The gist of the question is to rotate an array multiple times, given the data from console and then print the output.

It was exactly the situation where I can apply the concept I wrote about in [AWESOMENESS OF % (MODULO OPERATOR)](https://www.slightedgecoder.com/2016/12/25/awesomeness-modulo-operator/).

I tried to solve it by rotating it the number of times entered by the user, but the tests were failing for very large input data. Here is the initial implementation.

private static int\[\] RotateRightNTimes(int\[\] a, int k)
{
	int\[\] result = a;
	for (int rotateIndex = 0; rotateIndex < k; rotateIndex++)
	{
		result = RotateRightOnce(result);
	}

	return result;
}

private static int\[\] RotateRightOnce(int\[\] a)
{
	int\[\] result = new int\[a.Length\];

	for (int i = 0; i < a.Length; i++)
	{
		result\[(i + 1) % a.Length\] = a\[i\];
	}

	return result;
}

As shown above, it's very naive implementation of rotating. If I had thought this through, I could have made it faster from the get-go by adding the number of positions to rotate instead of adding 1 in line 18 (`result[(i + 1) % a.Length]`).

My second approach was just as I describe above and just add number of rotation count.

private static int\[\] RotateRightNTimes2(int\[\] a, int rotateCount)
{
	int\[\] result = new int\[a.Length\];

	for (int i = 0; i < a.Length; i++)
	{
		result\[(i + rotateCount) % a.Length\] = a\[i\];
	}

	return result;
}

Now there is only one method and now it takes **O(n)** to rotate instead of **O(N^2)**.

Full source is available on [GitHub](https://github.com/dance2die/Problems.HackerRank/blob/master/Problems.HackerRank.Algorithms/WarmUp/CircularArrayRotationMain.cs).

### Conclusion

Being able to apply what I've learned recently and wrote about seems to make a long last memory. I will have to change my approach on learning;I'd learn new things as if I will have to apply it in short or long term.
