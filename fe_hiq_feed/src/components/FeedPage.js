import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { AnimatePresence } from 'framer-motion';

const FeedPage = () => {
  const [articleList, setArticleList] = useState([]);
  const [shortArticleList, setShortArticleList] = useState([]);

  /*
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
  */

  useEffect(() => {
    //Fetch articles from backend and populate the articleList
    const getArticles = async () => {
      let articles = [];

      let url = 'https://behiqfeed.azurewebsites.net/items';
      let response = await fetch(url);
      let responseAsJson = await response.json();
      for (let i = 0; i < responseAsJson.length; i++) {
        articles.push(responseAsJson[i]);
      }
      setArticleList(articles);
      setShortArticleList(articles.slice(0, 16));
    };

    getArticles();
    //getCategories();
  }, []);

  //Interval for updating the articleList array
  useEffect(() => {
    const interval = setInterval(() => {
      //Remove the first 4 items from articleList
      let newArticleList = [...articleList];
      newArticleList.splice(0, 4);
      setArticleList(newArticleList);
      setShortArticleList(newArticleList.slice(0, 16));
    }, 25000);

    return () => clearInterval(interval);
  }, [articleList]);

  //Get every Nth number from chosen array, starting from index
  const getEveryNth = (arr, index, nth) => {
    const result = [];

    for (index; index < arr.length; index += nth) {
      result.push(arr[index]);
    }

    return result;
  };

  //Create array with 100 numbers (0-99)
  const articlesLengthArr = Array(16)
    .fill()
    .map((_, i) => i);
  //Populate first, second, third and fourth columns
  const firstColumn = getEveryNth(articlesLengthArr, 0, 4);
  const secondColumn = getEveryNth(articlesLengthArr, 1, 4);
  const thirdColumn = getEveryNth(articlesLengthArr, 2, 4);
  const fourthColumn = getEveryNth(articlesLengthArr, 3, 4);

  return (
    <div className='masonry-grid'>
      <div className='masonry-grid-column'>
        <AnimatePresence>
          {shortArticleList.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
              column={firstColumn}
            />
          ))}
        </AnimatePresence>
      </div>
      <div className='masonry-grid-column'>
        <AnimatePresence>
          {shortArticleList.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
              column={secondColumn}
            />
          ))}
        </AnimatePresence>
      </div>
      <div className='masonry-grid-column'>
        <AnimatePresence>
          {shortArticleList.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
              column={thirdColumn}
            />
          ))}
        </AnimatePresence>
      </div>
      <div className='masonry-grid-column'>
        <AnimatePresence>
          {shortArticleList.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
              column={fourthColumn}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeedPage;
