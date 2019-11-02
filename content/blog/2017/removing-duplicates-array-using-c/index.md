---
title: "Removing Duplicates from an Array (Using C#)"
date: "2017-03-18"
coverImage: "featured-image-removed-by-Don-Crowley.jpg"
---

\* Featured Image - "[removed.jpg](https://www.flickr.com/photos/doncrowley/2194796278/in/photolist-4kWUt9-7nJpV8-7t4XtP-8yCe1C-5iFzwq-8yCd2u-247GL-2hZHyH-247Er-j7z7T-b5fzx-4vqboo-h8DgpC-4WH8Lw-Re2ChR-jnfYUr-4WHaDw-4ZRqzt-247GT-247GS-4Ky6xK-247GN-247Gz-247GK-arm2re-6Vb9QA-5XRyEq-b3d2BD-G9oA9n-e4VTdH-dvgarU-dkRhkT-bsfoE5-8ZmUAd-5bWCeC-6aAXSt-jKr7zA-baHzmc-4WCR5x-syW9C5-jnfXcD-dg8w16-4WCVQp-4WCUsF-4ZRqex-4WHbmu-nN3hSJ-6icUnS-SSCTUz-8jAAex)" by [Don Crowley](https://www.flickr.com/photos/doncrowley/), used under [BY SA](https://creativecommons.org/licenses/by-sa/2.0/)

I've experimented a few different ways to remove duplicate items in an array.

An array could be either ordered or not.

There are many solutions to this problem and I will show two different ways for "unordered" array, and one for the ordered one.

Let's take care of the easy one first.

#### **Case 1 -** Removing duplicates from an _ordered_ array.

Supposed that you are given an array, _{1, 2, 2, 3, 4, 4, 4, 5}_.

Since an array is ordered, you can simply check if a next item is same as the current item being checked against. Here is the function, which implements the algorithm.

private static int\[\] RemoveDuplicatesByCheckingPreviousElement(int\[\] a)
{
	List<int> result = new List<int>();
	for (int i = 0; i < a.Length - 1; i++)
	{
		if (a\[i\] != a\[i + 1\])
		{
			result.Add(a\[i\]);
		}
	}

	result.Add(a\[a.Length - 1\]);
	return result.ToArray();
}

You only add the current item, if the next one is not the same as the current one. E.g.)

E.g.) While on the 3rd item, "2", then the next item is "3", so we know that we have passed through all possible duplicates since the array is sorted. We need to add the last item to the result because the last one doesn't have the next element to check for a duplicate (line #12).

You can find more details on this YouTube video, [How to remove duplicates from a sorted array in C/C++](https://youtu.be/kdAiCZQVuvI). The source is in C++ but I translated it to C#.

#### **Case 2.1** - Removing duplicates from an _unordered_ array using a set.

By definition, a set doesn't allow duplicate value. So in .NET, instantiating a HashSet object by passing an array would have removed duplicates automatically. But the point of this exercise is to do so manually. I am using [HashSet](https://msdn.microsoft.com/en-us/library/bb359438(v=vs.110).aspx) because it has an O(1) lookup time while an array has an O(N) time complexity.

The algorithm is simple. While going through each item in the array, if the current item has not been seen, we add it to the set as demonstrated in following code snippet.

private static int\[\] RemoveDuplicatesUsingHashTable(int\[\] a)
{
	HashSet<int> alreadySeen = new HashSet<int>();
	foreach (int item in a)
	{
		if (!alreadySeen.Contains(item))
			alreadySeen.Add(item);
	}
	return alreadySeen.ToArray();
}

You can find details on this YouTube video, [\[Interview Question\] Duplicate Integers in Array](https://youtu.be/H1TOX-TposY).

#### **Case 2.2** - Removing duplicates from an _unordered_ array by sorting it and check for next element for duplicates.

The algorithm is to sort the current array and apply case 1 algorithm.

private static int\[\] RemoveDuplicatesBySortingFirst(int\[\] a)
{
	Array.Sort(a);
	return RemoveDuplicatesByCheckingPreviousElement(a);
}

Note that `RemoveDuplicatesByCheckingPreviousElement` is the function name from case 1.

Sorting the array takes O(N log N) time and case 1, O(N), which results in O(N) total time complexity.

### Conclusion

When you were asked to solve this problem in an interview, ask the interviewer if the array is sorted or not. Use any algorithms above depending on the context;

If the array is ordered, then use case 1 algorithm, else either 2.1 or 2.2. But be aware that case 2.2 returns an array in different order from the original one.

E.g.)  Given an array `a = {8, 1, 1, 3, 2, 2}`,

RemoveDuplicatesBySortingFirst(a)

Above function returns {1, 2, 3, 8}, not {8, 1, 3, 2}.

Full working source code can be found on [GitHub](https://github.com/dance2die/Demo.LearnByDoing/blob/master/Demo.LearnByDoing.General/RemoveDuplicatesProgram.cs).
