import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

  const [ topAuthors, setTopAuthors ] = useState({ "authors": [] });
  const [ topArticles, setTopArticles ] = useState({ "articles": [] });

  useEffect(() => {
    const fetchData = async () => {
      const topAuthorsResponse = await fetch(`//localhost:8000/api/authors/top`);
      const topAuthors = await topAuthorsResponse.json();

      const topArticlesResponse = await fetch(`//localhost:8000/api/articles/top`);
      const topArticles = await topArticlesResponse.json();

      setTopAuthors(topAuthors);
      setTopArticles(topArticles);
    };
    fetchData();
  }, []);

return (
  <div id="homepage" className="page-body">
    <h1>Welcome to this blogging platform</h1>
    <div id="top-authors">
      <h2>Top Authors:</h2>
      <ul>
      {topAuthors.authors.map((author, key) => ( <li key={key}><Link to={`/articles/${author._id}`}>{author._id} ({author.count})</Link></li>))}
      </ul>
    </div>
    <div id="top-articles">
      <h2>Top Articles (TODO):</h2>
      <ul>
      {topArticles.articles.map((article, key) => ( <li key={key}><Link to={`/article/${article.author}/${article.slug}`}>{article.title}</Link></li>))}
      </ul>
    </div>
  </div>
);

};

export default HomePage;
