import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoButton from './LogoButton';
import { MenuItem, Fade } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, setPage } from '../../reducers/post';
import PostList from '../../components/PostList';
import SimplePagination from '../../components/Material/SimplePagination';
import companyLogoData from '../../lib/companyLogoData';
import SimpleTextField from '../../components/Material/SimpleTextField';
import Carousel from './Carousel';

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SelectorWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 0px 1.1px rgba(0, 0, 0, 0.019), 0 0px 6.3px rgba(0, 0, 0, 0.027),
    0 0px 16.4px rgba(0, 0, 0, 0.033), 0 0px 34.7px rgba(0, 0, 0, 0.041),
    0 0px 80px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  margin-bottom: 1rem;
  .selector__header {
    display: flex;
    justify-content: space-between;
  }
`;

const CompanySelector = styled.div`
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
  const { mainPosts, page } = useSelector(({ post }) => ({
    mainPosts: post.main,
    page: post.page,
  }));

  const [queryParams, setQueryParams] = useState({
    company: '',
    sort: 'default',
  });

  useEffect(() => {
    dispatch(
      getAllPosts({
        ...queryParams,
        page,
      }),
    );
  }, [dispatch, queryParams, page]);

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
    });
    dispatch(setPage(1));
  };

  return (
    <>
      <Carousel posts={mainPosts} />
      <Fade in={true} {...{ timeout: 1500 }}>
        <ContentsWrapper>
          <SelectorWrapper>
            <div className="selector__header">
              <Title>각 기업의 포스트를 찾아보세요.</Title>
              <SimpleTextField
                select
                value={queryParams.sort}
                name="sort"
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="default">최신순</MenuItem>
                <MenuItem value="likes">좋아요순</MenuItem>
              </SimpleTextField>
            </div>

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
          </SelectorWrapper>

          <PostList actionType="post/GET_ALL_POSTS" />
          <SimplePagination />
        </ContentsWrapper>
      </Fade>
    </>
  );
}

export default RecentPostsPage;
