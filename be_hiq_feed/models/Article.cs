    public class Article {
        public string id { get; set; }
        public bool containsKeyword { get; set; }
        public int titleSize { get; set; }
        public int descriptionSize { get; set; }
        public string title { get; set; }
        public string imageUrl { get; set; }
        public string description { get; set; }
        public DateTimeOffset publishDate { get; set; }
        public string date { get; set; }
        public string time { get; set; }
        public List<string> category { get; set; }
    }

