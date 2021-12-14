import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
    flexGrow: 1,
  },
  button: {
    backgroundColor: '#144367',
    height: '44px',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  formControl: {
    minWidth: 120,
  },
}));

export default function SearchAppBar({ selectedDateNow, handleDateChangeNow, btnTitle }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar style={{ padding: 0 }}>
          <FormControl className={classes.title}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              id="date-picker-inline"
              label="Оберіть дату"
              value={selectedDateNow}
              onChange={handleDateChangeNow}
              autoOk
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </FormControl>
          <div className={classes.search}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddCircleOutlineIcon />}
            >
              {btnTitle}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
