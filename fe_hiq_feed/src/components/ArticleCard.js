import missingImage from '../assets/images/image-missing.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'

const ArticleCard = (props) => {
  /*  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max, min)) + min;
  }

  let randomCardHeight = getRandomInt(10, 20);

  const randomCardStyle = {
    height: "",
  };

  randomCardStyle.height = randomCardHeight.toString();
  */
  const dateStr = props.article.publishDate;
  const dateStrArr = dateStr.split("T");
  const timeStr = dateStrArr[1];
  const timeStrArr = timeStr.split("+");

  const categories = props.article.category;
  const uniqueCategories = [...new Set(categories)]

  return (
    <div className="article-card">
      <img className="article-image" src={props.article.imageUrl} alt={missingImage}/>
      <div className="article-textbox">
        <div className="article-title">{props.article.title}</div>
        <div className="article-description">{props.article.description}</div>
        <div className="article-bottom">
            <div className="article-tag-group">
                <FontAwesomeIcon icon={faHashtag} />
                {uniqueCategories.map((category) => (
                    <div className="article-tag">{category}</div>
                ))}
            </div>
            <div className="article-publish-group">
                <div className="article-publish-date">{dateStrArr[0]}</div>
                <div className="article-publish-time">{timeStrArr[0]}</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
