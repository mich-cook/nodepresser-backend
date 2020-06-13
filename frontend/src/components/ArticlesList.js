import React from 'react';
import { Link } from 'react-router-dom';

const ArticlesList = ({ articles }) => (
  <React.Fragment>
      {articles.map((article, key) => (
      <li key={key}><Link to={`/article/${article.slug}`}>{article.title}</Link><p>{article.content.substring(0,150)}...</p></li>
      ))}
  </React.Fragment>
);

export default ArticlesList;
