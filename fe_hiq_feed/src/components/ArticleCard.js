const ArticleCard = (props) => {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max, min)) + min;
  }

  let randomCardHeight = getRandomInt(10, 20);

  const randomCardStyle = {
    height: "",
  };

  randomCardStyle.height = randomCardHeight.toString();

  console.log(randomCardStyle.height);

  return (
    <div className="article-card" style={randomCardStyle}>
      <img className="article-image" src={props.article.imageUrl} />
      <div className="article-textbox">
        <div className="article-title">{props.article.title}</div>
        <div className="article-description">{props.article.description}</div>
        <div className="article-publish">{props.article.publishDate}</div>
        <div className="article-tag"></div>
      </div>
    </div>
  );
};

export default ArticleCard;
