import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import Masonry from "react-masonry-css";
import { arrayMoveImmutable } from "array-move";

const FeedPage = () => {
  const [articleList, setArticleList] = useState([]);

  const getArticles = async () => {
    let articles = [];

    let url = "https://localhost:7293/items";
    let response = await fetch(url);
    let responseAsJson = await response.json();
    for (let i = 0; i < responseAsJson.length; i++) {
      articles.push(responseAsJson[i]);
    }
    setArticleList(articles);
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    //Interval for updating the articleList array
    const interval = setInterval(() => {
      //Move the first 4 items to the end of the array
      let newArticleList = [...articleList];
      for (let i = 0; i < 4; i++) {
        newArticleList = arrayMoveImmutable(newArticleList, 0, -1);
      }

      setArticleList(newArticleList);
    }, 20000);

    return () => clearInterval(interval);
  }, [articleList]);

  //Number of columns depending on screen width
  const breakpointColumnsObj = {
    default: 4,
    1700: 3,
    1300: 2,
    860: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols="4"
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {articleList.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </Masonry>
    </>
  );
};

export default FeedPage;
