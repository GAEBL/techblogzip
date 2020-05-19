import React from 'react';
import SearchInput from './SearchInput';
import SearchPostItem from '../RecentPostsPage/RecentPostItem';
import styled from 'styled-components';
import dummy from '../RecentPostsPage/dummy';

const SearchResultPageWraaper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ResultText = styled.p`
  font-size: 40px;
`;

function SearchResultPage(props) {
  return (
    <SearchResultPageWraaper>
      <ResultText>
        "{}"검색 결과({}건)
      </ResultText>
      <SearchInput />
      {dummy.map((dum, index) => (
        <SearchPostItem key={index} post={dum} />
      ))}
    </SearchResultPageWraaper>
  );
}

export default SearchResultPage;
