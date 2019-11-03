---
title: "Readability Conscious"
date: "2017-02-19"
coverImage: "featured-image-voynich-manuscript.jpg"
---

Featured Image - "[voynich](https://www.flickr.com/photos/figgenhoffer/2393781060/in/photolist-4DwKHf-6bPEf-5cD6N1-5cyPXP-5cD6W1-5cyQvi-5cD6YW-5cD75h-5cD6Sj-5cyQqv-yY54S-yY54V-87DHYs-mrZ7WV-eSstSZ-5cD7h1-6iiRn5-4pHvoE-cCqgiU-szWvt-c6niF5-c6nkQd-szSmU-c6mgyY-c6mTe1-c6nesd-yUjFT-c6maY1-c6mY3w-9tdawJ-c6mrm3-c6mxf1-c6nbMw-c6mnih-c6npwY-c6nx9U-c6mM1q-59qPmR-c6mBb9-c6n5FE-c6mFMN-c6n7CL-2fhmqn-4Vc476-6bLgg-5cT71Z-59v3Es-6bLcc-59v3Rb-6bL7S)" by [D.C.Atty](https://www.flickr.com/photos/figgenhoffer/), used under [CC BY](http://creativecommons.org/licenses/by/2.0/) / Dropped Quality to 60% from original - It's a featured image since nobody can figure out what's written in Voynich Manuscript. ;)

I've been solving [HackerRank](https://www.hackerrank.com) problems lately. HackerRank provides many coding problems.

\[caption id="attachment_277" align="alignright" width="300"\]![](https://www.slightedgecoder.com/wp-content/uploads/2017/02/HackerRank-Discussion-300x208.jpg) HackerRank Discussions\[/caption\]

Each problem has a discussion forum to post algorithms and sometimes answers. After solving each question, I compare my answers with those of others.

After reading [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) by Uncle Bob, and listening to [Coding blocks podcasts](http://www.codingblocks.net/) with titles that begin with "Clean Code - ", I decided to write a more readable code even for solving a simple question.

I noticed that many people ask in discussion what the code does.  Why would I have to write a code, which would require an explanation? Could I write more readable code that anyone can understand?

There is a question titled, [Balanced Brackets](https://www.hackerrank.com/challenges/balanced-brackets), which asks if brackets are closed or not. I see many answers that requires much thinking even though code is short.

Here is my solution for the question.

```csharp
public static void Main()
{
	int caseCount = Convert.ToInt32(Console.ReadLine());
	List<string> testCases = GetTestCases(caseCount).ToList();

	PrintMatchingBrackets(testCases);
}
```

Basically, all the code does is , get test cases and print matching brackets.

Here is the code for getting test cases; It just reads input from console.

```csharp
private static IEnumerable<string> GetTestCases(int caseCount)
{
	for (int i = 0; i < caseCount; i++)
	{
		yield return Console.ReadLine();
	}
}
```

Now, `PrintMatchingBrackets` simply delegates work to another function, which is aptly named, `PrintMatchingBracket`.

```csharp
private static void PrintMatchingBrackets(List<string> testCases)
{
	foreach (string testCase in testCases)
	{
		Console.WriteLine(HasMatchingBrackets(testCase) ? "YES" : "NO");
	}
}
```

Now, `HasMatchingBrackets` is a bit complicated but I abstracted most of low level code into separate functions or lambdas with names describing what each code does.

```csharp
private static bool HasMatchingBrackets(string testCase)
{
	// Matching brackets should have even number of brackets.
	Func<string, bool> hasOddLength = text => text.Length % 2 == 1;
	if (hasOddLength(testCase)) return false;

	var openingBracketMap = GetOpeningBracketMap();
	var closingBracketMap = GetClosingBracketMap();

	Func<char, bool> isOpeningBracket = c => openingBracketMap.Keys.Contains(c);
	Func<char, bool> isClosingBracket = c => closingBracketMap.Keys.Contains(c);

	var stackSize = testCase.Length / 2;
	Stack<char> stack = new Stack<char>(stackSize);
	Func<char, bool> isLastOneInStackMatching = c => stack.Peek() == closingBracketMap\[c\];

	foreach (char c in testCase)
	{
		if (isOpeningBracket(c))
			stack.Push(c);

		if (IsStackEmpty(stack) && isClosingBracket(c))
			return false;

		if (isClosingBracket(c) && isLastOneInStackMatching(c))
			stack.Pop();
	}

	return IsStackEmpty(stack);
}
```

I especially thought that adding `isOpeningBracket` and `isClosingBracket` increased the readability quite much since it describes my **intention**. Had I used `openingBracketMap.Keys.Contains(c)` inline, reader would have to try to figure out **why** I put that code in there. Describing the intention with the lambda name makes it clear.

If I really wanted to go further, I could have moved all bracket logic into another class and used a strategy pattern and whatnot, but I thought that it'd be too much for this simple problem. I had to draw a line somewhere. If another question comes up where this functionality is needed, then I'd refactor it into a library.

The above source code is available on [GitHub](https://github.com/dance2die/Problems.HackerRank/blob/master/Problems.HackerRank.DataStructure/Stacks/BalancedBrackets.cs).

I read [DotNet/CoreFX](https://github.com/dotnet/corefx) code on GitHub and it seems like it was written from top-down;Meaning top level code was written as just calling functions with meaningful names and just implement the lower level functions by breaking them down as small as possible thus making each function not spanning more than a screen.

I've been trying that approach and it seems to be making the code much more readable, modular, and maintainable since I can just call small functions elsewhere in many different functions, which reduces code duplication.

I approached the Balanced Bracket problem the same way. I wrote the "Main" code first, without any implementation and just simply implemented functions along the way.

### Conclusion

Solving coding questions and writing readable code helps me understand the question better and let me find an error in the code much easier. I will improve my programming skill so that other people can understand it by helping them read it like a book.
