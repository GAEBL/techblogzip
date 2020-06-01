import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.span`
  font-family: 'Bungee Shade', cursive;
  font-size: ${(props) => props.size};
  font-weight: bold;
  color: ${({ theme }) => theme.mainColor};
  margin-bottom: ${(props) => (props.margin ? '1rem' : 0)};
  &.vertical {
    span {
      display: block;
      text-align: center;
    }
  }
`;

function Logo({ size = '2.5rem', reverse = false, margin = false }) {
  return (
    <LogoWrapper size={size} reverse={reverse} margin={margin}>
      <span>TECH</span>
      <span>BLOG</span>
      <span>.ZIP</span>
    </LogoWrapper>
  );
}

export default Logo;
