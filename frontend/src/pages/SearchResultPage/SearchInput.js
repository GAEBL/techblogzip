import React, { useState } from 'react';
import { InputBase, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const SearchInputWrapper = styled.form`
  margin: 1rem 0;
`;

const CustomPaper = styled(Paper)`
  display: flex;
  margin-bottom: 1rem;
`;

const CustomInputBase = styled(InputBase)`
  margin-left: 1rem;
  width: 100%;
`;

function SearchInput({ history }) {
  const [query, setQuery] = useState('');

  const handleQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  };

  return (
    <SearchInputWrapper onSubmit={handleSubmit}>
      <CustomPaper>
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
