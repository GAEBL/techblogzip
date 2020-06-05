import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function LoadingSpinner({ type, size, color, children }) {
  return (
    <LoadingWrapper>
      <ReactLoading type={type} color={color} width={size} height={size} />
      {children}
    </LoadingWrapper>
  );
}

export default LoadingSpinner;
