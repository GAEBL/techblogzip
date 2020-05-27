import React from 'react';
import { InputBase, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const CostomInputBase = styled(InputBase)`
  margin: 0 0 0 1rem;
`;

const CostomPaper = styled(Paper)`
  display: flex;
  margin-bottom: 1rem;
`;

function SearchInput({ query, setQuery, handleSearch }) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <CostomPaper>
      <CostomInputBase
        placeholder="검색해보세요"
        fullWidth
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <IconButton type="submit" aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </CostomPaper>
  );
}

export default SearchInput;
