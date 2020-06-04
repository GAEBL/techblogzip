import React from 'react';
import styled from 'styled-components';

const IntroduceWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  .cover__img {
    z-index: -1;
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.7;
  }
`;

const ContentsWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  color: white;

  h1 {
    font-size: 2.5rem;
    &.logo {
      font-family: 'Bungee Hairline', cursive;
    }
  }

  @media all and (max-width: 700px) {
    align-items: center;
    h1 {
      font-size: 1.5rem;
    }
  }
`;

function Introduce(props) {
  const imageUrl = `${process.env.PUBLIC_URL}/images/main_1.jpeg`;
  return (
    <IntroduceWrapper>
      <img className="cover__img" src={imageUrl} alt="" />
      <ContentsWrapper>
        <h1>기술 블로그 지식을 한눈에,</h1>

        <h1 className="logo">TECHBLOG.ZIP</h1>
      </ContentsWrapper>
    </IntroduceWrapper>
  );
}

export default Introduce;
