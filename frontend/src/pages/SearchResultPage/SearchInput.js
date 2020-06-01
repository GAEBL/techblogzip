import React, { useState } from 'react';
import { InputBase, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const SearchInputWrapper = styled.form``;

const CustomPaper = styled(Paper)`
  display: flex;
  height: ${(props) => props.dense && '35px'};
`;

const CustomInputBase = styled(InputBase)`
  margin-left: 1rem;
  width: 100%;
`;

function SearchInput({ history, handleClose = null, dense = false }) {
  const [query, setQuery] = useState('');

  const handleQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length === 0) return;
    setQuery('');
    if (handleClose) {
      handleClose();
    }
    history.push(`/search/${query}`);
  };

  return (
    <SearchInputWrapper onSubmit={handleSubmit}>
      <CustomPaper dense={dense}>
        <CustomInputBase
          placeholder="검색해보세요"
          value={query}
          onChange={handleQuery}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </CustomPaper>
    </SearchInputWrapper>
  );
}

export default withRouter(SearchInput);
