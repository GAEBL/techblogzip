import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.span`
  font-family: 'Bungee Shade', cursive;
  font-size: ${(props) => props.size};
  font-weight: bold;
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
