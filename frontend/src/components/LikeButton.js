import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleLike } from '../reducers/post';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles, colors } from '@material-ui/core';
import cs from 'classnames';

const useStyle = makeStyles(() => ({
  root: {
    fontSize: '1rem',
    color: '#e0e0e0',
    '&.liked': {
      color: '#f44336',
    },
  },
}));

const LikeButtonWrapper = styled.div`
  font-size: 0.4rem;
  .like__button {
    display: flex;
    padding: 0.2rem 0.3rem;
    align-items: center;
    background: none;
    border: none;
    :focus {
      outline: none;
    }

    &.clickable {
      cursor: pointer;
    }
  }
  .like__count {
    margin-left: 0.5rem;
    color: ${colors.grey[400]};
  }
`;

function LikeButton({ postId, isLiked, likeCount }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(({ user }) => ({
    isLoggedIn: user.isLoggedIn,
  }));

  const onToggleLike = () => {
    dispatch(toggleLike(postId));
  };

  return (
    <LikeButtonWrapper>
      <button
        className={cs('like__button', { clickable: isLoggedIn })}
        onClick={isLoggedIn ? onToggleLike : null}
      >
        <FavoriteIcon classes={classes} className={cs({ liked: isLiked })} />
        <span className="like__count">{likeCount}</span>
      </button>
    </LikeButtonWrapper>
  );
}

export default LikeButton;
