import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CreateSchedule from './CreateSchedule';
import EditSchedule from './EditSchedule';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiGrid-root': {
      padding: '0px',
    },
    '& .MuiBox-root': {
      paddingLeft: '12px',
      paddingRight: '12px',
      // backgroundColor: '#fafafa',
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

export function Schedule() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs variant="fullWidth" value={value} onChange={handleChange} indicatorColor='primary' textColor="inherit" aria-label="wrapped label tabs example">
          <Tab
            value="one"
            label="Корегувати розклад"
            wrapped
            {...a11yProps('one')}
          />
          <Tab  value="two" label="Створити розклад" {...a11yProps('two')} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <EditSchedule />
      </TabPanel>
      <TabPanel value={value} index="two">
        <CreateSchedule />
      </TabPanel>
    </div>
  );
}
