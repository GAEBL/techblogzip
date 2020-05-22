import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.h1`
  font-family: 'Bungee Shade', cursive;
  font-size: ${(props) => props.size};
  color: ${({ theme, reverse }) =>
    reverse ? theme.mainColor : theme.logoColor};
`;

function Logo({ size = '2.5rem', reverse = false }) {
  return (
    <LogoWrapper size={size} reverse={reverse}>
      TECHBLOG.ZIP
    </LogoWrapper>
  );
}

export default Logo;
