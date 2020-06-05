import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

const InnerBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  font-family: 'VT323', monospace;
  .team__slogan {
    font-size: 5rem;
    .accent {
      color: ${({ theme }) => theme.mainColor};
    }
  }

  .maker {
    font-size: 1rem;
    .maker__name {
      color: ${({ theme }) => theme.mainColor};
    }
    .maker__role {
    }
  }

  .team__name {
    font-size: 3rem;
  }
`;

function Footer(props) {
  return (
    <FooterWrapper>
      <InnerBox>
        <h2 className="team__slogan">
          <span role="img" aria-label="img">
            💻 WE
          </span>{' '}
          <span className="accent">GAE</span>THERING DEV T
          <span className="accent">E</span>CH <span className="accent">BL</span>
          OG{' '}
        </h2>
        <div className="maker">
          <span className="maker__name">KIM SEUNG YEON</span>{' '}
          <span className="maker__role">[FRONTEND / DEPLOY]</span>
        </div>
        <div className="maker">
          <span className="maker__name">KIM HYEOK JUN</span>{' '}
          <span className="maker__role">[FRONTEND & REVIEWER]</span>
        </div>
        <div className="maker">
          <span className="maker__name">YANG YE EUN</span>{' '}
          <span className="maker__role">[BACKEND / UCC DIRECTOR]</span>
        </div>
        <div className="maker">
          <span className="maker__name">JEONG MYEONG HAN</span>{' '}
          <span className="maker__role">[BACKEND & REVIEWER / DATA & A.I]</span>
        </div>
        <h2 className="team__name">
          {new Date().getFullYear()} GAEBL, All Rights Reserved.
        </h2>
      </InnerBox>
    </FooterWrapper>
  );
}

export default Footer;
