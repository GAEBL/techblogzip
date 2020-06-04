import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { colors } from '@material-ui/core';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  height: 600px;
  .text {
    font-weight: bold;
    animation: tutsFade 1s 1s infinite linear alternate;
    @keyframes tutsFade {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
`;

function CylonSpinner() {
  return (
    <SpinnerWrapper>
      <LoadingSpinner color={colors.orange[500]} size={80} type={'cylon'}>
        <div className="text">거의 다 가져왔어요!</div>
      </LoadingSpinner>
    </SpinnerWrapper>
  );
}

export default CylonSpinner;
