import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostListItem from './PostListItem';
import { clearPosts } from '../reducers/post';
import styled from 'styled-components';

const PostListWrapper = styled.div`
  .posts__results {
  }
  .posts__container {
  }
  .posts__nocontents {
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
        <div>로딩중...</div>
      ) : (
        <>
          {actionType === 'post/GET_SEARCHRESULTS' && children}
          {posts.length > 0 ? (
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
