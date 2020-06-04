import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoButton from './LogoButton';
import { MenuItem, Fade } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, clearPosts } from '../../reducers/post';
import PostList from '../../components/PostList';
import SimplePagination from '../../components/Material/SimplePagination';
import companyLogoData from '../../lib/companyLogoData';
import SimpleTextField from '../../components/Material/SimpleTextField';
import Carousel from './Carousel';

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const CompanySelector = styled.div`
  margin-bottom: 1rem;
`;

const DropDownBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ContentsWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
`;

function RecentPostsPage() {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(({ post }) => ({
    mainPosts: post.main,
  }));

  const [queryParams, setQueryParams] = useState({
    company: '',
    sort: 'default',
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
    <>
      <Carousel posts={mainPosts} />
      <Fade in={true} {...{ timeout: 1500 }}>
        <ContentsWrapper>
          <Title>각 기업의 포스트를 찾아보세요.</Title>
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
              <h1>포스트</h1>
              <SimpleTextField
                select
                value={queryParams.sort}
                name="sort"
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="default">최신순</MenuItem>
                <MenuItem value="likes">좋아요순</MenuItem>
                {/* <MenuItem value="user_recommendation">매칭순</MenuItem> */}
              </SimpleTextField>
            </DropDownBar>
          </PostList>
          <SimplePagination
            currentPage={queryParams.page}
            handlePage={handlePage}
          />
        </ContentsWrapper>
      </Fade>
    </>
  );
}

export default RecentPostsPage;
