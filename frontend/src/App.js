// imported functionality
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// routeable pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticleEditorPage from './pages/ArticleEditorPage';
import NotFoundPage from './pages/NotFoundPage';

// components
import NavBar from './NavBar';

// styles
import './App.css';

// Router display is matches url path
// no path matches by default
// Switch fixes this, but that means 404 has to be last since it matches anything

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={AboutPage} />

            <Route path="/article/:author/:slug" component={ArticlePage} />

            <Route path="/articles/:author" component={ArticlesListPage} />
            <Route path="/articles/recent" component={ArticlesListPage} />

            <Route path="/editor" component={ArticleEditorPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// future planned components
// <Route path="/profile" component={} />
// <Route path="/login" component={} />
// <Route path="/logout" component={} />

// old paths that can probably die soon
// <Route path="/articles-list" component={ArticlesListPage} />

export default App;
