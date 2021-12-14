/* eslint-disable prefer-const */
import { memo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  blockUser: {
    fontSize: '16px',
    lineHeight: '18px',
    color: '#144367',
    fontColor: '#144367',
    marginBottom: '24px',
  },
  nameUser: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '15px',
    textTransform: 'uppercase',
  },
  purple: {
    color: '#144367',
    backgroundColor: '#FEFEFE',
    width: theme.spacing(10),
    height: theme.spacing(10),
    alignSelf: 'center',
  },
}));

// Generate str for avatar preview
const getReduceStr = (str) => str?.substr(0, 2).toUpperCase();

function UserAvatar({
  user,
}) {
  const classes = useStyles();

  return (
    <>
      <Hidden smDown>
        <Box className={classes.blockUser} textAlign="center">
          <Toolbar style={{ justifyContent: 'center', display: 'flex' }}>
            <img src="/images/avatar.png" alt="allSuccess" height="50" width="50" />
          </Toolbar>
          Іванов Іван
        </Box>
      </Hidden>
    </>
  );
}

export default memo(UserAvatar);
