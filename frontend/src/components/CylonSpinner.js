import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { colors } from '@material-ui/core';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  height: 600px;
  .text {
    font-family: 'VT323', monospace;
    font-size: 2rem;
    font-weight: bold;
    animation: tutsFade 0.5s 1s infinite linear alternate;
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
        <div className="text">Almost there!</div>
      </LoadingSpinner>
    </SpinnerWrapper>
  );
}

export default CylonSpinner;
