---
title: "How to Pass HttpContext to Ninject in ASP.NET MVC"
date: "2016-12-04"
---

I've been working with ASP.NET MVC websites that creates a connection string based on a query string value.

I've been trying to learn how to use Ninject and decided to inject repository instances to controllers.

I ran into a problem where HttpContext object instance was not available at the time of kernel binding.

I found out a solution and I'd like to share how.

Here is a simple ASP.NET MVC controller that accepts IRepository object instance. "Index" simply returns a view with "HomeIndexViewModel", which accepts a connection string from the repository (this is a very contrived example).

<!-- prettier-ignore -->
```csharp
public class HomeController : Controller
{
		private readonly IRepository _repository;

		public HomeController(IRepository repository)
		{
				_repository = repository;
		}

		// GET: Home
		public ActionResult Index()
		{
				return View(new HomeIndexViewModel(_repository.ConnectionString));
		}
}
```

Repository accepts a connection string but it's retrieved via Query String argument of "db" parameter.

```csharp
public class Repository : IRepository
{
	public string ConnectionString { get; set; }

	public Repository(string connectionString)
	{
		ConnectionString = connectionString;
	}
}
```

I've created a simplified utility class, which returns a connection string depending on the query string parameter "db".

```csharp
public class QueryArgParser
{
	public HttpContext HttpContext { get; set; }

	public QueryArgParser(HttpContext httpContext)
	{
		HttpContext = httpContext;
	}

	public string GetConnectionString()
	{
		string dbValue = HttpContext.Request.QueryString["db"];
		switch (dbValue)
		{
			case "prod":
				return @"Server=GODDESS\\SQL2014;Initial Catalog=AdventureWorks2014;Integrated Security=SSPI";
			case "stage":
				return @"Server=GODDESS\\SQL2014;Initial Catalog=AdventureWorks2014Stage;Integrated Security=SSPI";
			case "dev":
				return @"Server=GODDESS\\SQL2014;Initial Catalog=AdventureWorks2014Dev;Integrated Security=SSPI";
		}

		throw new ArgumentException("Query string doesn't contain "db" parameter");
	}
}
```

I've installed following Ninject Nuget Packages.

![](http://i.imgur.com/X27wuyC.jpg)

Installing "Ninject.MVC3" will add a file called "NinjectWebCommon" under "App_Start" folder.

You can now register your dependencies in a method called "RegisterServices" within "NinjectWebCommon" class.

```csharp
private static void RegisterServices(IKernel kernel)
{
	const string dataAccessParameterName = "connectionString";
	Func<HttpContext, string> getConnectionString =
		context => context != null ?
                    new QueryArgParser(context).GetConnectionString() :
                    string.Empty;

	kernel.Bind<IRepository>()
		.To<Repository>()
		.WithConstructorArgument(dataAccessParameterName,
			ninjectContext => getConnectionString(HttpContext.Current));
}
```

Line 9~13 binds "IRepository" to "Repository", which requires a contructor argument of connection string. "getConnectionString(...)" in line 4~7 is just to make the code more readable.

What's important here is the line 12~13, which is the callback within "WithConstructorArgument" that is called during RunTime, therefore "HttpContext.Current" is not null.

Now set the web start page to "?db=prod", "?db=stage", or "?db=dev"

![](http://i.imgur.com/p4JDvMc.png)

You will see the connection string on the web page as shown below (this is for "?db=prod")

![](http://i.imgur.com/5Xy3fI0.png)

I've found the [answer](http://stackoverflow.com/a/3617961/4035) via StackOverflow answered by "[Ruben Bartelink](http://stackoverflow.com/users/11635/ruben-bartelink)". One line of code Ruben posted saved me hours of headache.

The working source code is available on [GitHub](https://github.com/dance2die/Blog.SlightEdgeCoder.NinjectHttpContext).
