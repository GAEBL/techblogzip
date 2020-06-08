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

function SearchInput({ history, handleClose = null, dense = false, setPage }) {
  const [query, setQuery] = useState('');

  const handleQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length === 0) return;
    setPage(1);
    setQuery('');

    if (query.includes('#')) {
      const word = query.replace('#', '');
      history.push(`/tag/${word}`);
      return;
    }

    if (handleClose) {
      handleClose();
    }

    history.push(`/search/${query}`);
  };

  return (
    <SearchInputWrapper onSubmit={handleSubmit}>
      <CustomPaper dense={dense.toString()}>
        <CustomInputBase
          placeholder="#검색어로 태그검색"
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
