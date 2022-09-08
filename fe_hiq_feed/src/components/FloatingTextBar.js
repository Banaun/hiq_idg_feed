import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

const FloatingTextBar = () => {
    const [headlineList, setHeadlineList] = useState([]);

    //Fetch headlines from backend and populate the headlines array
    const getHeadlines = async () => {
        let headlines = []

        let url = "https://localhost:7293/latest";
        let response = await fetch(url);
        let responseAsJson = await response.json();
        for (let i = 0; i < responseAsJson.length; i++) {
            headlines.push(responseAsJson[i]);
          }
          setHeadlineList(headlines);
    }

    useEffect(() => {
        getHeadlines();
      }, []);

    return (
        <Marquee className="floating-text" gradient={false} speed="10">
            {headlineList.map((headline) => (
                <>
                {headline.containsKeyword 
                    ? 
                    <p className="headline-important" key={headline.id}>{headline.title}&nbsp;&nbsp;{"|"}&nbsp;&nbsp;</p> 
                    :
                    <p className="headline" key={headline.id}>{headline.title}&nbsp;&nbsp;{"|"}&nbsp;&nbsp;</p>
                }
                </>
            ))}
        </Marquee>
    )
}

export default FloatingTextBar;