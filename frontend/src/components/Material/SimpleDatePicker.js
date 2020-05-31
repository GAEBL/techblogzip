import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import { colors, makeStyles, StylesProvider } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.deepOrange[300],
    },
    '& label.Mui-focused': {
      color: colors.deepOrange[300],
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.deepOrange[300],
    },
  },
}));

// label, value, onchange

function SimpleDatePicker(props) {
  const classes = useStyles();
  return (
    <StylesProvider injectFirst>
      <DatePicker
        classes={classes}
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
