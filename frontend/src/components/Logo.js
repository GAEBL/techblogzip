import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

const LogoWrapper = styled.span`
  font-family: 'Bungee', cursive;
  font-size: ${(props) => props.size};
  font-weight: bold;
  color: ${({ theme, color }) => (color ? color : theme.mainColor)};
  margin-bottom: ${(props) => (props.margin ? '1rem' : 0)};
  text-align: center;

  @media all and (max-width: 600px) {
    &.responsive {
      font-size: 1.5rem;
    }
  }
`;

function Logo({
  size = '2.5rem',
  margin = false,
  color = null,
  responsive = true,
}) {
  return (
    <LogoWrapper
      size={size}
      margin={margin}
      color={color}
      className={cn({ responsive })}
    >
      <span>TECH</span>
      <span>BLOG</span>
      <span>.ZIP</span>
    </LogoWrapper>
  );
}

export default Logo;
