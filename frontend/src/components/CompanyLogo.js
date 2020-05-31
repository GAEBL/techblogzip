import React from 'react';
import styled from 'styled-components';
import companyLogoData from '../lib/companyLogoData';
import { colors } from '@material-ui/core';

const Logo = styled.img`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 4px;
  border: ${(props) =>
    props.border ? `2px solid ${colors.grey[100]}` : 'none'};
  object-fit: cover;
`;

function CompanyLogo({ name, size = '50px', border = true }) {
  const { displayName, filename } = companyLogoData.find(
    (data) => data.name === name,
  );
  const logoUrl = `${process.env.PUBLIC_URL}/images/${filename}`;
  return (
    <Logo
      className="info__logo"
      src={logoUrl}
      alt={displayName}
      size={size}
      border={border}
    />
  );
}

export default CompanyLogo;
