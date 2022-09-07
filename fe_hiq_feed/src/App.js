import FeedPage from "./components/FeedPage";
import FloatingTextBar from "./components/FloatingTextBar";
import FlagPage from "./components/FlagPage";
import { useState, useEffect } from "react";

const App = () => {
  const [showFeed, setShowFeed] = useState(true);

  //Interval for changing pages every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFeed(!showFeed);
    }, 300000);

    return () => clearInterval(interval);
  }, [showFeed]);

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
