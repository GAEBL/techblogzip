import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMainpageData, clearPosts } from '../../reducers/post';
import styled from 'styled-components';
import Carousel from './Carousel';
import PageData from './PageData';

const MainPageWrapper = styled.div``;

const MainTitle = styled.div`
  height: 50vh;
  font-size: 3rem;
  text-align: center;
`;

const MainContentWrapper = styled.section`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
`;

function MainPage(props) {
  const { posts, pageData, loading } = useSelector(({ post, loading }) => ({
    posts: post.posts,
    pageData: post.pageData,
    loading: loading['post/GET_MAINPAGE_DATA'],
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMainpageData());
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);

  return (
    <MainPageWrapper>
      {/* TODO:posts 0개일때? */}
      <Carousel posts={posts} />
      <MainContentWrapper>
        <MainTitle>우리는 그냥 기술블로그만 모아놓은게 아니야</MainTitle>
        {loading ? <h2>로딩..</h2> : null}
        {!loading && pageData && <PageData pageData={pageData} />}
      </MainContentWrapper>
    </MainPageWrapper>
  );
}

export default MainPage;
