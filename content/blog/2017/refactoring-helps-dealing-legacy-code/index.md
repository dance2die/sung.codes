---
title: How Refactoring Helps Dealing with Legacy Code
date: '2017-06-11'
banner: ./images/featured-image.jpg
published_at: '2017-06-11T13:36:50.000Z'
tags: 'blogentry, programming, beyondlegacycode, book'
author: Sung M. Kim
---

You are writing code either professionally or for fun. A lot of times, we think that our code will never change.

But then we run into many situations where that's not the case.

- Clients/business partners call you and ask to update business logic and add more functionalities.
- You are working on a personal project and you want to add a new feature as fast as possible.
- A bug is reported and it's not easy to test your code thus requires changing the code for the sake of testing.

What would help you to mitigate these issues?

I recently read [Beyond Legacy Code: Nine Practices to Extend the Life (and Value) of Your Software](https://pragprog.com/book/dblegacy/beyond-legacy-code) by [David Scott Berstein](https://tobeagile.com/about/). The book is about how to deal with codes that are hard to maintain and test. Chapter 13 deals with a practice of [refactoring](https://en.wikipedia.org/wiki/Code_refactoring). When you constantly refactor your code, it becomes more understandable and testable.

"Beyond Legacy Code" discusses why refactoring is necessary but a concrete implementation example is not present. I'd like you to be familiarized with steps necessary to make a method more maintainable and testable after a series of refactorings.

Let's implement a method, `GetIndexAfterFoundWord`, which searches a word within a text and returns an index after the found word.

E.g.) If you search for a word "_long_" in "_This is a long text to be searched_". "_long_" is found at index 10 (zero-based) and the method returns an index after found word. In this case, the method returns 14 (index 10 + 4, which is the length of "_long_").

**Note**: Don't try to understand the code. Just skim through and imagine how hard it'd be to update the code.

private static int GetIndexAfterFoundWord(string text, string searchWord)
{
	// Build Prefix KMP Table
	int j = 0;
	int i = j + 1;
	int\[\] T = Enumerable.Repeat(0, searchWord.Length).ToArray();
	T\[0\] = 0;

	while (i < searchWord.Length)
	{
		if (searchWord\[i\] == searchWord\[j\])
		{
			T\[i\] = j + 1;
			j++;
			i++;
		}
		else
		{
			while (j >= 1 && searchWord\[j\] != searchWord\[i\])
			{
				j = T\[j - 1\];
				if (j == 0) break;
			}

			if (searchWord\[j\] == searchWord\[i\])
				T\[i\] = j + 1;

			i++;
		}
	}

	// Search searchWord using the table.
	int wi = 0;  // index position for searchWord
	int m = 0;  // index position for text
	List<int> found = new List<int>();

	while (m + wi < text.Length)
	{
		if (text\[m + wi\] == searchWord\[wi\])
		{
			wi++;
			if (wi == searchWord.Length)
			{
				found.Add(m);
				m = m + wi - T\[wi - 1\];
				wi = T\[wi - 1\];
			}
		}
		else
		{
			if (T\[wi\] == 0)
			{
				m = m + wi + 1;
				wi = 0;
			}
			else
			{
				m = m + wi;
				wi = (wi - 1) < 0 ? 0 : T\[wi - 1\];
			}
		}
	}

	// return the index after found word
	return found.First() + searchWord.Length;
}

It uses [Knuth-Morris-Pratt (KMP) algorithm](https://en.wikipedia.org/wiki/Knuth%2525E2%252580%252593Morris%2525E2%252580%252593Pratt_algorithm) to return found indices and simply returns found index + search word length.

The problem is that `GetIndexAfterFoundWord` is very hard to read and also hard to make changes. It doesn't have to know about building a prefix table. The method only needs to know **what** KMP does and doesn't need to know **how** it works.

Let's abstract table building and search code into methods by using [Extract Method](https://refactoring.com/catalog/extractMethod.html) refactoring.

#### First Refactoring

Here is `GetIndexAfterFoundWord2` after the refactoring.

private static int GetIndexAfterFoundWord2(string text, string searchWord)
{
	int\[\] prefixTable = BuildPrefixTable(searchWord);
	int\[\] found = SearchByKmp(text, searchWord, prefixTable);
	return found.First() + searchWord.Length;
}

Now the code is more intention revealing and the code is self-documenting (at this point, comments are redundant since the method name shows what each line does).

But the problem mentioned before refactor still exists.

`GetIndexAfterFoundWord2` still knows too much about the internals of KMP thus not operating at the same level of abstraction of `GetIndexAfterFoundWord2`.

Let's wrap the KMP search logic in a class using [Extract Class](https://refactoring.com/catalog/extractClass.html) refactoring.

#### Second Refactoring

Here is `GetIndexAfterFoundWord3` after 2nd refactoring.

private static int GetIndexAfterFoundWord3(string text, string searchWord)
{
	KmpSearch kmpSearch = new KmpSearch();
	int\[\] found = kmpSearch.Find(text, searchWord);
	return found.First() + searchWord.Length;
}

Now KMP code can be reused and the abstraction level is the same. KMP algorithm is now reusable.

The last problem is that, if we need to test `GetIndexAfterFoundWord3` or make changes to the underlying implementation of the search algorithm, then we need to update `GetIndexAfterFoundWord3`, which violates the [Open-Close Principle](https://en.wikipedia.org/wiki/Open/closed_principle).

Open-Close Principle states that

> _software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification_

`GetIndexAfterFoundWord3` doesn't need to know which algorithm it is using so let's abstract one more time by creating an interface and interact with search code via the interface ([Extract Interface Refactoring](https://refactoring.com/catalog/extractInterface.html)).

#### Third Refactoring

Here is `GetIndexAfterFoundWord4` after Extract Interface Refactoring.

private static int GetIndexAfterFoundWord4(string text, string searchWord, ITextSearch textSearch)
{
	int\[\] found = textSearch.Find(text, searchWord);
	return found.First() + searchWord.Length;
}

Now `GetIndexAfterFoundWord4` doesn't know **how** text search functionality is implemented. It just knows that `textSearch` returns an index and that's all `GetIndexAfterFoundWord4` has to know about.

This method is easily **testable** because you can mock out `ITextSearch` and pass any object you need to.

 

Let me show you how easy it is to replace the algorithm.

I created a class, `SlowSearch` that implements `ITextSearch`.

public static void Main(string\[\] args)
{
	string text = "This is a long text to be searched";
	// A word to search within "text".
	string searchWord = "long";

	int nextIndex = GetIndexAfterFoundWord4(text, searchWord, new KmpSearch());
	Console.WriteLine("Result of GetIndexAfterFoundWord4 using KmpSearch  = " + nextIndex);
	
	nextIndex = GetIndexAfterFoundWord4(text, searchWord, new SlowSearch());
	Console.WriteLine("Result of GetIndexAfterFoundWord4 using SlowSearch = " + nextIndex);
}

Both of them return the same result using different search algorithm.

Result of GetIndexAfterFoundWord4 using KmpSearch  = 14
Result of GetIndexAfterFoundWord4 using SlowSearch = 14

I've implemented this demo in a console application so the method is static and accepts all parameters. But if `GetIndexAfterFoundWord4` were a class method, you can inject ITextSearch into a method using a [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern).

#### Last Refactoring

public class IndexIterator
{
	private readonly ITextSearch \_textSearch;

	public IndexIterator(ITextSearch textSearch)
	{
		\_textSearch = textSearch;
	}

	public int GetIndexAfterFoundWord(string text, string searchWord)
	{
		int\[\] found = \_textSearch.Find(text, searchWord);
		return found.First() + searchWord.Length;
	}
}

You can either mock out ITextSearch object instance in a test using a mock or pass an instance using a [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) using a framework like [Ninject](https://www.ninject.org/).

After reaching the final step, `GetIndexAfterFoundWord` is

1. easy to read and understand the logic
2. easily testable
3. easy to find bugs
4. easily extendable
5. operating on the same level of abstraction

And lastly, it does one thing and one thing well ([Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)).

### Conclusion

After series of refactorings, we achieved, more modular, reusable code, and also easily testable.

I hope you can now see why refactoring helps improving legacy code.

If you want to know more about refactoring, check out Martin Fowler's book, [Refactoring Improving the Design of Existing Code](https://martinfowler.com/books/refactoring.html).

The code is available on [GitHub](https://github.com/dance2die/Blog.RefactorDemo).

