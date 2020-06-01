import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostList from '../../components/PostList';
import { getPostsByLiked } from '../../reducers/post';
import SimplePagination from '../../components/Material/SimplePagination';

const MyPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;

  .page__title {
    margin-bottom: 1rem;
  }
`;

function MyPage({ history }) {
  const { isLoggedIn, currentUser } = useSelector(({ user, post }) => ({
    isLoggedIn: user.isLoggedIn,
    currentUser: user.currentUser,
    posts: post.posts,
  }));

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const handlePage = (nextPage) => setPage(nextPage);
  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
    dispatch(getPostsByLiked());
  }, [dispatch, isLoggedIn, history]);
  return (
    <MyPageWrapper>
      {isLoggedIn && (
        <>
          <PostList actionType="post/GET_POST_BY_LIKED">
            <h1 className="page__title">
              {currentUser.username}님이 스크랩한 기술 블로그
            </h1>
          </PostList>

          <SimplePagination currentPage={page} handlePage={handlePage} />
        </>
      )}
    </MyPageWrapper>
  );
}

export default MyPage;
