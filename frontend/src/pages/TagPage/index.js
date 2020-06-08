import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByTag } from '../../reducers/post';
import styled from 'styled-components';
import PostList from '../../components/PostList';
import SimplePagination from '../../components/Material/SimplePagination';

const TagPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;
  .page__title {
    margin-bottom: 1rem;

    .tag {
      padding: 0.1rem 0.3rem;
      background-color: ${({ theme }) => theme.nonselectedMainColor[100]};
      color: ${({ theme }) => theme.nonselectedMainColor[900]};
    }
  }
`;

function TagPage({ match }) {
  const dispatch = useDispatch();
  const { tag } = match.params;
  const { page } = useSelector(({ post }) => ({
    page: post.page,
  }));

  useEffect(() => {
    dispatch(getPostsByTag({ tag, page }));
  }, [dispatch, tag, page]);

  return (
    <TagPageWrapper>
      <PostList actionType="post/GET_POSTS_BY_TAG">
        <h1 className="page__title">
          <span className="tag">#{tag}</span> 관련 글
        </h1>
      </PostList>
      <SimplePagination />
    </TagPageWrapper>
  );
}

export default TagPage;
