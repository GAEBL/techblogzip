import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Companylogo from './CompanyLogo';
import { NativeSelect, FormControl } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, clearPosts } from '../../reducers/post';
import PostList from '../../components/PostList';
import SimplePagination from '../../components/Material/SimplePagination';

const CompanySelector = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
`;

const RecentPostsPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;
`;

const PostsDropdown = styled.div`
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
      company: companyhash[company],
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
      <CompanySelector>
        <h1>기업의 기술블로그에서 원하는 주제를 찾아보세요.</h1>
        {companys.map((company, index) => (
          <Companylogo
            key={index}
            fileName={company[0]}
            color={company[1]}
            handleClick={() => handleClick(company[0])}
          />
        ))}
      </CompanySelector>

      <PostsDropdown>
        <h1>포스트</h1>
        <FormControl>
          <NativeSelect value={queryParams.sort} onChange={handleChange}>
            <option value="">최신순</option>
            <option value="likes">좋아요순</option>
            <option value="user_recommendation">매칭순</option>
          </NativeSelect>
        </FormControl>
      </PostsDropdown>

      <PostList actionType="post/GET_ALL_POSTS" />

      <SimplePagination
        currentPage={queryParams.page}
        handlePage={handlePage}
      />
    </RecentPostsPageWrapper>
  );
}

export default RecentPostsPage;

const companys = [
  ['brother_logo.png', 'white'],
  ['coupang_logo.png', 'black'],
  ['d2_logo.gif', 'white'],
  ['kakao_logo_black.png', 'black'],
  ['line_logo.png', 'black'],
  ['sds_logo.png', 'white'],
  ['spoqa_logo.png', 'white'],
  ['toast_logo.png', 'white'],
  ['yanolja_logo.png', 'black'],
];

const companyhash = {
  'brother_logo.png': 'WOOWABROS',
  'coupang_logo.png': 'COUPANG TECH',
  'd2_logo.gif': 'NAVER D2',
  'kakao_logo_black.png': 'KAKAO TECH',
  'line_logo.png': 'LINE ENGINEERING',
  'sds_logo.png': 'SAMSUNG SDS',
  'spoqa_logo.png': 'SPOQA',
  'toast_logo.png': 'TOAST',
  'yanolja_logo.png': 'YANOLJA',
};
