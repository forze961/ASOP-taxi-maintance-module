// @flow
import grey from '@material-ui/core/colors/grey';

import palette from '../palette';

export default {
  root: {
    color: palette.icon,
    '&:hover': {
      backgroundColor: (grey[100]: string),
    },
    '&$selected': {
      backgroundColor: (grey[50]: string),
      color: palette.primary.main,
      '&:hover': {
        backgroundColor: (grey[100]: string),
      },
    },
    '&:first-child': {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    '&:last-child': {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
  },
};
