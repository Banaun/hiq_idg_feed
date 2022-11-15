using System.Xml;
using System.ServiceModel.Syndication;

static SyndicationFeed Get100() {
    //Fetch the rss feed (100 latest news)
    string url100 = "http://www.idg.se/rss/100+senaste?noredirect=true";
    XmlReader reader = XmlReader.Create(url100);
    SyndicationFeed feed100 = SyndicationFeed.Load(reader);
    reader.Close();

    return feed100;
}

static SyndicationFeed Get20() {
    //Fetch the rss feed (20 latest news)
    string urlLatest = "http://www.idg.se/rss/nyheter?noredirect=true";
    XmlReader reader = XmlReader.Create(urlLatest);
    reader = XmlReader.Create(urlLatest);
    SyndicationFeed feedLatest = SyndicationFeed.Load(reader);
    reader.Close();

    return feedLatest;
}

//Declare the keyword to search for in articles
string chosenKeyword = "hiq";

//Create builder and set cors allowance
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {
    options.AddPolicy(name: MyAllowSpecificOrigins, policy => {
        policy.WithOrigins("http://localhost:3000", "http://localhost:8080")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
var app = builder.Build();

//Endpoint for the latest 100 news feed (raw)
app.MapGet("/", () => {

    SyndicationFeed feed100 = Get100();

    return feed100;
});

//Endpoint for title of the feed
app.MapGet("/feed-info", () => {

    SyndicationFeed feed100 = Get100();

    return feed100.Description.Text;
});

//Endpoint for all the articles in the 100 lates news feed (formatted)
app.MapGet("/items", () => {

    SyndicationFeed feed100 = Get100();

    List<Article> articles = new List<Article>();

    //Go through each item in the feed and initialize new article for each item (some formatting needed)
    foreach (SyndicationItem item in feed100.Items) {
        Article article = new Article();

        article.id = item.Id;
        article.title = item.Title.Text;

        //Retrieve the image url the summary text
        string[] wordArr = item.Summary.Text.Split('"');
        article.imageUrl = wordArr[1];

        //Retrieve the description from the summary text
        string[] summaryArr = item.Summary.Text.Split('>');
        article.description = summaryArr.Last();

        //Change publishDate to desired format and type
        string dateTimeStr = item.PublishDate.ToString();
        string[] dateTimeArr = dateTimeStr.Split(' ');
        article.date = dateTimeArr[0];
        article.time = dateTimeArr[1];
        article.publishDate = item.PublishDate;

        //Initialize and populate list for categories and remove duplicates
        article.category = new List<string>();
        foreach (SyndicationCategory attribute in item.Categories) {
            article.category.Add(attribute.Name);
        }
        article.category = article.category.Distinct().ToList();

        //Search title and description for keyword and declare containsKeyword accordingly
        if (article.title.Contains(chosenKeyword, System.StringComparison.CurrentCultureIgnoreCase) || 
                article.description.Contains(chosenKeyword, System.StringComparison.CurrentCultureIgnoreCase)) {
            article.containsKeyword = true;
        } else {
            article.containsKeyword = false;
        }
        
        //Set article size relative to length of title and description
        article.titleSize = article.title.Length;
        article.descriptionSize = article.description.Length;

        articles.Add(article);
    }

    return articles;
});

//Endpoint for all categories (tags) in the 100 latest news feed (duplicates removed)
app.MapGet("/categories", () => {

    SyndicationFeed feed100 = Get100();

    List<string> categories = new List<string>();

    foreach (SyndicationItem item in feed100.Items) {
        foreach (SyndicationCategory attribute in item.Categories) {
            categories.Add(attribute.Name);
        }
    }
    //Remove duplicates
    categories = categories.Distinct().ToList();

    return categories;
});

//Endpoint for all headlines in the 20 latest news feed (formatted)
app.MapGet("/latest", () => {

    SyndicationFeed feedLatest = Get20();

    List<Headline> headlines = new List<Headline>();

    //Go through each item in the feed and initialize new headline for each item (some formatting needed)
    foreach (SyndicationItem item in feedLatest.Items) {
        Headline headline = new Headline();

        headline.id = item.Id;
        headline.title = item.Title.Text;

        //Retrieve the description from the summary text
        string[] words = item.Summary.Text.Split('"');
        string[] summary = words[4].Split('>');
        headline.description = summary[2];

        //Search title and description for keyword and declare containsKeyword accordingly
        if (headline.title.Contains(chosenKeyword, System.StringComparison.CurrentCultureIgnoreCase) || 
                headline.description.Contains(chosenKeyword, System.StringComparison.CurrentCultureIgnoreCase)) {
            headline.containsKeyword = true;
        } else {
            headline.containsKeyword = false;
        }

        headlines.Add(headline);
    }

    return headlines;
});

app.UseCors(MyAllowSpecificOrigins);

app.Run();