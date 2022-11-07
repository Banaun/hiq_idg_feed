import React, { useRef, useState, useEffect } from 'react';

const FloatingTextBar = () => {
  const [headlineList, setHeadlineList] = useState([]);
  const headlines = useRef();

  //Fetch headlines from backend and populate the headlines array
  const getHeadlines = async () => {
    let headlines = [];

    let url = 'https://behiqfeed.azurewebsites.net/latest';
    let response = await fetch(url, {
      mode: 'cors',
    });
    let responseAsJson = await response.json();
    for (let i = 0; i < responseAsJson.length; i++) {
      headlines.push(responseAsJson[i]);
    }
    let repeatedHeadlines = Array(5).fill(headlines).flat();

    setHeadlineList(repeatedHeadlines);
  };

  useEffect(() => {
    getHeadlines();
  }, []);

  useEffect(() => {
    animate(headlines);
  }, [headlines]);

  function animate(headlines) {
    let elementWidth = headlines.current.offsetWidth;
    let parentWidth = headlines.current.parentElement;
    let flag = 0;

    setInterval(() => {
      headlines.current.style.marginLeft = --flag + 'px';

      if (elementWidth == -flag) {
        flag = parentWidth;
      }
    }, 20);
  }

  return (
    <div className='floating-text-header'>
      <div
        ref={headlines}
        className='floating-text'
        style={{ marginLeft: '0px' }}
      >
        {headlineList.map((headline) => (
          <>
            {headline.containsKeyword ? (
              <p className='headline-important' key={headline.id}>
                {headline.title}
              </p>
            ) : (
              <p className='headline' key={headline.id}>
                {headline.title}
              </p>
            )}
            <p style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;{'|'}&nbsp;&nbsp;</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default FloatingTextBar;
