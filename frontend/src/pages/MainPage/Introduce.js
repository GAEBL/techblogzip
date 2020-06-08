import React from 'react';
import styled from 'styled-components';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const DownIcon = styled(ArrowDownwardIcon)`
  position: absolute;
  bottom: 2%;
  color: white;
  left: 50%;
  transform: translateX(-50%);
  animation: beat 0.5s infinite alternate;
  transform-origin: center;
  transform: scale(1.3);
  opacity: 0.6;
  cursor: pointer;
  /* Heart beat animation */
  @keyframes beat {
    to {
      transform: scale(1.4);
      opacity: 1;
    }
  }
`;

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
      font-size: 4rem;
    }
  }

  @media all and (max-width: 700px) {
    align-items: center;
    h1 {
      font-size: 1.5rem;
      &.logo {
        font-size: 2rem;
      }
    }
  }
`;

function Introduce(props) {
  const onClick = () => {
    window.scrollTo({
      top: document.body.clientHeight,
      left: 0,
      behavior: 'smooth',
    });
  };
  const imageUrl = `${process.env.PUBLIC_URL}/images/main_1.jpeg`;
  return (
    <IntroduceWrapper>
      <img className="cover__img" src={imageUrl} alt="" />
      <ContentsWrapper>
        <h1>기술 블로그 지식을 한눈에,</h1>
        <h1 className="logo">TECHBLOG.ZIP</h1>
      </ContentsWrapper>
      <DownIcon onClick={onClick} />
    </IntroduceWrapper>
  );
}

export default Introduce;
