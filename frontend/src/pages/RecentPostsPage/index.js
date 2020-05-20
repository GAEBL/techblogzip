import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Companylogos from './CompanyLogos';
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

  useEffect(() => {
    dispatch(getAllPosts({ company: '', sort: '' }));

    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);

  const [state, setState] = useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <RecentPostsPageWrapper>
      <CompanySelector>
        <h1>기업의 기술블로그에서 원하는 주제를 찾아보세요</h1>
        <Companylogos />
      </CompanySelector>
      <PostsDropdown>
        <h1>포스트</h1>
        <FormControl>
          <NativeSelect
            value={state.age}
            onChange={handleChange}
            inputProps={{
              name: 'age',
            }}
          >
            <option value={10}>최신순</option>
            <option value={20}>좋아요순</option>
            <option value={30}>매칭순</option>
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
