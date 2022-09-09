import missingImage from '../assets/image/image-missing.png'

const ArticleCard = (props) => {

  /*
  //Set height on article cards depending on title and description size
  let heightStyle = {}
  const articleSize = props.article.titleSize + props.article.descriptionSize
  if (articleSize < 110) {
    heightStyle = {
      height: "9rem"
    }
  } else if (articleSize >= 110 && articleSize < 170) {
    heightStyle = {
      height: "10rem"
    }
  } else if (articleSize >= 170 && articleSize < 230) {
    heightStyle = {
      height: "11rem"
    }
  } else if (articleSize >= 230 && articleSize < 290) {
    heightStyle = {
      height: "12rem"
    }
  } else if (articleSize >= 290 && articleSize < 350) {
    heightStyle = {
      height: "13rem"
    }
  } else {
    heightStyle = {
      height: "14rem"
    }
  }
  */

  //Relevant categories (only include sources)
  const relevantCategories = [
    "Computer Sweden",
    "Ekonomi/Bransch",
    "PC för Alla",
    "M3",
    "MacWorld",
    "CIO Sweden",
  ]
  
  //Formatting the categories to only include categories from relevantCategories array
  const categories = []
  for (let i = 0; i < props.article.category.length; i++) {
    if (relevantCategories.includes(props.article.category[i])) {
      categories.push(props.article.category[i]);
    }
  }

  return (
    <div className={props.article.containsKeyword ? "article-card-important" : "article-card"}>
      <img className="article-image" src={props.article.imageUrl} alt={missingImage}/>
      <div className="article-textbox">
        <div className="article-title">{props.article.title}</div>
        <div className="article-description">{props.article.description}</div>
        <div className="article-bottom">
          {categories ? 
            <div className="article-tag">Källa: {categories[0]} Size: {props.article.titleSize + props.article.descriptionSize}</div> : 
            <div className="article-tag">Källa: IDG.se</div>
          }
          <div className="article-publish-group">
            <div className="article-publish-date">{props.article.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
