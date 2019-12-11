import React, { useState, useEffect } from 'react';
import ArticlesList from '../components/ArticlesList';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';
import NotFoundPage from '../pages/NotFoundPage';
import articleContent from './article-content';

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find(article => article.name === name);

  const [ articleInfo, setArticleInfo ] = useState({
    "upvotes": 0,
    "comments": []
  });

  useEffect(() => {
    // since the function passed to useEffect can't be async
    const fetchData = async () => {
      // const result = await fetch(`//localhost:8000/api/articles/${name}`);
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      console.log(body);
      setArticleInfo(body);
    }
    fetchData();
    // setArticleInfo({ "upvotes": Math.ceil(Math.random() * 10) });

    // only do this when name (URL) changes
  }, [name]);

  if (!article) return <NotFoundPage />;
  const otherArticles = articleContent.filter(article => article.name !== name);

  return(
  <React.Fragment>
    <h1>{article.title}</h1>
    <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
    {article.content.map((paragraph, key) => (
      <p key={key}>{paragraph}</p>
    ))}
    <CommentsList comments={articleInfo.comments} />
    <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
    <h3>Other Articles</h3>
    <ArticlesList articles={otherArticles} />
  </React.Fragment>
);}

export default ArticlePage;
