import FeedPage from "./components/FeedPage";
import FloatingTextBar from "./components/FloatingTextBar";
import FlagPage from "./components/FlagPage";
import { useState, useEffect } from "react";

const App = () => {
  const [feedLoaded, setFeedLoaded] = useState(true);

  //Interval for changing pages every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setFeedLoaded(!feedLoaded);
    }, 300000);

    return () => clearInterval(interval);
  }, [feedLoaded]);

  return (
    <>
      {feedLoaded ? 
        <div className="feed-page">
          <FloatingTextBar />
          <FeedPage />
        </div> : 
        <div className="video-page">
          <FlagPage />
        </div>
      }
    </>
  );
};

export default App;
