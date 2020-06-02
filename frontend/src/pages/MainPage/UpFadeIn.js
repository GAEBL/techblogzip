import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import _ from 'lodash';

const UpFadeInWrapper = styled.div`
  padding: 1rem;
`;

const FadeInTexts = styled.div`
  padding: 1rem;
  .contents {
    display: flex;
    align-items: center;
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
`;

function UpFadeIn({ children }) {
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
    <UpFadeInWrapper>
      <FadeInTexts ref={texts}>
        <div className={cn('contents', { fadeIn })}>{fadeIn && children}</div>
      </FadeInTexts>
    </UpFadeInWrapper>
  );
}

export default UpFadeIn;
