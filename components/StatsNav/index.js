import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import Schedule from '../Schedule';
import Tariffs from '../Tariffs';
import Reports from '../Reports';
import ServiceOnIframe from '../ServiceOnIframe';
import useWindowSize from '../screenSizeHelper';

const urls = [
  '',
  '',
  '/planOrders/',
  '/orders/',
  '/drivers/',
  '/vehicles/',
];

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

const getCurrPage = (id, sizeClient, menuOpen) => {
  const router = useRouter();

  const handleChange = (id) => {
    router.push(`/main/${Number(id)}`, undefined);
  };

  switch (id) {
    case 1: {
      return <Schedule />;
    }

    case 2: case 3: {
      return (
        <>
          <Grid container>
            <FormControlLabel
              control={<Checkbox checked={id === 2} onChange={() => handleChange(2)} inputProps={{ 'aria-label': 'primary checkbox' }} color="primary" />}
              label="Добові наряди"
            />
            <Box m={1} />
            <FormControlLabel
              control={<Checkbox checked={id === 3} onChange={() => handleChange(3)} inputProps={{ 'aria-label': 'primary checkbox' }} color="primary" />}
              label="Формуляри"
            />
          </Grid>
          <ServiceOnIframe
            menuOpen={menuOpen}
            url={urls[id]}
            sizeClient={sizeClient}
            id={id}
          />
        </>
      );
    }

    case 4: case 5: {
      return <ServiceOnIframe menuOpen={menuOpen} url={urls[id]} sizeClient={sizeClient} id={id} />;
    }

    case 6: {
      return <Tariffs />;
    }

    case 7: {
      return <Reports />;
    }

    default: <Schedule />;
  }
};

export default function NavTabs({ menuFilter, menuOpen }) {
  const classes = useStyles();
  const sizeClient = useWindowSize();
  // For horizontal menu get choise tab index

  const choisedValue = Number(menuFilter) || 1;

  const [value, setValue] = useState(choisedValue);

  // deps by level and value index
  useEffect(() => {
    setValue(choisedValue);
  }, [choisedValue]);

  return (
    <div className={classes.root}>
      {getCurrPage(choisedValue, sizeClient, menuOpen)}
    </div>
  );
}
