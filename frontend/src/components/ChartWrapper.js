import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 100%;
`;

function ChartWrapper({ children }) {
  return <ChartContainer>{children}</ChartContainer>;
}

export default ChartWrapper;
