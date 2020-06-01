import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import cn from 'classnames';
import _ from 'lodash';
import Logo from '../../components/Logo';

const PageDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .logo-wrapper {
    margin-bottom: 2rem;
  }
`;

const FadeInTexts = styled.div`
  .text {
    display: flex;
    align-items: center;
    font-size: 2.3rem;
    font-weight: bold;
    /* fade-in */
    transform: translateY(50px) scale(1);
    opacity: 0;
    transition: transform 0.7s cubic-bezier(0, 0, 0.2, 1) 0s,
      opacity 0.7s cubic-bezier(0, 0, 0.2, 1) 0s;
    &.fadeIn {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  @media all and (max-width: 600px) {
    .text {
      font-size: 1.5rem;
    }
  }
`;

const StyledCountUp = styled(CountUp)`
  font-size: 2rem;
  color: ${({ theme }) => theme.mainColor};
  margin-right: 0.3rem;
  @media all and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

function PageData({ pageData }) {
  const { companyCount, postsCount } = pageData;
  const [fadeIn, setFadeIn] = useState(false);
  const texts = useRef(null);

  const handleScroll = () => {
    const { innerHeight } = window; // 화면 높이
    const { y } = texts.current.getBoundingClientRect();
    if (y < innerHeight) {
      setFadeIn(true);
    } else {
      setFadeIn(false);
    }
  };

  const throttledHandleScroll = _.throttle(handleScroll, 100);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  return (
    <PageDataWrapper>
      <div className="logo-wrapper">
        <Logo size="2rem" />
      </div>
      <FadeInTexts ref={texts}>
        <div className={cn('text', { fadeIn })}>
          {fadeIn && (
            <StyledCountUp end={companyCount} duration={3} separator={','} />
          )}
          개 기업의 기술 개발 블로그
        </div>
        <div className={cn('text', { fadeIn })}>
          {fadeIn && (
            <StyledCountUp end={postsCount} duration={3} separator={','} />
          )}
          개의 블로그 포스트 분석
        </div>
      </FadeInTexts>
    </PageDataWrapper>
  );
}

export default PageData;
