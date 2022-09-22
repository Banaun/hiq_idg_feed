import missingImage from "../assets/image/image-missing.png";
import { motion } from "framer-motion";

const ArticleCard = (props) => {
  //Relevant categories (only include sources)
  const relevantCategories = [
    "Computer Sweden",
    "Ekonomi/Bransch",
    "PC för Alla",
    "M3",
    "MacWorld",
    "CIO Sweden",
  ];

  //Formatting the categories to only include categories from relevantCategories array
  const categories = [];
  for (let i = 0; i < props.article.category.length; i++) {
    if (relevantCategories.includes(props.article.category[i])) {
      categories.push(props.article.category[i]);
    }
  }

  return (
    <>
      {props.column.includes(props.index) ? (
        <motion.div
          layout
          key={props.article.id}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 30 }}
        >
          <div
            className={
              props.article.containsKeyword
                ? "article-card-important"
                : "article-card"
            }
          >
            <img
              className="article-image"
              src={props.article.imageUrl}
              alt={missingImage}
            />
            <div className="article-textbox">
              <div className="article-title">{props.article.title}</div>
              <div className="article-description">
                {props.article.description}
              </div>
              <div className="article-bottom">
                {categories ? (
                  <div className="article-tag">
                    Källa: {categories[0]}
                  </div>
                ) : (
                  <div className="article-tag">Källa: IDG.se</div>
                )}
                <div className="article-publish-group">
                  <div className="article-publish-date">
                    {props.article.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ArticleCard;
