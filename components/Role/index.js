import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
  },
}));




const Role = (props) => {
  const classes = useStyles();
  // JSX рендеринг
  return (
        <Paper className={classes.paper}>
          <h4>Ролі</h4>

        </Paper>
  );
};

export default Role;