import React from 'react';
import styled from 'styled-components';
import Companylogo from '../../components/CompanyLogos'

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
`

function TrendPage(props) {
  return (
    <GridWrapper>
      <div></div>
      <div>
        <h1>기업의 기술블로그에서 원하는 주제를 찾아보세요</h1>
        <br/>
        <Companylogo/>
      </div>
      <div></div>
    </GridWrapper>
  );
}

export default TrendPage;
