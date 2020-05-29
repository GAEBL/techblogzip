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

function SearchInput({ handleSearch, query, setQuery }) {
  // const [showQuery, setShowQuery] = React.useState(query);
  const handleChange = (e) => {
    console.log(e);
    setQuery(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query, 1);
    }
  };
  const handleClick = (e) => {
    handleSearch(query, 1);
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
      <IconButton type="submit" aria-label="search" onClick={handleClick}>
        <SearchIcon />
      </IconButton>
    </CostomPaper>
  );
}

export default SearchInput;
