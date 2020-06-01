import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: 'black',
  },
}));

export default function HideAppBar(props) {
  const classes = useStyle();
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar classes={classes}>
          <Toolbar>{props.children}</Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
