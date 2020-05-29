import React from 'react';
import styled from 'styled-components';
import TrendForm from './TrendForm';
import TrendData from './TrendData';

const TrendPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;
  /* height: 100%;
  display: flex;
  align-items: center; */
`;

function TrendPage(props) {
  return (
    <TrendPageWrapper>
      <TrendForm />
      <TrendData />
    </TrendPageWrapper>
  );
}

export default TrendPage;
