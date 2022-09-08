    public class Article {
        public string id { get; set; }
        public bool containsKeyword { get; set; }
        public string title { get; set; }
        public string imageUrl { get; set; }
        public string description { get; set; }
        public DateTimeOffset publishDate { get; set; }
        public List<string> category { get; set; }
    }

