import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RecentPostsPage from './pages/RecentPostsPage';
import SearchResultPage from './pages/SearchResultPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrendPage from './pages/TrendPage';
import NotFoundPage from './pages/NotFoundPage';
import styled from 'styled-components';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { check, tempSetUser } from './reducers/user';
import HideAppBar from './components/Material/HideAppBar';
import Nav from './components/Material/Nav';
import TagPage from './pages/TagPage';
import MyPage from './pages/MyPage';

const AppGridWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.section`
  flex-grow: 1;
  padding-top: 64px;
`;

function App() {
  const dispatch = useDispatch();
  // 로그인 유지 로직
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      sessionStorage.removeItem('jwt');
      return;
    }
    dispatch(tempSetUser(JSON.parse(user)));
    dispatch(check());
  }, [dispatch]);

  return (
    <AppGridWrapper>
      <HideAppBar>
        <Nav />
      </HideAppBar>
      <Contents id="contents">
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/posts" component={RecentPostsPage} exact />
          <Route path="/search/:query" component={SearchResultPage} exact />
          <Route path="/trend" component={TrendPage} exact />
          <Route path="/tag/:tag" component={TagPage} exact />
          <Route path="/mypage" component={MyPage} exact />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Contents>
      <Footer />
    </AppGridWrapper>
  );
}

export default App;
