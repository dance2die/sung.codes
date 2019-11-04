---
title: Parsing a number into digits
date: '2017-03-11'
coverImage: featured-image-2017.03.11-parse.jpg
published_at: '2017-03-11T17:00:43.000Z'
tags: 'blogentry, programming'
author: Sung M. Kim
---

Featured Image - "[Miss South Carolina Powerset Parse](https://www.flickr.com/photos/powerset/1287236163/in/photolist-2XKqsX-92tLtK-83awUM-74vSFm-7uWvED-7oGauR-2m1HqN-6H8tfZ-6zV2qz-cX55Hb-5s8uxu-6YD2sU-9Ckr5z-rkAHXL-8dE8fG-gpH3Nw-i1Tfc-ifzWGW-aWh9jr-fKg1cH-7YJRQz-a78NC6-hCHGeB-k7M1Az-cnwmV7-7mCDZp-fq5rFC-8bd4ez-ifzZnA-kFQUjG-ifAqcT-4qwvGw-a7bFGA-679Fqh-huZnpg-36Kp9w-7vMS1s-5x36nq-4BbU8N-pkmtPi-r4exaS-5aHJVB-8f5q6X-5fwSs7-7iJCNf-9szExx-dpsK2Y-39C2hH-JXPcEf-BCo4q)" by [official_powerset](https://www.flickr.com/photos/powerset/), used under [BY SA](https://creativecommons.org/licenses/by-sa/2.0/) / Dropped Quality to 80% from original

I've run into situations where I had to parse a number into digits.

An easy way to do this is to convert a number into a string and returns a character array, and then convert each character into a number

When dealing with large sets of long numbers, it simply is not optimal.

There is a simple way to convert a number into digits, which requires a simple math.

Given an integer  "val =213", one might consider converting it to a string, breaking it to a character array and convert each character into an integer (it's so simple in LINQ, it's just tempting to implement it this way).

```csharp
private static List<int> GetDigitsUsingConversion(int val)
{
    return val.ToString().ToCharArray().Select(c => (int) c).ToList();
}
```

![](./images/conversion-cost-is-too-damn-high.jpg)

The cost of type conversion from an integer to a string, to an array, and then back to integer is too high.

Now let's take a look at another way using a simple math.

Given an integer 213, if you

1. divide it by 1 and mod 10, you get 3
2. divide it by 10 and mod 10, you get 1
3. divide it by 100 and mod 10, you get 2

If you look at the returned result, it's each digit returned in reverse order. There is a useful data structure, for holding data in reverse order, Stack.

An algorithm is fairly simple.

While the given number is greater than 0, divide it by 10^digit, put the digit into a stack, and lastly return the stack as a list.

```csharp
private static List<int> GetDigits(int val)
{
	Stack<int> stack = new Stack<int>();

	int number = val;
	while (number > 0)
	{
		var digit = number % 10;
		stack.Push(digit);

		number /= 10;
	}

	return stack.ToList();
}
```

During each iteration, "number" is divided by 10 so it is equivalent to dividing by 10^digit.

I did a simple benchmarking (contrived but works for a simple demo) and the one requiring a type conversion to a string ran about 2x as long.

```csharp
private const int UPTO = 1000000;

public static void Main(string\[\] args)
{
int val = 123456789;

    Stopwatch watch = new Stopwatch();

    watch.Start();
    for (int i = 0; i < UPTO; i++)
    {
    	List<int> digits = GetDigits(val);
    }
    watch.Stop();
    Console.WriteLine("GetDigit took {0}ms", watch.ElapsedMilliseconds);

    watch.Start();
    for (int j = 0; j < UPTO; j++)
    {
    	List<int> digits2 = GetDigitsUsingConversion(val);
    }

    watch.Stop();
    Console.WriteLine("GetDigitsUsingConversion took {0}ms", watch.ElapsedMilliseconds);

}

Result:

GetDigit took 754ms
GetDigitsUsingConversion took 1468ms
```

The source code is available on [GitHub](https://github.com/dance2die/Demo.LearnByDoing/blob/master/Demo.LearnByDoing.General/ParsingNumbersPerDigitProgram.cs).

### Conclusion

By using simple math, you can extract digits from a number.

It requires no type conversion thus saving run time.

