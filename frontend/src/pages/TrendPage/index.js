import React from 'react';
import styled from 'styled-components';
import TrendForm from './TrendForm';

const TrendPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;
`;

function TrendPage(props) {
  return (
    <TrendPageWrapper>
      <TrendForm />
    </TrendPageWrapper>
  );
}

export default TrendPage;
