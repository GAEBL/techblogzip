import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMainpageData, clearPosts } from '../../reducers/post';
import styled from 'styled-components';
import Carousel from './Carousel';
import PageData from './PageData';

const MainPageWrapper = styled.div``;

const Contents = styled.div`
  height: 100vh;
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
        {!loading && pageData && <PageData pageData={pageData} />}
        {/* <Contents>
          <h4>블로그별 포스팅 개수</h4>
          <h4>블로그별 포스팅 개수</h4>
          <h4>블로그별 포스팅 개수</h4>
          <h4>블로그별 포스팅 개수</h4>
          <h4>블로그별 포스팅 개수</h4>
        </Contents> */}
      </MainContentWrapper>
    </MainPageWrapper>
  );
}

export default MainPage;
