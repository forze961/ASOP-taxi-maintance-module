// @flow strict
// eslint-disable-next-line import/no-unresolved
import { PureComponent } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import type { Theme } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import clsx from 'clsx';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 340;

const styles = (theme: Theme) => ({
  container: {
    width: 330,
  },
  list: {
    [theme.breakpoints.up('xs')]: {
      '& .MuiListItem-root': {
        borderBottom: '1px solid #eef4f8',
      },
    },
  },
  menuLink: {
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: '16px',
    textDecoration: 'none',
    color: '#ED9137',
    fontColor: '#FEFEFE',
  },
  nestedSmall: {
    padding: '1px 16px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#FEFEFE',
  },
  drawerContainer: {
    overflow: 'none',
    backgroundColor: '#FEFEFE',
  },
});

const itemsMenu = [
  { name: 'Розклад', url: '/schedule', img: 'schedule.png' },
  { name: 'Електронні наряди', url: '/schedule', img: 'orders.png' },
  { name: 'Формуляри', url: '/schedule', img: 'form.png' },
  { name: 'Звіти', url: '/schedule', img: 'rep.png' },
  { name: 'Працівники', url: '/schedule', img: 'workers.png' },
  { name: 'Маршрути та тарифи', url: '/schedule', img: 'routes.png' }];

type Props = {|
  +image: string,
  +title: string,
  +classes: { [key: $Keys<$Call<typeof styles, Theme>>]: string },
  +open: boolean,
  +close: () => void,
  +userName: string,
|};

type State = {|
  +reservationsOpen: boolean,
  +customerOpen: boolean,
  +vehiclesOpen: boolean,
|};

class SideMenu extends PureComponent<Props, State> {
  menuContent = () => {
    const {
      classes,
      open,
    } = this.props;

    return (
      <Drawer
        variant="permanent"
        BackdropProps={{ invisible: true }}
        anchor="left"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >

        <div className={classes.toolbar} />

        <div className={classes.drawerContainer}>

          <Box className={classes.container}>
            <List>
              {itemsMenu.map((item, index) => (
                <ListItem button key={item.name} style={{ paddingLeft: '25px' }}>
                  <ListItemIcon>
                    {index === 1 ? (
                      <img src={`/images/menu/${item.img}`} alt={index} style={{ paddingLeft: '2px' }} />
                    ) : (
                      <img src={`/images/menu/${item.img}`} alt={index} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      </Drawer>
    );
  };

  render() {
    const { open, classes } = this.props;

    return (
      <Box className={classes.container} data-cy="menu">
        <Drawer
          variant="permanent"
          open
        >
          {this.menuContent()}
        </Drawer>
      </Box>
    );
  }
}

const SideMenuWithStyles = withStyles(styles)(SideMenu);

export default SideMenuWithStyles;
