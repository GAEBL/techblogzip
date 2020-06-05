import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostList from '../../components/PostList';
import { getPostsByLiked } from '../../reducers/post';
import SimplePagination from '../../components/Material/SimplePagination';
import { Fade, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyle = makeStyles(() => ({
  root: {
    fontSize: '1.5rem',
    color: '#f44336',
    scale: '1.3',
  },
}));

const HeartIcon = styled(FavoriteIcon)`
  animation: beat 0.3s infinite alternate;
  transform-origin: center;
  /* Heart beat animation */
  @keyframes beat {
    to {
      transform: scale(1.4);
    }
  }
`;

const MyPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;

  .page__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .page__username {
    color: ${({ theme }) => theme.mainColor};
  }
`;

function MyPage({ history }) {
  const classes = useStyle();
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
    <Fade in={true} {...{ timeout: 1000 }}>
      <MyPageWrapper>
        {isLoggedIn && (
          <>
            <PostList actionType="post/GET_POST_BY_LIKED">
              <h1 className="page__title">
                <span className="page__username">{currentUser.username}</span>
                님이 찜 <HeartIcon classes={classes} /> 한 블로그 포스트
              </h1>
            </PostList>

            <SimplePagination currentPage={page} handlePage={handlePage} />
          </>
        )}
      </MyPageWrapper>
    </Fade>
  );
}

export default MyPage;
