import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function SimplePagination({ currentPage, handlePage }) {
  const { lastPage } = useSelector(({ post }) => ({
    lastPage: post.lastPage,
  }));

  return (
    <>
      {lastPage > 0 && (
        <PaginationWrapper>
          <Pagination
            count={lastPage}
            size="large"
            onChange={(_, nextPage) => handlePage(nextPage)}
            value={currentPage}
            page={currentPage}
          />
        </PaginationWrapper>
      )}
    </>
  );
}

export default SimplePagination;
