import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import {AccoutrementWrapped} from '../Accoutrement';
import Callendar from '../Callendar';
import Carriers from '../Carriers';
import Drivers from '../Drivers';
import Fare from '../Fare';
import PaymentWays from '../PaymentWays';
import RouteFlights from '../RouteFlights';
import Routes from '../Routes';
import {Schedule} from '../Schedule';
import Stops from '../Stops';
import Tariffs from '../Tariffs';
import {ReportsWrapped} from '../Reports';
import ServiceOnIframe from '../ServiceOnIframe';
import useWindowSize from '../screenSizeHelper';
import Vehicle from '../Vehicle';

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

    case 2: {
      return <Carriers />;
      // return <Schedule />;
    }

    case 3: {
      return <Vehicle />
    }

    case 4: {
      return <Drivers />
    }

    case 5: {
      return <Routes />;
    }

    case 6: {
      return <Tariffs />;
    }

    case 7: {
      return <ReportsWrapped />;
    }

    case 8: {
      return <Stops />;
    }

    case 9: {
      return <Callendar />;
    }

    case 10: {
      return <PaymentWays />;
    }

    case 11: {
      return <Fare />;
    }

    case 12: {
      return <RouteFlights />;
    }
    case 13: {
      return <AccoutrementWrapped />;
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
