import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

  const [ authors, setAuthors ] = useState({ "authors": [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`//localhost:8000/api/authors/top`);
      const body = await result.json();
      setAuthors(body);
    };
    fetchData();
  }, []);

return (
  <div id="homepage" className="page-body">
    <h1>Welcome to this blogging platform</h1>
    <div id="top-authors">
      <h2>Top Authors:</h2>
      <ul>
      {authors.authors.map((author, key) => ( <li key={key}><Link to={`/articles/${author._id}`}>{author._id} ({author.count})</Link></li>))}
      </ul>
    </div>
    <div id="top-articles">
      <h2>Top Articles (TODO):</h2>
      <ul>
        <li>Fake Article 1</li>
        <li>Fake Article 2</li>
        <li>Fake Article 3</li>
        <li>Fake Article 4</li>
        <li>Fake Article 5</li>
      </ul>
    </div>
  </div>
);

};

export default HomePage;
