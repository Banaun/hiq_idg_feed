

const ArticleCard = (props) => {

    return (
        <div className="article-container">
            <img className="article-image" src={props.article.imageUrl}/>
            <p className="article-title">{props.article.title}</p>
            <p className="article-description">{props.article.description}</p>
            <p className="article-publish">{props.article.publishDate}</p>
        </div>
    )
}

export default ArticleCard;