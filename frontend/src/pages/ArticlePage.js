import React, { useState, useEffect } from 'react';
// import ArticlesList from '../components/ArticlesList';
// import CommentsList from '../components/CommentsList';
// import UpvotesSection from '../components/UpvotesSection';
// import AddCommentForm from '../components/AddCommentForm';
import NotFoundPage from '../pages/NotFoundPage';

const ArticlePage = ({ match }) => {

  const author = match.params.author;
  const slug = match.params.slug;

  const [ article, setArticle ] = useState({});
/*    "upvotes": 0,
    "comments": []
  }); */

  useEffect(() => {
    // since the function passed to useEffect can't be async
    const fetchData = async () => {
      const result = await fetch(`//localhost:8000/api/article/${author}/${slug}`);
      const body = await result.json();
      setArticle(body);
    }
    fetchData();
    // setArticleInfo({ "upvotes": Math.ceil(Math.random() * 10) });
  }, [author, slug]);     // only do this when author or slug changes

  if (article.status === "fail") return <NotFoundPage />;
//  const otherArticles = articleContent.filter(article => article.name !== name);

  return(
  <div id="single-article" className="page-body">
    <h1>{article.title}</h1>
    <p>by {article.author}</p>
    <p>{article.content}</p>
  </div>
);}

/*
    {article.content.map((paragraph, key) => (
      <p key={key}>{paragraph}</p>
    ))}
    <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
    <CommentsList comments={articleInfo.comments} />
    <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
    <h3>Other Articles</h3>
    <ArticlesList articles={otherArticles} />
*/

export default ArticlePage;
