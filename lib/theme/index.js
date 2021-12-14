// @flow
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import type { Theme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme: Theme = createMuiTheme({
  palette,
  typography,
  overrides,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1366,
    },
  },
});

export default theme;
