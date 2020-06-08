import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setPage } from '../../reducers/post';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0 2rem 0;
`;

function SimplePagination() {
  const { page, lastPage } = useSelector(({ post }) => ({
    lastPage: post.lastPage,
    page: post.page,
  }));

  const dispatch = useDispatch();
  const handlePage = (page) => dispatch(setPage(page));

  return (
    <>
      {lastPage > 0 && (
        <PaginationWrapper>
          <Pagination
            count={lastPage}
            size="small"
            onChange={(_, nextPage) => {
              window.scrollTo(0, 450);
              handlePage(nextPage);
            }}
            value={page}
            page={page}
          />
        </PaginationWrapper>
      )}
    </>
  );
}

export default SimplePagination;
