---
title: My journey on Implementing Dijkstra's algorithm
date: '2017-04-20'
banner: ./images/Featured-Image-Edsger-W.-Dijkstra.jpg
published_at: '2017-04-20T15:40:02.000Z'
tags: 'blogentry, programming, algorithm, dijkstrasalgorithm'
author: Sung M. Kim
---

Featured Image of Edsger Wybe Dijkstra from [Wikipedia](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra#/media/File:Edsger_Wybe_Dijkstra.jpg), used under [CC BY 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

I've spent about 3 days trying to implement Dijkstra's algorithm after watching a YouTube video.

I've implemented three times (once a day) but on the 3rd day, I finally succeeded.

This entry is neither going to be about what Dijkstra's algorithm is nor how the implementation works. I will just talk about steps I took to implement it and post the full source link on the bottom.

Here is how I spent each day.

#### **Day 1**

I used [pseudocode on Wikipedia page](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode) and some other algorithms I found elsewhere. I failed splendidly because I didn't understand how the algorithm worked behind the scenes.

Here is the failed implementation.

```csharp
public List<T> GetPathBetween(Node<T> fromNode, Node<T> toNode)
{
    List<T> path = new List<T>();
    var dist = new Dictionary<Node<T>, int>();
    // unvisited nodes
    var fringe = new List<Node<T>>();

    foreach (KeyValuePair<Node<T>, Edge<T>\[\]> vertext in \_vertices)
    {
        // Unknown distance from source to v
        dist\[vertext.Key\] = int.MaxValue;   // int.MaxValue => infinity
        foreach (Edge<T> edge in vertext.Value)
        {
            dist\[edge.Node\] = int.MaxValue;
        }
        // All nodes initially in Q (unvisited nodes)
        fringe.Add(vertext.Key);
    }

    // Distance from source to source
    //KeyValuePair<Node<T>, int> first = dist.FirstOrDefault(pair => pair.Value == fromNode.Value);
    KeyValuePair<Node<T>, int> first = dist.FirstOrDefault(pair => pair.Key.Value.Equals(fromNode.Value));
    dist\[first.Key\] = 0;    // distance from itself is 0

    while (fringe.Count > 0)
    {
        // shortest path
        var processed = dist.Where(pair => !path.Contains(pair.Key.Value)).ToList();
        Node<T> m = processed.FirstOrDefault(pair => pair.Value == processed.Min(p => p.Value)).Key;
        int mDist = dist\[m\];
        fringe.Remove(m);

        if (!\_vertices.ContainsKey(m))
        {
            dist.Remove(m);
            continue;
        }

        foreach (Edge<T> w in \_vertices\[m\])
        {
            if (dist\[w.Node\] == int.MaxValue)
            {
                dist\[w.Node\] = mDist + (mDist + w.Weight);
                fringe.Add(w.Node);
            }
            else
            {
                dist\[w.Node\] = Math.Min(dist\[w.Node\], mDist + (mDist + w.Weight));
            }
        }
        path.Add(m.Value);
    }

    return path;
}
```

It's basically a hodgepodge of a mess (the last implementation looks ugly as well by the way) and doesn't work at all. I knew that I was lacking knowledge on how the algorithm worked.

#### Day 2

After understanding how the algorithm works was important, I found a [great video](https://youtu.be/zXfDYaahsNA) on YouTube by [Sesh Venugopal](https://www.youtube.com/channel/UC3QLHt6mHfmg4x_h2am7ecg) and watched it before implementing another version.

<iframe width="560" height="315" src="https://www.youtube.com/embed/zXfDYaahsNA" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

The video explains **visually** how the algorithm works. The video also explains its own version of the algorithm. I decided to use the algorithm in the video to implement for the second time.

But I failed beautifully again because I couldn't get the Wikipedia and other versions of algorithms out of my head.

Here is the 2nd failed attempt.

```csharp
public List<Node<T>> GetPathBetween2(Node<T> fromNode, Node<T> toNode)
{
var s = \_vertices;
var dist = new Dictionary<Node<T>, int>();
var prev = new Dictionary<Node<T>, T>();
var Q = new List<Node<T>>();
var processed = new List<Node<T>>();

    // Initial
    KeyValuePair<Node<T>, Edge<T>\[\]> first = s.First(pair => pair.Key.Value.Equals(fromNode.Value));
    foreach (var v in \_vertices.Where(pair => !pair.Key.Value.Equals(first.Key.Value)))
    {
        foreach (Edge<T> edge in v.Value)
        {
            dist\[edge.Node\] = int.MaxValue; // inifinity
            Q.Add(edge.Node);
        }
    }

    foreach (Edge<T> edge in first.Value)
    {
        dist\[edge.Node\] = edge.Weight;
        Q.Add(edge.Node);
    }

    dist\[first.Key\] = 0;
    prev\[first.Key\] = first.Key.Value;
    Q.Add(first.Key);

    while (Q.Count > 0)
    {
        var notProcessed = dist.Where(pair => !processed.Contains(pair.Key)).ToList();
        if (notProcessed.Count == 0) break;

        // Remove the minimum distance vertex, say m, from the fringe
        // (it is done, the shortest path to it has been found)
        Node<T> u = Q.First(node =>
        {
            var min = notProcessed.Min(pair => pair.Value);
            return dist\[node\].Equals(min);
        });
        Q.Remove(u);

        if (\_vertices.ContainsKey(u))
        {
            foreach (Edge<T> v in \_vertices\[u\])
            {
                var alt = dist\[u\] + v.Weight;
                if (alt < dist\[v.Node\])
                {
                    dist\[v.Node\] = alt;
                    if (!prev.Values.Contains(u.Value))
                        prev\[v.Node\] = u.Value;
                }
            }
        }

        if (u.Value.Equals(toNode.Value))
        {
            prev\[toNode\] = toNode.Value;
            return new List<Node<T>>(prev.Distinct().Select(pair => new Node<T>(pair.Value)));
        }

        processed.Add(u);
    }

    return prev.Select(pair => pair.Key).ToList();

}
```

#### Day 3

I read Wikipedia pseudocode again. I was armed with the knowledge of how the algorithm worked after watching the video, I decided to read Wikipedia algorithm and give it one more try.

After some struggle here and there, I've finally completed the implementation.

It's kind of funny that, after watching it work, I felt ecstatic and felt a jolt in my head. "Ah, this is why I decided to learn to program" was my first thought after realizing what happened.

Here is the 3rd working implementation.

```csharp
public List<Node<T>> GetPathBetween3(Node<T> fromNode, Node<T> toNode)
{
var dist = new Dictionary<Node<T>, int>();
var prev = new Dictionary<Node<T>, Node<T>>();
var Q = new HashSet<Node<T>>();

    foreach (KeyValuePair<Node<T>, Edge<T>\[\]> v in \_vertices)
    {
        foreach (Edge<T> edge in v.Value)
        {
            // Unknown distance from source to v
            dist\[edge.Node\] = int.MaxValue;
            // Previous node in optimal path from source
            prev\[edge.Node\] = null;
            Q.Add(edge.Node);
        }
    }
    // Distance from source to source
    dist\[fromNode\] = 0;
    Q.Add(fromNode);

    // while Q is not empty:
    while (Q.Count > 0)
    {
        // Node with the Least distance will be selected
        // Note that order is not guaranteed.
        Node<T> u = (from distance in dist
                        where Q.Contains(distance.Key) && distance.Value == dist.Where(pair => Q.Contains(pair.Key)).Min(pair => pair.Value)
                        select distance.Key).FirstOrDefault();

        if (u.Value.Equals(toNode.Value))
        {
            var S = new Stack<Node<T>>();
            while (prev.ContainsKey(u))
            {
                S.Push(u);
                u = prev\[u\];
            }
            S.Push(u);
            return S.ToList();
        }

        Q.Remove(u);
        if (!\_vertices.ContainsKey(u)) continue;

        foreach (Edge<T> v in \_vertices\[u\])
        {
            var alt = dist\[u\] + v.Weight;
            if (alt < dist\[v.Node\])
            {
                dist\[v.Node\] = alt;
                prev\[v.Node\] = u;
            }
        }

    }

    return null;

}
```

It's by no means production ready, so copy/paste at your own risk. I'd never release this to production without heavy testing and refactoring first.

Here is the full source (including Main, Node, Graph implementations) on [GitHub](https://github.com/dance2die/Demo.LearnByDoing/tree/master/Demo.LearnByDoing.General/Algorithms/Dijkstra).

Also, check out [Max Burstein](https://github.com/mburst)'s [C# implementation](https://github.com/mburst/dijkstras-algorithm/blob/master/dijkstras.cs) on GitHub. I found Max's implementation much cleaner and easier to understand.

### Conclusion

The journey was tough but was quite worth it. It has given me more confidence as a developer.

