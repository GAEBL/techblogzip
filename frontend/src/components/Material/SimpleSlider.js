import React from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import { StylesProvider } from '@material-ui/core';

const CustomSlider = styled(Slider)`
  &.MuiSlider-root {
    color: ${({ theme }) => theme.mainColor};
  }
  .MuiSlider-rail,
  .MuiSlider-track {
    height: 5px;
  }
`;

function SimpleSlider(props) {
  return (
    <StylesProvider injectFirst>
      <CustomSlider {...props} />
    </StylesProvider>
  );
}

export default SimpleSlider;
