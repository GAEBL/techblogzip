import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const GoHome = styled(Link)`
  color: ${({ theme }) => theme.mainColor};
  font-size: 2rem;
`;

function NotFoundPage(props) {
  return (
    <PageWrapper>
      <div className="text">페이지를 찾을 수 없습니다!</div>
      <GoHome to="/">홈으로</GoHome>
    </PageWrapper>
  );
}

export default NotFoundPage;
