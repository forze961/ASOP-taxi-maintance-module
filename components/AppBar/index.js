// @flow
// eslint-disable-next-line import/no-unresolved
/*= ======================================
Design components
======================================== */
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useWindowSize from '../screenSizeHelper';

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: 'primary',
    fontColor: 'primary',
    flexGrow: 1,
    paddingLeft: 17,
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
    flexGrow: 1,
    zIndex: 1300,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    background: 'transparent',
    boxShadow: 'none',
    flexGrow: 1,
    marginLeft: drawerWidth,
    zIndex: 1300,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logout: {
    lineHeight: '72px',
    verticalAlign: 'middle',
    justifyContent: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  customBadge: {
    backgroundColor: '#FAF34C',
    color: 'white',
  },
}));



export default function AppBarLayout({
  onOpenMenu, signIn = false, noLogo = false, openMenu,
}): React$Node {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const sizeClient = useWindowSize();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const classes = useStyles();

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openMenu,
        })}
      >
        <Toolbar>
          {!noLogo && (
          <>
            <IconButton
              color="#44367"
              aria-label="open drawer"
              edge="start"
              onClick={onOpenMenu}
            >
              {!signIn && (
              <MenuIcon />
              )}
            </IconButton>
            <div className={classes.title}>
              {sizeClient.width > 980 && (
                <img src="/images/logoMain.png" style={{ paddingTop: '8px' }} alt="allSuccess" />
              )}
              {sizeClient.width < 980 && sizeClient.width > 600 && (
                <img src="/images/logoMain.png" style={{ paddingTop: '6px', maxHeight: 25 }} alt="allSuccess" />
              )}
            </div>
          </>
          )}
          {!signIn && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <img src="/images/avatar.png" alt="allSuccess" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={async (e) => {
                  router.push('/');
                }}
              >
                Вийти
              </MenuItem>
            </Menu>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
