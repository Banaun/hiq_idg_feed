import React, { useState, useEffect } from "react";
import ArticleCard from "./components/ArticleCard";

const App = () => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    let articles = [" "];

    async function fetchArticles() {
      let url = "https://localhost:7293/items"
      let response = await fetch(url);
      let responseAsJson = await response.json();
      for (let i = 0; i < responseAsJson.length; i++) {
        articles.push(responseAsJson[i])
      }
      setArticleList(articles)
      console.log(articles)
    }
    fetchArticles();
  }, []);

  return (
    <div className="feed-page">
      <div className="feed-container">
        {articleList.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))}
      </div>
    </div>
  )
}

export default App;

