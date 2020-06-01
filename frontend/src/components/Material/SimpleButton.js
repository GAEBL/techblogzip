import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import theme from '../../style/theme';

const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: theme.mainColor,
    '&:hover': {
      backgroundColor: theme.mainColor__hover,
    },
  },
}));

function SimpleButton(props) {
  const classes = useStyles();
  return <Button classes={classes} {...props} variant="contained" />;
}

export default SimpleButton;
