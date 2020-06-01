import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoButton from './LogoButton';
import { NativeSelect, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getAllPosts, clearPosts } from '../../reducers/post';
import PostList from '../../components/PostList';
import SimplePagination from '../../components/Material/SimplePagination';
import companyLogoData from '../../lib/companyLogoData';

const RecentPostsPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const CompanySelector = styled.div`
  margin-bottom: 1rem;
`;

const DropDownBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

function RecentPostsPage() {
  const dispatch = useDispatch();

  const [queryParams, setQueryParams] = useState({
    company: '',
    sort: '',
    page: 1,
  });

  useEffect(() => {
    dispatch(getAllPosts(queryParams));
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch, queryParams]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQueryParams({
      ...queryParams,
      sort: value,
    });
  };

  const handleClick = (company) => {
    setQueryParams({
      ...queryParams,
      company,
      page: 1,
    });
  };

  const handlePage = (nextPage) => {
    setQueryParams({
      ...queryParams,
      page: nextPage,
    });
  };

  return (
    <RecentPostsPageWrapper>
      <Title>기업의 기술블로그에서 원하는 주제를 찾아보세요.</Title>
      <CompanySelector>
        {companyLogoData.map((company) => (
          <LogoButton
            key={company.name}
            company={company}
            selected={queryParams.company}
            handleClick={() => handleClick(company.name)}
          />
        ))}
      </CompanySelector>

      <PostList actionType="post/GET_ALL_POSTS">
        <DropDownBar>
          <Title>포스트</Title>
          <FormControl>
            <NativeSelect value={queryParams.sort} onChange={handleChange}>
              <option value="">최신순</option>
              <option value="likes">좋아요순</option>
              <option value="user_recommendation">매칭순</option>
            </NativeSelect>
          </FormControl>
        </DropDownBar>
      </PostList>

      <SimplePagination
        currentPage={queryParams.page}
        handlePage={handlePage}
      />
    </RecentPostsPageWrapper>
  );
}

export default RecentPostsPage;
