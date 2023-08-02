import React, { useState, useEffect } from "react";
// component
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import { lightBlue } from "@mui/material/colors";
import Checkbox from "@material-ui/core/Checkbox";
// Icons
// https://v4.mui.com/components/material-icons/#api
import AddBox from "@material-ui/icons/AddBox";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
// --- for rendering icon and rendering styles
import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { lightBlue300 } from "material-ui/styles/colors";

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
          <MaterialTable />
        </Paper>
  );
};

export default Role;