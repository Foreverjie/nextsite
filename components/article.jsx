const Article = (props) => {
  return props.articles.map((article, i) => {
    return (
      <React.Fragment key={i}>
        <div className="article">
          <div className="article-title">{article.title}</div>
          <div className="article-desc">{article.desc}</div>
        </div>
      </React.Fragment>
    )
  })
}

export default Article
