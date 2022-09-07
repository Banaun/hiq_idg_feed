using System.Xml;
using System.Collections.Generic;
using System.ServiceModel.Syndication;
using Newtonsoft.Json;

string url100 = "http://www.idg.se/rss/100+senaste?noredirect=true";
XmlReader reader = XmlReader.Create(url100);
SyndicationFeed feed100 = SyndicationFeed.Load(reader);
reader.Close();

string urlLatest = "http://www.idg.se/rss/nyheter?noredirect=true";
reader = XmlReader.Create(urlLatest);
SyndicationFeed feedLatest = SyndicationFeed.Load(reader);
reader.Close();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {
    options.AddPolicy(name: MyAllowSpecificOrigins, policy => {
        policy.WithOrigins("http://localhost:3000", "http://localhost:8080")
        .AllowAnyHeader()
        .AllowAnyMethod(); ;
    });
});
var app = builder.Build();

app.MapGet("/", () => {
    return feed100;
});

app.MapGet("/feed-info", () => {
    return feed100.Description.Text;
});

app.MapGet("/items", () => {

    List<Article> articles = new List<Article>();

    foreach (SyndicationItem item in feed100.Items) {
        Article article = new Article();
        article.id = item.Id;
        article.title = item.Title.Text;
        string[] words = item.Summary.Text.Split('"');
        string[] summary = item.Summary.Text.Split('>');
        //string[] summary = words[4].Split('>');
        article.imageUrl = words[1];
        article.description = summary.Last();
        article.publishDate = item.PublishDate;

        article.category = new List<string>();
        foreach (SyndicationCategory attribute in item.Categories) {
            article.category.Add(attribute.Name);
        }
        

        articles.Add(article);
    }

    return articles;
});

app.MapGet("/categories", () => {

    List<string> categories = new List<string>();

    foreach (SyndicationItem item in feed100.Items) {
        foreach (SyndicationCategory attribute in item.Categories) {
            categories.Add(attribute.Name);
        }
    }

    categories = categories.Distinct().ToList();

    return categories;
});

app.MapGet("/latest", () => {
    List<Headline> headlines = new List<Headline>();

    foreach (SyndicationItem item in feedLatest.Items) {
        Headline headline = new Headline();
        headline.id = item.Id;
        headline.title = item.Title.Text;
        string[] words = item.Summary.Text.Split('"');
        string[] summary = words[4].Split('>');
        headline.description = summary[2];

        headlines.Add(headline);
    }

    return headlines;
});

app.UseCors(MyAllowSpecificOrigins);

app.Run();