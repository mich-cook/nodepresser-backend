import React from 'react';
import ArticlesList from '../components/ArticlesList';
import articleContent from './article-content';

const ArticlesListPage = () => (
  <React.Fragment>
    <h1>Articles</h1>
    <ul>
      <ArticlesList articles={articleContent} />
    </ul>
  </React.Fragment>
);

export default ArticlesListPage;
