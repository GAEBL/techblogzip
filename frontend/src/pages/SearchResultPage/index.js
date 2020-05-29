import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, clearPosts } from '../../reducers/post';
import PostList from '../../components/PostList';
import SimplePagination from '../../components/Material/SimplePagination';

const SearchResultPageWraaper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;

  .result__text {
    margin-bottom: 1rem;
  }
`;

function SearchResultPage({ match }) {
  const { query } = match.params;
  const [page, setPage] = useState(1);
  const { postsCount } = useSelector(({ post }) => ({
    postsCount: post.resultNum,
  }));

  const dispatch = useDispatch();
  const handlePage = (nextPage) => setPage(nextPage);

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(getSearchResults({ query, page }));
  }, [dispatch, query, page]);

  return (
    <SearchResultPageWraaper>
      <h1>기술 블로그의 지식을 탐험하세요.</h1>

      <SearchInput />

      <PostList actionType="post/GET_SEARCHRESULTS">
        <div className="result__text">
          "{query}" 검색결과 => ({postsCount})개
        </div>
      </PostList>

      <SimplePagination currentPage={page} handlePage={handlePage} />
    </SearchResultPageWraaper>
  );
}

export default SearchResultPage;
