import React from 'react';
import { Link } from 'react-router-dom';

const ArticlesList = ({ articles }) => (
  <React.Fragment>
      {articles.map((article, key) => (
      <li key={key}><Link to={`/article/${article.name}`}>{article.title}</Link><p>{article.content[0].substring(0,150)}...</p></li>
      ))}
  </React.Fragment>
);

export default ArticlesList;
