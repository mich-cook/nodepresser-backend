import React from 'react';
import marked from 'marked';

class ArticleEditorPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "preview": false,
      "text": ""
    };
  }

  togglePreview = () => {
    this.setState((state, props) => {
      const preview = document.getElementById('preview');
      const textInput = document.getElementById('markdown');

      if (state.preview === false) {
        preview.style.display = "block";
        textInput.style.display = "none";
        return { "preview": true }
      } else {
        preview.style.display = "none";
        textInput.style.display = "block";
        return { "preview": false }
      }
    });
  }

  handleTextChange = (e) => {
    const newText = e.target.value;  // in this case, makes more sense than e.persist();
    this.setState((state, props) => ({ "text": newText }));
  }

  render() {
    return(
      <div id="article-editor" className="page-body">
        <h1>Compose a New Article</h1>
        <f0rm method="post" action="localhost:8000/api/articles/">
          <label id="title">Article Title: <input type="text" id="article-title" placeholder="Article Title (Required)"></input></label>
          <button id="editDisplayToggle" onClick={this.togglePreview}>{(this.state.preview === false)?`Preview`:`Edit`}</button>
          <textarea id="markdown" placeholder="Article Content Here (Required)" onChange={this.handleTextChange}>{this.props.articleConent}</textarea>
          <div id="preview" dangerouslySetInnerHTML={{ __html: marked(this.state.text) }}></div>
          <label>Article Slug: <input></input></label>
          <label>Publish Date: <input type="date"></input></label>
          <label>Publish Time: <input type="time"></input></label>
          <label>Immediate: <input type="checkbox"></input></label>
          <button id="save">Save</button>
        </f0rm>
      </div>
    );
  }
};

export default ArticleEditorPage;
