import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

const FeedPage = () => {
  const [articleList, setArticleList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  //Fetch articles from backend and populate the articleList
  const getArticles = async () => {
    let articles = [];

    let url = "http://localhost:5000/items";
    let response = await fetch(url);
    let responseAsJson = await response.json();
    for (let i = 0; i < responseAsJson.length; i++) {
      articles.push(responseAsJson[i]);
    }
    setArticleList(articles);
  };

  //Fetch categories from backend and populate the categoryList
  const getCategories = async () => {
    let categories = [];

    let url = "http://localhost:5000/categories";
    let response = await fetch(url);
    let responseAsJson = await response.json();
    for (let i = 0; i < responseAsJson.length; i++) {
      categories.push(responseAsJson[i]);
    }
    setCategoryList(categories);
  };

  useEffect(() => {
    getArticles();
    getCategories();
  }, []);

  //Interval for updating the articleList array
  useEffect(() => {
    const interval = setInterval(() => {

      //Remove the first 4 items from articleList
      let newArticleList = [...articleList];
      newArticleList.splice(0, 4);

      setArticleList(newArticleList);
    }, 20000);

    return () => clearInterval(interval);
  }, [articleList]);

  //Index from articleList in columns
  const firstColumn = [
    0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76,
    80, 84, 88, 92, 96,
  ];
  const secondColumn = [
    1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77,
    81, 85, 89, 93, 97,
  ];
  const thirdColumn = [
    2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74,
    78, 82, 86, 90, 94, 98,
  ];
  const fourthColumn = [
    3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 67, 71, 75,
    79, 83, 87, 91, 95, 99,
  ];

  return (
    <div className="masonry-grid">
      <div className="masonry-grid-column">
        {articleList.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            categories={categoryList}
            index={index}
            column={firstColumn}
          />
        ))}
      </div>
      <div className="masonry-grid-column">
        {articleList.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            categories={categoryList}
            index={index}
            column={secondColumn}
          />
        ))}
      </div>
      <div className="masonry-grid-column">
        {articleList.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            categories={categoryList}
            index={index}
            column={thirdColumn}
          />
        ))}
      </div>
      <div className="masonry-grid-column">
        {articleList.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            categories={categoryList}
            index={index}
            column={fourthColumn}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
