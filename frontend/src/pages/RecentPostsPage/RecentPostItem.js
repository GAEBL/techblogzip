import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, StylesProvider, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { postLike, tagClick, handleQuery } from '../../reducers/post';
import handleSearch from '../SearchResultPage/index';

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
  color: black;
`;
const FormatDate = styled.p`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const RecentPostItem = ({ post, history }) => {
  const {
    company,
    title,
    date,
    contents,
    image,
    url,
    tags,
    is_liked,
    id,
  } = post;
  const user = useSelector((user) => user);
  const dispatch = useDispatch();
  const [isliked, setIsLiked] = useState(is_liked);
  const handleLike = () => {
    if (user.user.isLoggedIn) {
      dispatch(postLike({ id, user }));
      // islike에 유저가 있다면 user.user.currentUser.id
      if (
        user.user.currentUser.id in isliked ||
        user.user.currentUser.id == isliked
      ) {
        isliked.splice(isliked.indexOf(user.user.currentUser.id), 1);
        setIsLiked(isliked);
      } else {
        // 없다면
        setIsLiked(isliked.concat(user.user.currentUser.id));
      }
    } else {
      alert('회원만 가능한 기능입니다.');
    }
  };

  const Heart = ({ isliked, user }) => {
    if (isliked === undefined) {
      return <></>;
    }
    if (
      Array.isArray(isliked) &&
      user.user.isLoggedIn &&
      (user.user.currentUser.id in isliked ||
        user.user.currentUser.id == isliked)
    ) {
      return `♥ X ${isliked.length}`;
    } else {
      return `♡ X ${isliked.length}`;
    }
  };

  const BadgeTag = ({ tag }) => {
    const handleTag = () => {
      if (history.location.pathname === '/search/:query') {
        // 검색페이지에서 찾아볼 때
        dispatch(handleQuery(tag.name));
        handleSearch();
      } else {
        history.push('/search/:query');
        dispatch(tagClick());
        dispatch(handleQuery(tag.name));
      }
    };
    return (
      <Button size="small" color="secondary" onClick={handleTag}>
        {tag.name}
      </Button>
    );
  };

  return (
    <StylesProvider injectFirst>
      <CostomCard>
        <CostomA href={url}>
          <PostImg src={image} alt="" />
        </CostomA>
        <CardContent>
          <CostomA href={url}>
            <h5>{company.name}</h5>
            <h3>{title}</h3>
            <Summary>{contents}</Summary>
          </CostomA>
          <div>
            {tags.map((tag, index) => (
              <BadgeTag tag={tag} key={index} />
            ))}
            <br />
            <button onClick={handleLike}>좋아요!</button>
            <Heart user={user} isliked={isliked} />
            <FormatDate>{date}</FormatDate>
          </div>
        </CardContent>
      </CostomCard>
    </StylesProvider>
  );
};

export default RecentPostItem;
