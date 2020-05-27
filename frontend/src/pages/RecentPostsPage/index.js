import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Companylogo from './CompanyLogo';
import RecentPostItem from './RecentPostItem';
import { NativeSelect, FormControl } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, clearPosts } from '../../reducers/post';

const CompanySelector = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
`;

const RecentPostsPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const PostsDropdown = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const PostsWrapper = styled.div``;

function RecentPostsPage(props) {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(({ post, loading, user }) => ({
    posts: post.posts,
    loading: loading['post/GET_ALL_POSTS'],
  }));

  const [company, setCompany] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    dispatch(getAllPosts({ company, sort }));
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch, company, sort]);

  const handleChange = (e) => {
    setSort(e.target.value);
  };

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

  const handleClick = (company) => {
    setCompany(companyhash[company]);
  };

  return (
    <RecentPostsPageWrapper>
      <CompanySelector>
        <h1>기업의 기술블로그에서 원하는 주제를 찾아보세요</h1>
        {companys.map((company, index) => (
          <Companylogo
            key={index}
            fileName={company[0]}
            color={company[1]}
            handleClick={() => {
              handleClick(company[0]);
            }}
          />
        ))}
      </CompanySelector>
      <PostsDropdown>
        <h1>포스트</h1>
        <FormControl>
          <NativeSelect
            value={sort}
            onChange={handleChange}
            inputProps={{ sort }}
          >
            <option value={''}>최신순</option>
            <option value={'likes'}>좋아요순</option>
            <option value={'user_recommendation'}>매칭순</option>
          </NativeSelect>
        </FormControl>
      </PostsDropdown>
      <PostsWrapper>
        {loading ? <div>로딩</div> : null}
        {!loading &&
          posts.length > 0 &&
          // TODO: ID 고쳐지면 post.id로 넣기
          posts.map((post, index) => (
            <RecentPostItem key={index} post={post} />
          ))}
      </PostsWrapper>
    </RecentPostsPageWrapper>
  );
}

export default RecentPostsPage;
