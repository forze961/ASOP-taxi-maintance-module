/* eslint-disable prefer-const */

import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from "react";

import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
// component
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import {Tooltip} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },

  table: {
    minWidth: 300,
    '& .MuiTableCell-root': {
      borderRight: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  title: {
    fontSize: "14px",
  },
  bg: {
    backgroundColor: '#fafafa',
  },
}));



export default function Vehicle() {
  const classes = useStyles();
  const [loadingTable, setLoadingTable] = useState(false);
  const [previous, setPrevious] = React.useState({});
  const [carrier, setCarrier] = React.useState('');
  const [created, setCreated] = useState(false);


  const [rows, setRows] = useState([]);

  const getData = useCallback(async () => {
    if (carrier) {
      const { data } = await axios({
        method: 'get',
        url: `/api/auserspe1/${carrier}`,
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      });

      const formatted = data.reduce((acc, curr) => {
        const rollNumber = curr.name.split('/');
        acc.push({
          id: curr.id,
          name: rollNumber[0],
          rollNumber: rollNumber[1],
        });
        return acc;
      }, []);
      setRows(formatted);
    }
  }, [carrier]);

  useEffect(() => {
    getData().catch(console.error);
  }, [getData, carrier]);

  const onToggleEditMode = (id) => {
    setRows((state) => rows.map((row) => {
      if (row.id === id) {
        return { ...row, isEditMode: !row.isEditMode };
      }
      return row;
    }));
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const { value } = e.target;
    const { name } = e.target;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onChangeDate = (value, name, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: moment(value.ts ? value.ts : value).format('yyyy-MM-DD') };
      }
      return row;
    });
    setRows(newRows);
  };

  const onSave = async (row) => {
    const name = `${row.name}/${row.rollNumber}`
    if (created) {
      const fetchData = async () => {
        const data = await axios({
          method: 'post',
          url: '/api/auserspe',
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
          data: {
            name,
            age: row.description,
          },
        });
        return data;
      };
      const record = await fetchData().catch(console.error);
      if (record) {
        onToggleEditMode(row.id);
        setCreated(false);
        return await getData();
      }
    }

    const fetchData = async () => {
      await axios({
        method: 'put',
        url: '/api/auserspe',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        data: {
          name,
          age: row.description,
          id: row.id,
        },
      });
    };
    fetchData().catch(console.error);
    onToggleEditMode(row.id);
    setCreated(false);
  };


  const onDelete = async (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);

    await axios({
      method: 'delete',
      url: `/api/auserspe/${id}`,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });
    setPrevious((state) => {
      delete state[id];
      return state;
    });
  };


    // connect icons
    const tableIcons = {
      Add: forwardRef((props, ref) => (
        <button className={classes.buttonAdd} ref={ref} {...props}>
          <AddCircleOutlineIcon />
          Додати перевізника
        </button>
      )),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
      )),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    };

    // in this variables we can change columns in table

    const columns = [
      {
        title: "Державний номер",
        field: "stateNumber",
        align: "left",
        emptyValue: () => <em>null</em>,
        defaultSort: "asc",
      },
      // if yo want to disabled for sort and search same column
      // sorting: false, searchable: false
      {
        title: "Бортовий номер",
        field: "boardNumber",
        align: "left",
        emptyValue: () => <em>null</em>,
        sorting: false,
        searchable: false,
      },

    ];

  return (
    <Grid container spacing={3} className={classes.bg}>
      <Grid item xs={12}>

        <Paper className={classes.paper}>
        <h2>Рухомі одиниці</h2>
        <MaterialTable
            title=" "
            icons={tableIcons}
            // columns
            columns={columns}
            // in option wee add options for table like sorting ....
            options={{
              sorting: true,
              draggable: false,
              search: true,
              searchFieldAlignment: "left",
              pageSizeOptions: [5, 10],
              // mod pagination
              paginationType: "stepped",
              showFirstLastPageButtons: false,
              addRowPosition: "first",
              actionsColumnIndex: 0,
              rowStyle: (data, index) =>
                index % 2 === 0 ? { backgroundColor: "#F0F0F0" } : null,
              headerStyle: { backgroundColor: "#FFFBF4" },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
