import React from 'react';
import styled from 'styled-components';
import Companylogo from './CompanyLogos';
import RecentPost from './RecentPost';
import { NativeSelect, FormControl } from '@material-ui/core';
import posts from './dummy';

const RecentPostPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const PostLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

function TrendPage(props) {
  const [state, setState] = React.useState({
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
    <RecentPostPageWrapper>
      <div>
        <h1>기업의 기술블로그에서 원하는 주제를 찾아보세요</h1>
        <br />
        <Companylogo />
        <br />
        <br />
        <PostLine>
          <h2>포스트</h2>
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
        </PostLine>
        <div>
          {posts.map((post, index) => (
            <RecentPost key={index} post={post} />
          ))}
        </div>
      </div>
    </RecentPostPageWrapper>
  );
}

export default TrendPage;
