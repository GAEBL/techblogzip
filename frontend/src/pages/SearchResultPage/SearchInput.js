import React from 'react';
import { InputBase, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const CostomInputBase = styled(InputBase)`
  margin: 0 0 0 1rem;
`;

const CostomPaper = styled(Paper)`
  width: fit-content;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 24fr 1fr;
  margin-bottom: 1rem;
`;

function SearchInput() {
  return (
    <CostomPaper>
      <CostomInputBase
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </CostomPaper>
  );
}

export default SearchInput;
