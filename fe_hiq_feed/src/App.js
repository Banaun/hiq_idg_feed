import React, { useState, useEffect } from "react";

const App = () => {

  useEffect(() => {
    let articles = [" "];

    async function fetchArticles() {
      let url = "https://localhost:7293/items"
      let response = await fetch(url);
      let responseAsJson = await response.json();
      for (let i = 0; i < responseAsJson.length; i++) {
        articles.push(responseAsJson[i])
      }
      console.log(articles)
    }
    fetchArticles();
  }, []);
}

export default App;

