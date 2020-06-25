import React from 'react';

const ArticleEditorPage = () => {

  return(
    <div id="article-editor" className="page-body">
      <h1>Compose a New Article</h1>
      <form method="post" action="localhost:8000/api/articles/">
        <label>Article Title: <input type="text" id="article-title" placeholder="Article Title (Required)"></input></label>
        <textarea placeholder="Article Content Here (Required)"></textarea>
        <label>Article Slug: <input></input></label>
        <label>Publish Date: <input type="date"></input></label>
        <label>Publish Time: <input type="time"></input></label>
        <label>Immediate: <input type="checkbox"></input></label>
        <button>Save</button>
      </form>
    </div>
  );
};

export default ArticleEditorPage;
