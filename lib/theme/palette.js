// @flow
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import blueGrey from '@material-ui/core/colors/blueGrey';

const white = '#FFFFFF';
const black = '#000000';

const palette = {
  black,
  white,
  success: {
    main: '#30BE71',
  },
  custom: {
    lightGrey: (blueGrey[300]: string),
    link: (blue[600]: string),
    linkHover: (blue[500]: string),
    facebook: '#4267B2',
    facebookHover: '#3b5998',
    google: '#FFFFFF',
    googleHover: '#F4F7F9',
    submit: (blue[600]: string),
    submitHover: (blue[500]: string),
    red: '#D23D59',
    activeBlue: (blue[600]: string),
    noneActiveGray: '#EEF4F8',
    documentBadge: '#FFB800',
    documentBadgeShadow: '#FFF623',
    grey: '#CADBE6',
    borderColor: '#EEEEEE',
  },
  primary: {
    contrastText: white,
    dark: (blue[900]: string),
    main: (blue[500]: string),
    light: (blue[300]: string),
  },
  secondary: pink,
  error: {
    contrastText: white,
    dark: (red[900]: string),
    main: (red[600]: string),
    light: (red[400]: string),
  },
  link: (blue[800]: string),
  filledIcon: '#455a64',
  icon: '#CED4DA',
  background: {
    default: '#ecf3f7',
    lightGrey: '#FBFCFD',
    paper: white,
  },
  divider: (grey[200]: string),
  outlineInput: '#A3D2FC',
  tabs: {
    border: '#F2F0F0',
  },
};

export default palette;
