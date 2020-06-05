import React from 'react';
import styled from 'styled-components';
import { colors } from '@material-ui/core';
import cs from 'classnames';
import CompanyLogo from '../../components/CompanyLogo';

const ButtonWrapper = styled.button`
  height: 100px;
  width: 100px;
  padding: 0;
  margin: 0.2rem 0.5rem 0 0;
  border: 2px solid ${colors.grey[100]};
  border-radius: 5px;
  cursor: pointer;
  transform: scale(0.98);
  opacity: 0.5;
  transition: all 0.5s;
  :focus {
    outline: none;
  }
  :hover,
  &.active {
    transform: scale(1);
    opacity: 1;
    border: 2px solid ${({ theme }) => theme.nonselectedMainColor[500]};
  }

  .logo__img {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media all and (max-width: 1024px) {
    height: 60px;
    width: 60px;
  }
`;

function LogoButton({ handleClick, company, selected }) {
  const { name } = company;
  return (
    <ButtonWrapper
      className={cs({ active: selected === name })}
      onClick={handleClick}
    >
      <CompanyLogo name={name} size="100%" border={false} />
    </ButtonWrapper>
  );
}

export default LogoButton;
