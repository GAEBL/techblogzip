import React from 'react';
import styled from 'styled-components';
import { Card, colors, Fade } from '@material-ui/core';
import TagList from './TagList';
import CompanyLogo from './CompanyLogo';
import LikeButton from './LikeButton';

const ItemCard = styled(Card)`
  display: grid;
  grid-gap: 1rem;
  padding: 1.5rem;

  .item__info {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    align-items: center;
    .info__title {
      color: black;
      text-decoration: none;
      font-weight: bold;
      font-size: 1.3rem;
    }
    @media all and (max-width: 600px) {
      .info__title {
        font-size: 1rem;
      }
    }
  }

  .item__sub__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item__date {
      font-size: 0.8rem;
      color: ${colors.grey[400]};
    }
  }

  .item__img {
    height: 200px;
    width: 100%;
    object-fit: cover;
  }

  .item__summary {
    margin: 0;
    color: #444444;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 25px;
    max-height: 75px;
    /* word-break: break-word; */
  }
`;

// TODO: 좋아요 추가할것

function PostListItem({ post }) {
  const {
    id,
    company,
    contents,
    date,
    image,
    tags,
    title,
    url,
    check_liked,
    like_count,
  } = post;

  return (
    <Fade in={true} {...{ timeout: 1500 }}>
      <ItemCard>
        <div className="item__info">
          <CompanyLogo name={company.name} />
          <a className="info__title" href={url}>
            {title}
          </a>
        </div>
        <div className="item__sub__info">
          <LikeButton
            postId={id}
            isLiked={check_liked}
            likeCount={like_count}
          />
          <span className="item__date">{date}</span>
        </div>
        <p className="item__summary">{contents}</p>
        <img className="item__img" src={image} alt="thumnail" />
        <TagList tags={tags} />
      </ItemCard>
    </Fade>
  );
}

export default PostListItem;
