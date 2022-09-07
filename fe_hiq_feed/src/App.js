import FeedPage from "./components/FeedPage";
import FloatingTextBar from "./components/FloatingTextBar";
import FlagPage from "./components/FlagPage";
import { useState, useEffect } from "react";

const App = () => {
  const [showFeed, setShowFeed] = useState(true);

  //Timer variable for how long the feed and flag page are visible
  //Currently set at 8min (feed) and 1min (flag)
  let timer = 0;
  if (showFeed) {
    timer = 480000;
  } else {
    timer = 60000;
  }

  //Interval for changing view between feed and flag page
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFeed(!showFeed);
    }, timer);

    return () => clearInterval(interval);
  }, [showFeed, timer]);

  return (
    <>
      {showFeed ? (
        <div className="feed-page">
          <FloatingTextBar />
          <FeedPage />
        </div>
      ) : (
        <div className="video-page">
          <FlagPage />
        </div>
      )}
    </>
  );
};

export default App;
