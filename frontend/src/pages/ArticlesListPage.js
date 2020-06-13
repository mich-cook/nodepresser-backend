import React, {Component} from 'react';
import ArticlesList from '../components/ArticlesList';

class ArticlesListPage extends Component {
  constructor({ match }) {
    super();
    this.author = match.params.author;
    this.state = {
      articles: []
    };
  }

  // TODO: Handle author doesn't exist or has been deactivated
  componentDidMount() {
    fetch(`http://localhost:8000/api/articles/${this.author}`)
    .then(results => results.json())
    .then(data => {
      this.setState({ "articles": data });
    });
  }

  // TODO: Better handling of author that doesn't exist or doesn't have articles
  render() {
    return (
<React.Fragment>
  <h1>Articles by {this.author}</h1>
  <ul>
    <ArticlesList articles={this.state.articles} />
  </ul>
</React.Fragment>
    );
  }
};

export default ArticlesListPage;
