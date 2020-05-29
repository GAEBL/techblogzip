import React from 'react';
import styled from 'styled-components';
import { DatePicker } from '@material-ui/pickers';
import { StylesProvider } from '@material-ui/core';
import PropTypes from 'prop-types';

const CustomDatePicker = styled(DatePicker)`
  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.mainColor};
  }
  /* 호버 시 보더 색상 */
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.mainColor};
  }
  /* 포커스시 라벨 색상 */
  & label.Mui-focused {
    color: ${({ theme }) => theme.mainColor};
  }
  /* 포커스시 보더 색상 */
  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.mainColor};
  }

  /* 내부 캘린더 색상은 루트의 index.css에서 수정할것... */
`;

// label, value, onchange

function SimpleDatePicker(props) {
  return (
    <StylesProvider injectFirst>
      <CustomDatePicker
        {...props}
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="yyyy년 MM월 dd일"
        disableFuture
      />
    </StylesProvider>
  );
}

export default SimpleDatePicker;

SimpleDatePicker.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
