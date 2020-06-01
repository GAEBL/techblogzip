import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMainpageData, clearPosts } from '../../reducers/post';
import styled from 'styled-components';
import Carousel from './Carousel';
import PageData from './PageData';

const MainPageWrapper = styled.div``;

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
    // 메인페이지만 패딩 탑 0로..
    const contents = document.querySelector('#contents');
    contents.style.paddingTop = 0;

    dispatch(getMainpageData());
    return () => {
      dispatch(clearPosts());
      // 나가면서 패딩 탑 주기
      contents.style.paddingTop = '64px';
    };
  }, [dispatch]);

  return (
    <MainPageWrapper>
      {/* TODO:posts 0개일때? */}
      <Carousel posts={posts} />
      <MainContentWrapper>
        {!loading && pageData && <PageData pageData={pageData} />}
      </MainContentWrapper>
    </MainPageWrapper>
  );
}

export default MainPage;
