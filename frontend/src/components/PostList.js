import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostListItem from './PostListItem';
import { clearPosts } from '../reducers/post';
import styled from 'styled-components';
import ZipLoading from './ZipLoading';

const PostListWrapper = styled.div`
  .posts__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    @media all and (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }

  .posts__zeroitem {
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
    <PostListWrapper>
      {loading ? (
        <ZipLoading />
      ) : (
        <>
          {children}
          {posts && posts.length > 0 ? (
            <div className="posts__container">
              {posts.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="posts__zeroitem">결과가 없습니다</div>
          )}
        </>
      )}
    </PostListWrapper>
  );
}

export default PostList;
