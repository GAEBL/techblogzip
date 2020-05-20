import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.h1`
  font-family: 'Bungee Shade', cursive;
  font-size: ${(props) => props.size};
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.logoColor};
`;

function Logo({ size = '2.5rem' }) {
  return <LogoWrapper size={size}>TECHBLOG.ZIP</LogoWrapper>;
}

export default Logo;
