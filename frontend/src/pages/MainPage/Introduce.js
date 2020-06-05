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
      font-size: 4rem;
      /* animation: neon 3s cubic-bezier(0, 1.38, 1, -0.44) infinite;
      -moz-animation: neon 3s cubic-bezier(0, 1.38, 1, -0.44) infinite;
      -webkit-animation: neon 3s cubic-bezier(0, 1.38, 1, -0.44) infinite; */
      @keyframes neon {
        0%,
        100% {
          text-shadow: 0 0 1vw #fa1c16, 0 0 3vw #fa1c16, 0 0 10vw #fa1c16,
            0 0 10vw #fa1c16, 0 0 0.4vw #fed128, 0.5vw 0.5vw 0.1vw #806914;
          color: #fed128;
        }
        50% {
          text-shadow: 0 0 0.5vw #800e0b, 0 0 1.5vw #800e0b, 0 0 5vw #800e0b,
            0 0 5vw #800e0b, 0 0 0.2vw #800e0b, 0.5vw 0.5vw 0.1vw #40340a;
          color: #806914;
        }
      }
      @keyframes flux {
        0%,
        100% {
          text-shadow: 0 0 1vw #1041ff, 0 0 3vw #1041ff, 0 0 10vw #1041ff,
            0 0 10vw #1041ff, 0 0 0.4vw #8bfdfe, 0.5vw 0.5vw 0.1vw #147280;
          color: #28d7fe;
        }
        50% {
          text-shadow: 0 0 0.5vw #082180, 0 0 1.5vw #082180, 0 0 5vw #082180,
            0 0 5vw #082180, 0 0 0.2vw #082180, 0.5vw 0.5vw 0.1vw #0a3940;
          color: #146c80;
        }
      }
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
