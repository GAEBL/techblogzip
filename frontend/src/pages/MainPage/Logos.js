import React from 'react';
import styled from 'styled-components';
import companyLogoData from '../../lib/companyLogoData';
import { colors } from '@material-ui/core';

const LogosWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 4px;
  object-fit: cover;
  border: 2px solid ${colors.grey[100]};
  @media all and (max-width: 700px) {
    width: 80px;
    height: 80px;
  }
`;

function Logos(props) {
  return (
    <LogosWrapper>
      {companyLogoData.map(({ name, filename }, i) => {
        const logoUrl = `${process.env.PUBLIC_URL}/images/${filename}`;
        if (i > 0) {
          return <Logo key={i} name={name} src={logoUrl} />;
        } else {
          return null;
        }
      })}
    </LogosWrapper>
  );
}

export default Logos;
