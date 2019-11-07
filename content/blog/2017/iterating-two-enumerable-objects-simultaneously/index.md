---
title: Iterating two enumerable objects simultaneously
date: '2017-01-09'
banner: ./images/Featured-Image-1.jpg
published_at: '2017-01-09T05:00:33.000Z'
tags: 'blogentry, programming, c, crackingthecoding'
author: Sung M. Kim
---

I was solving a question on Cracking the Coding Interview Edition 6 question 4.1

> Given a directed graph, design an algorithm to find out whether there is a route between two nodes.

My first attempt was a brute force approach of iterating all nodes in a graph. But then I thought about the possibility of having to deal with thousands or millions of nodes in a graph and my approach would not work.

```csharp
public bool HasRouteUsingDfs<T>(Node<T> node1, Node<T> node2)
{
	var nodeValues1 = GetValuesUsingDfs(node1).ToList();
	var nodeValues2 = GetValuesUsingDfs(node2).ToList();

	return nodeValues1.Contains(node2.Name) && nodeValues2.Contains(node1.Name);
}
```

where `GetValuesUsingDfs(...)`is just a graph iteration function using DFS (Depth-First Search) algorithm.

```csharp
private IEnumerable<T> GetValuesUsingDfs<T>(Node<T> node)
{
	var stack = new Stack<Node<T>>();
	stack.Push(node);

	while (stack.Count > 0)
	{
		var v = stack.Pop();
		if (!v.IsVisited)
		{
			v.IsVisited = true;
			yield return v.Name;

			foreach (Node<T> child in v.Children)
			{
				stack.Push(child);
			}
		}
	}
}
```

To be able to pull that off, I had to think of a way to run returned enumerators of `GetValuesUsingDfs(...)`  at the same time. Until now, I've been simply been using two nested for/foreach loops to accomplish such tasks. But ever since I've been conscious about Big O (where using two nested for/foreach would require B(N^2)), I was looking for a different way.

So the optimization technique I thought of was to iterate from both sides and if there is a common node between the two nodes, then there is a route. I can't exactly come up with any other striking idea since I am still reading the book, but I am sure that I will be able to apply more optimizations as I read the book.

Here is the code that utilizes simultaneous iteration.

```csharp
public bool HasRouteUsingDfs2(Node<int> node1, Node<int> node2)
{
	var nodes1 = GetValuesUsingDfs(node1);
	var nodes2 = GetValuesUsingDfs(node2);

	// Enumerate multiple lists one at a time using Depth-First Search
	using (var n1 = nodes1.GetEnumerator())
	using (var n2 = nodes2.GetEnumerator())
	{
		while (n1.MoveNext() && n2.MoveNext())
		{
			var nodeValue1 = n1.Current;
			var nodeValue2 = n2.Current;

			if (nodeValue1 == nodeValue2) return true;
		}
	}

	return false;
}
```

Now the function terminates as soon as a common node between the two nodes is found, which runs much faster for four of my test cases.  I've found simultaneous iteration code from StackOverflow as usual from [this question](http://stackoverflow.com/questions/18395943/using-foreach-to-iterate-simultaneously-through-multiple-lists-syntax-sugar) answered by [Eren Ersönmez](http://stackoverflow.com/users/201088/eren-ers%C3%B6nmez) (Answer is [here](http://stackoverflow.com/a/18396163/4035); Eren also created a generic "ZipAll" function that accepts any number of IEnumerables in the answer.)

While four tests using HasRouteUsingDfs ran for 0.06 seconds, optimized version using HasRouteUsingDfs2 ran within 0.001 seconds.

Full source for above codes is available on [GitHub](https://github.com/dance2die/Demo.LearnByDoing/blob/master/Demo.LearnByDoing.Tests/Chapter04/Chapter4_1Test.cs). You'd need [XUnit](https://github.com/xunit/xunit) to run the tests.

### Conclusion

It's not possible to iterate multiple enumerators using "foreach" but can use "GetEnumerator". I've been quite conscious about writing optimized code and this one just rocked since I never knew about this trick.

