---
title: Solving an XML Entity Deserialization Issue
date: "2016-12-31"
banner: ./images/featured-image-2016.12.31.png
published_at: "2016-12-31T16:49:12.000Z"
tags: "blogentry, programming, c, deserialization"
author: Sung M. Kim
---

I've recently released a new version of [MyAnimeListSharp](https://github.com/dance2die/MyAnimeListSharp) and I'd like to talk about a challenge I faced while implementing it.

[MAL (MyAnimeList.net) API](https://myanimelist.net/modules.php?go=api) returns search responses in an XML format instead of in JSON. To make library users' lives easier, I decided to deserialize the XML response into an object (either as [AnimeSearchResponse](https://github.com/dance2die/MyAnimeListSharp/blob/master/Project.MyAnimeList/Project.MyAnimeList/Core/AnimeSearchResponse.cs) or [MangaSearchResponse](https://github.com/dance2die/MyAnimeListSharp/blob/master/Project.MyAnimeList/Project.MyAnimeList/Core/MangaSearchResponse.cs)) for easier processing. Then Alas, I run into a problem. For some reason, I am not able to deserialize XML into an object due to undeclared XML entities such as `—`(&mdash;), `<` (&lt;) or  `>`(&gt;), etc...

Here is the edited sample response from MAL API for an anime search ("synopsys" section usually contains undeclared XML entities)

```xml
<?xml version=""1.0"" encoding=""utf-8"" ?>
<anime>
  <entry>
    <id>71</id>
	...
    <synopsis>Sousuke Sagara, ... on the battlefield.&lt;br /&gt; &lt;br /&gt;(Source: ANN, edited)</synopsis>
    <image>https://cdn.myanimelist.net/images/anime/2/75259.jpg</image>
  </entry>
  <entry>
    <id>72</id>
	...
    <synopsis>It's ... Kaname's classmate.&lt;br /&gt;&lt;br /&gt;(Source: ANN)</synopsis>
    <image>https://cdn.myanimelist.net/images/anime/4/75260.jpg</image>
  </entry>
</anime>
```

Hacking begins...

```csharp
public class SearchResponseDeserializer<T> where T : class
{
	public T Deserialize(string responseString)
	{
		using (var stringReader = new StringReader(responseString))
		using (
			var xmlReader = XmlReader.Create(stringReader,
				new XmlReaderSettings {DtdProcessing = DtdProcessing.Ignore}))
		{
			DisableUndeclaredEntityCheck(xmlReader);

			var xmlSerializer = new XmlSerializer(typeof(T));
			var result = xmlSerializer.Deserialize(xmlReader) as T;
			return result;
		}
	}

	private static void DisableUndeclaredEntityCheck(XmlReader xmlReader)
	{
         ...
	}
}
```

Here is the run-down of [`SearchResponseDeserializer.Deserialize`](https://github.com/dance2die/MyAnimeListSharp/blob/master/Project.MyAnimeList/Project.MyAnimeList/Util/SearchResponseDeserializer.cs).

1. Given the response string in XML format
2. Disable undeclared entity check
3. Deserialize.

The part I was having trouble figuring out was #2, disabling undeclared entity check. There is a limit to replacing all entities as an empty string and that solution is just not optimal since one never knows when XML response will change to return other unknown XML entities.

I looked for an alternative in .NET documentation. There were no properties to set or functions to call to disable the entity check. But I've found a way in one of StackOverflow [answer](https://stackoverflow.com/questions/3504227/prevent-xmltextreader-from-expanding-entities/22787825#22787825) (by [Sam Harwell](https://stackoverflow.com/users/138304/sam-harwell) who is a Microsoft MVP in .NET), which discusses how to use reflection to set an internal variable to bypass entity check.

```csharp
private static void DisableUndeclaredEntityCheck(XmlReader xmlReader)
{
	PropertyInfo propertyInfo = xmlReader.GetType().GetProperty(
		"DisableUndeclaredEntityCheck", BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);
	propertyInfo.SetValue(xmlReader, true);
}
```

`XmlReader` does not expose a property `DisableUndeclaredEntityCheck` publicly so it needs to be turned on using reflection. The property name is aptly named since you can guess what it does from the name.

I've never hacked my code this bad by having to set an internal property in .NET library. What I've learned from this challenge was that this experience has broadened my horizon that learning the internal of a framework can be useful in certain scenarios even though messing around with internal details is not a good idea most of time.
