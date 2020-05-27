import React from 'react';
import styled from 'styled-components';

const LogoImg = styled.img`
  height: 25px;
`;

const LogoButton = styled.button`
  background-color: ${(props) => props.color};
  border: solid black 1px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  :hover {
    cursor: pointer;
  }
`;

function CompanyLogo({ index, color, handleClick, fileName }) {
  const imageUrl = process.env.PUBLIC_URL + '/images/' + fileName;
  return (
    <LogoButton key={index} color={color} onClick={handleClick}>
      <LogoImg src={imageUrl} alt="logo" />
    </LogoButton>
  );
}

export default CompanyLogo;
