import React, { useState } from 'react';
import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core';

const HeartIcon = styled(FavoriteIcon)`
  animation: beat 0.3s infinite alternate;
  transform-origin: center;
  cursor: pointer;

  /* Heart beat animation */
  @keyframes beat {
    to {
      transform: scale(1.4);
    }
  }
`;

const useStyle = makeStyles(() => ({
  root: {
    fontSize: '3rem',
    color: '#f44336',
    scale: '1.3',
  },
}));

const FakeLikeBtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 70px 150px;
  align-items: center;
  justify-items: center;

  .number {
    font-size: 3rem;
    font-weight: bold;
    color: white;
  }
`;

function FakeLikeBtn() {
  const classes = useStyle();
  const [fakeCount, setFakeCount] = useState(9998);

  const handleFakeCount = () => {
    setFakeCount(fakeCount + 1);
  };

  return (
    <FakeLikeBtnWrapper>
      <div className="" onClick={handleFakeCount}>
        <HeartIcon classes={classes} />
      </div>
      <div className="number">{fakeCount.toLocaleString()}</div>
    </FakeLikeBtnWrapper>
  );
}

export default FakeLikeBtn;
