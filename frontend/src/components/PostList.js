import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostListItem from './PostListItem';
import { clearPosts } from '../reducers/post';
import styled from 'styled-components';
import CylonSpinner from './CylonSpinner';

const PostListWrapper = styled.div`
  .posts__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    @media all and (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
    @media all and (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }

  .posts__zeroitem {
    font-family: 'VT323', monospace;
    font-size: 4rem;
    font-weight: bold;
  }
`;

function PostList({ actionType, children }) {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(({ post, loading }) => ({
    posts: post.posts,
    loading: loading[actionType],
  }));

  useEffect(() => {
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <CylonSpinner />
      ) : (
        <PostListWrapper>
          {children}
          {posts && posts.length > 0 ? (
            <div className="posts__container">
              {posts.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="posts__zeroitem">
              <span role="img" aria-label="img">
                📭
              </span>{' '}
              EMPTY POST
            </div>
          )}
        </PostListWrapper>
      )}
    </>
  );
}

export default PostList;
