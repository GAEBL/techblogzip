import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 100%;

  @media all and (max-width: 600px) {
    height: 250px;
    width: 350px;
  }
  @media all and (max-width: 350px) {
    height: 200px;
    width: 200px;
  }
`;

function ChartWrapper({ children }) {
  return <ChartContainer>{children}</ChartContainer>;
}

export default ChartWrapper;
