import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RecentPostsPage from './pages/RecentPostsPage';
import SearchResultPage from './pages/SearchResultPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrendPage from './pages/TrendPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/register" component={RegisterPage} exact />
      <Route path="/posts" component={RecentPostsPage} exact />
      <Route path="/search/:query" component={SearchResultPage} exact />
      <Route path="/trend" component={TrendPage} exact />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
