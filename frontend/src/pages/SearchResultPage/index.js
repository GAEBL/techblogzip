import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, clearPosts } from '../../reducers/post';
import RecentPostItem from '../RecentPostsPage/RecentPostItem';
import Pagination from '@material-ui/lab/Pagination';

const SearchResultPageWraaper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ResultsWrapper = styled.div``;

const ResultText = styled.p`
  font-size: 40px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

function SearchResultPage({ history, match }) {
  const [query, setQuery] = useState(match.params.query);
  const dispatch = useDispatch();
  const { results, loading, lastpage, resultNum } = useSelector((state) => ({
    results: state.post.posts,
    loading: state.loading['search/GET_SEARCHRESULTS'],
    lastpage: state.post.lastPage,
    resultNum: state.post.resultNum,
  }));
  const [page, setPage] = useState(1);
  const handleSearch = (query, page) => {
    history.push(`/search/${query}`);
    dispatch(getSearchResults({ query, page }));
  };

  useEffect(() => {
    console.log('이펙트');
    handleSearch(match.params.query, page);
    setQuery(match.params.query);
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch, page, match.params.query]);

  const handleChangePage = (e, v) => {
    setPage(v);
    handleSearch(query, v);
    window.scrollTo(0, 0);
  };

  return (
    <SearchResultPageWraaper>
      <ResultText>
        "{match.params.query}"검색 결과({resultNum ? resultNum : 0}건)
      </ResultText>
      <SearchInput
        handleSearch={handleSearch}
        query={query}
        setQuery={setQuery}
      />
      <ResultsWrapper>
        {loading ? <div>로딩</div> : null}
        {!loading &&
          results &&
          results.map((result, index) => (
            <RecentPostItem key={index} post={result} />
          ))}
      </ResultsWrapper>
      <PaginationWrapper>
        <Pagination
          count={lastpage}
          size="large"
          onChange={handleChangePage}
          value={page}
          page={page}
        />
      </PaginationWrapper>
    </SearchResultPageWraaper>
  );
}

export default SearchResultPage;
