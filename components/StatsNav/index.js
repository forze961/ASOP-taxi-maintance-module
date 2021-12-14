import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import AllFilies from '../AllFilies';
import Schedule from '../Schedule';
import Tariffs from '../Tariffs';
import ServiceOnIframe from '../ServiceOnIframe';
import useWindowSize from '../screenSizeHelper';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const getCurrPage = (id) => {
  switch (id) {
    case 0: {
      return <Schedule />;
    }

    case 4: {
      return <Tariffs />;
    }

    default: <Schedule />;
  }
};

export default function NavTabs({ menuFilter }) {
  const classes = useStyles();
  // For horizontal menu get choise tab index

  const choisedValue = Number(menuFilter) || 0;

  const [value, setValue] = useState(choisedValue);

  // deps by level and value index
  useEffect(() => {
    setValue(choisedValue);
  }, [choisedValue]);

  return (
    <div className={classes.root}>
      {getCurrPage(choisedValue)}
    </div>
  );
}
