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
import Tooltip from '@material-ui/core/Tooltip';

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
  {
    id: 1, name: 'Розклад', url: '/schedule', img: 'clip.svg',
  },
  {
    id: 2, name: 'Перевізники', url: '/schedule', img: 'carriers.svg',
  },
  {
    id: 3, name: 'Рухомі одиниці', url: '/schedule', img: 'desktop.svg',
  },
  {
    id: 4, name: 'Водії', url: '/schedule', img: 'users.svg',
  },
  {
    id: 7, name: 'Формуляри', url: '/schedule', img: 'formular.svg',
  },
  {
    id: 5, name: 'Маршрути', url: '/schedule', img: 'tarify.svg',
  },
  {
    id: 6, name: 'Звіти', url: '/schedule', img: 'documentText.svg',
  },
  {
    id: 8, name: 'Зупинки', url: '/schedule', img: 'locationMarker.svg',
  },
  {
    id: 9, name: 'Тижневий календар', url: '/schedule', img: 'calendar.svg',
  },
  {
    id: 10, name: 'Способи оплати проїзду', url: '/schedule', img: 'payments.svg',
  },
  {
    id: 11, name: 'Вартість проїзду', url: '/schedule', img: 'price.svg',
  },
  {
    id: 12, name: 'Рейси маршрутів', url: '/schedule', img: 'tablerRoute.svg',
  },
];

type Props = {|
  +image: string,
  +title: string,
  +classes: { [key: $Keys<$Call<typeof styles, Theme>>]: string },
  +open: boolean,
  +close: () => void,
  +onChoice: () => void,
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
      onChoice,
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
              {itemsMenu.map((item) => (

                <ListItem button key={item.name} style={{ paddingLeft: '25px' }} onClick={() => onChoice(item.id)}>
                  <Tooltip title={item.name} aria-label="add">
                    <ListItemIcon>
                      {item.id === 2 ? (
                        <img src={`/images/menu/${item.img}`} alt={item.id} />
                      ) : (
                        <img src={`/images/menu/${item.img}`} alt={item.id} />
                      )}
                    </ListItemIcon>
                  </Tooltip>
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
