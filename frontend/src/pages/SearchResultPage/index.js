import React, { useEffect } from 'react';
import SearchInput from './SearchInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../../reducers/post';
import PostList from '../../components/PostList';
import SimplePagination from '../../components/Material/SimplePagination';
import { Fade } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const SearchResultPageWraaper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;

  .page__title {
    margin-bottom: 1rem;
  }

  .search__input {
    margin-bottom: 1rem;
  }

  .result__text {
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
`;

function SearchResultPage({ match }) {
  const { query } = match.params;

  const { postsCount, page } = useSelector(({ post }) => ({
    postsCount: post.resultNum,
    page: post.page,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchResults({ query, page }));
  }, [dispatch, query, page]);

  return (
    <Fade in={true} {...{ timeout: 1000 }}>
      <SearchResultPageWraaper>
        <h1 className="page__title">기술 블로그의 지식을 탐험하세요.</h1>

        <div className="search__input">
          <SearchInput />
        </div>
        <PostList actionType="post/GET_SEARCHRESULTS">
          <div className="result__text">
            <span role="img" aria-label="img">
              🔎{'  '}
            </span>
            "{query}" 검색결과 ({postsCount})
          </div>
        </PostList>

        <SimplePagination />
      </SearchResultPageWraaper>
    </Fade>
  );
}

export default withRouter(SearchResultPage);
