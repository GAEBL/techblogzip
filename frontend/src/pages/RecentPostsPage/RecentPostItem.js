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
  const { company, title, date, contents, image, url, tags, is_liked } = post;
  return (
    <StylesProvider injectFirst>
      <CostomA href={url}>
        <CostomCard>
          <PostImg src={image} alt="" />
          <CardContent>
            <h5>{company.name}</h5>
            <h3>{title}</h3>
            <Summary>{contents}</Summary>
            <FormatDate>{date}</FormatDate>
          </CardContent>
        </CostomCard>
      </CostomA>
    </StylesProvider>
  );
};

export default RecentPostItem;
