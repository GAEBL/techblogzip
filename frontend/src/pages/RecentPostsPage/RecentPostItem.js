import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, StylesProvider } from '@material-ui/core';

const CostomCard = styled(Card)`
  display: grid;
  grid-template-columns: 2fr 3fr;
  margin-bottom: 1rem;
`;
const PostImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const Summary = styled.p`
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 20px;
  max-height: 60px;
  word-break: break-word;
`;
const CostomA = styled.a`
  text-decoration: none;
`;
const FormatDate = styled.p`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const RecentPostItem = ({ post }) => {
  const postday = new Date(post.postPublishedAt);
  const formatday =
    postday.getFullYear() + '.' + postday.getMonth() + '.' + postday.getDate();
  return (
    <StylesProvider injectFirst>
      <CostomA href={'https://d2.naver.com' + post.url}>
        <CostomCard>
          <PostImg src={'https://d2.naver.com' + post.postImage} alt="" />
          <CardContent>
            <h3>{post.postTitle}</h3>
            <Summary>{post.postHtml}</Summary>
            <FormatDate>{formatday}</FormatDate>
          </CardContent>
        </CostomCard>
      </CostomA>
    </StylesProvider>
  );
};

export default RecentPostItem;
