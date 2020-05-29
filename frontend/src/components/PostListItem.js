import React from 'react';
import styled from 'styled-components';
import { Card } from '@material-ui/core';

const CustomCard = styled(Card)`
  height: 200px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  margin-bottom: 1rem;
`;

const PostImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ItemContainer = styled.div`
  padding: 1rem;
  .item__name {
  }
  .item__title {
  }
  .item__summary {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 20px;
    max-height: 60px;
    word-break: break-word;
  }
  .item__date {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
  }
`;

// TODO: 좋아요, 태그리스트 추가할것

function PostListItem({ post }) {
  const { company, contents, date, image, is_liked, tags, title, url } = post;
  return (
    <CustomCard>
      <PostImg src={image} alt="" />
      <ItemContainer>
        <h5 className="item__name">{company.name}</h5>
        <a className="item__title" href={url}>
          {title}
        </a>
        <p className="item__summary">{contents}</p>
        <div className="item__date">{date}</div>
      </ItemContainer>
    </CustomCard>
  );
}

export default PostListItem;
