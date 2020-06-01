import React from 'react';
import { TextField, colors, makeStyles } from '@material-ui/core';

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

function SimpleTextField(props) {
  const classes = useStyles();
  return <TextField classes={classes} {...props} variant="outlined" />;
}

export default SimpleTextField;
