// @flow
import blueGrey from '@material-ui/core/colors/blueGrey';

export default {
  root: {
    backgroundColor: (blueGrey[50]: string),
    color: (blueGrey[900]: string),
  },
  deletable: {
    '&:focus': {
      backgroundColor: (blueGrey[100]: string),
    },
  },
};
