import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import styled from 'styled-components';
// import dummy from '../RecentPostsPage/dummy';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, clearResults } from '../../reducers/search';
import RecentPostItem from '../RecentPostsPage/RecentPostItem';

const SearchResultPageWraaper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ResultsWrapper = styled.div``;

const ResultText = styled.p`
  font-size: 40px;
`;

function SearchResultPage(props) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  // const { results, loading } = useSelector(({ result, loading }) => ({
  //   results: result,
  //   loading: loading['search/GET_SEARCHRESULTS'],
  // }));
  const results = useSelector((state) => state.search.results);
  const loading = useSelector(
    (state) => state.loading['search/GET_SEARCHRESULTS'],
  );

  const handleSearch = () => {
    dispatch(getSearchResults({ query }));
    console.log(results, loading);
  };

  useEffect(() => {
    return () => {
      dispatch(clearResults());
    };
  }, [results]);

  return (
    <SearchResultPageWraaper>
      <ResultText>
        "{query}"검색 결과({results ? results.length : 0}건)
      </ResultText>
      <SearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      <ResultsWrapper>
        {loading ? <div>로딩</div> : null}
        {!loading &&
          results &&
          results.map((result, index) => (
            <RecentPostItem key={index} post={result} />
          ))}
      </ResultsWrapper>
    </SearchResultPageWraaper>
  );
}

export default SearchResultPage;
