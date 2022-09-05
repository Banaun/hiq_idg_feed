using System.Xml;
using System.ServiceModel.Syndication;
using Newtonsoft.Json;

string url = "http://www.idg.se/rss/100+senaste?noredirect=true";
XmlReader reader = XmlReader.Create(url);
SyndicationFeed feed = SyndicationFeed.Load(reader);
reader.Close();

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => {
    return feed;
});

app.MapGet("/feed-info", () => {
    return feed.Description.Text;
});

app.MapGet("/items", () => {

    List<Article> articles = new List<Article>();

    foreach (SyndicationItem item in feed.Items) {
        Article article = new Article();
        article.id = item.Id;
        article.title = item.Title.Text;
        article.summary = item.Summary.Text;
        article.publishDate = item.PublishDate;
        /*
        foreach (SyndicationCategory attribute in item.Categories) {
            article.category.Add(attribute.Name);
        }
        */

        articles.Add(article);
    }

    return articles;
});

app.Run();

/*
string json = JsonConvert.SerializeObject(new {
    articleList = new List<Article>() {
        new Article { id = 1, title = "ABC", description = "ABC", pubDate = "Mon, 5 Sep 2022 11:32:59" }
    }
});
*/