---
title: "BREADTH-FIRST TREE TRAVERSAL"
date: "2017-04-08"
coverImage: "featured-image-2017.04.08.jpg"
---

Featured Image - "[Trees](https://www.flickr.com/photos/rbh/14431865903/in/photolist-nZi5Wc-iPaKKA-5vsbCi-7T27xW-qwXZNW-cA254b-v7KBR-cGHLy5-eYcLS9-5nwc5b-7ZddkJ-S4PqiP-rwhx6n-b2x1Fz-k9T9qu-7WdxCi-5v6DBH-69THJB-9a83Tc-qLj55Z-dR7NWS-9YF3Su-bUurhS-9ierJ3-b2x5TV-howvfr-4rawjf-9xwTPZ-rkhaxS-5DC811-7eKKLj-RLksUu-9qrnoZ-9B2Lor-doRPFa-pebv7p-2193x-m2Afgp-9GU4BC-bVnUAS-e712bc-cXskaJ-8hhqUP-RPEM3-hBt2TR-njFjSY-d8udC9-9tXNXQ-h17NPK-oZHbQr)" by [RichardBH](https://www.flickr.com/photos/rbh/), used under [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)

In the previous article, [Depth-First Tree Traversal](https://www.slightedgecoder.com/2017/03/26/depth-first-tree-traversal/), I wrote about how to traverse trees with Depth-first approaches;In-Order, Pre-Order, and Post-Order traversals.

In this article, I will talk about the algorithm and an implementation for a breadth-first version.

As a spoiler, you don't have a use a recursion and it needs a familiar data structure.

I am going to use the same tree structure I used in the previous article.

![](./images/Binary-Search-Tree.jpg)Breadth-first traverse means going through each node from the root of the tree, then next level down and down until you reach the maximum height the tree.

When traversing a tree above, an algorithm needs to go from 4 2 6 1 3 5 7 from top down, left to right;4 is the root, next level down on the left, it's 2, then the node on the same depth, 6, and so on.

As you pass over each level, you need to keep a track of all the nodes sharing the same depth.

From the description, it looks like we need to process whichever node we encountered first in each depth. This is where a [queue](<https://en.wikipedia.org/wiki/Queue_(abstract_data_type)>) comes into play.

The algorithm is fairly simple.

> Add the root to the queue
>
> While the queue is not empty,
>
> Dequeue a node
>
> Process the node
>
> Queue left node of the node for further processing
>
> Queue right node of the node for further processing

Here is the implementation in C#.

```csharp
private static void TraverseBreadthFirst(TreeNode<int> root, List<int> list)
{
if (root == null) return;

    Queue<TreeNode<int>> queue = new Queue<TreeNode<int>>();
    queue.Enqueue(root);

    while (queue.Count > 0)
    {
        var node = queue.Dequeue();
        list.Add(node.Value);

        if (node.Left != null)
            queue.Enqueue(node.Left);

        if (node.Right != null)
            queue.Enqueue(node.Right);
    }
}
```

The implementation follows the algorithm almost word by word except for the simple validation guard clause in the first line.

After the method exits, the list will contain 4 2 6 1 3 5 7.

The working source is available on [GitHub](https://github.com/dance2die/Demo.LearnByDoing/blob/master/Demo.LearnByDoing.General/Tree/BreadthFirstTraversal.cs).

**Conclusion**

I've covered bothDepth-first and Breadth-first traversals in two entries.

Breadth-first traversal is less intuitive to implement than depth-first traversals but still easy to do so using a queue abstract data structure.
