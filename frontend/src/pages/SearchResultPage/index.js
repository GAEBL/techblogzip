import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, clearPosts } from '../../reducers/post';
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
  const results = useSelector((state) => state.post.posts);
  const loading = useSelector(
    (state) => state.loading['search/GET_SEARCHRESULTS'],
  );

  const handleSearch = () => {
    dispatch(getSearchResults({ query }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);

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
