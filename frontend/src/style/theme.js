import { colors } from '@material-ui/core';

// const MAIN_COLOR = colors.deepOrange;
const MAIN_COLOR = colors.orange;

const theme = {
  nonselectedMainColor: MAIN_COLOR,
  mainColor: MAIN_COLOR[600],
  mainColor__hover: MAIN_COLOR[500],
  logoColor: colors.indigo[500],
  maxPageWidth: '1500px',
  sm: '600px',
};

export default theme;
