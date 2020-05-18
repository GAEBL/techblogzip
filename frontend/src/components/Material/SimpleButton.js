import React from 'react';
import { Button, StylesProvider } from '@material-ui/core';
import styled from 'styled-components';

const CustomButton = styled(Button)`
  color: white;
  background-color: ${({ theme }) => theme.mainColor};
  :hover {
    background-color: ${({ theme }) => theme.mainColor__hover};
  }
`;

function SimpleButton(props) {
  return (
    <StylesProvider injectFirst>
      <CustomButton {...props} variant="contained" />
    </StylesProvider>
  );
}

export default SimpleButton;
