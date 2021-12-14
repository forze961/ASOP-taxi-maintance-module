import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import Content from '../../components/Dashboard/Content';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  drawerHeader: {
    display: 'flex',

    alignItems: 'center',

    padding: theme.spacing(0, 1),

    // necessary for content to be below app bar

    ...theme.mixins.toolbar,

    justifyContent: 'flex-end',
  },
}));

export default function App() {
  return (
    <Content />
  );
}
