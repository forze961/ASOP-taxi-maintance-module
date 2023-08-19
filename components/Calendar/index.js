/* eslint-disable prefer-const */
import { Tooltip } from "@material-ui/core";

import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
// component
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
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
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 300,
    "& .MuiTableCell-root": {
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
  },
  bg: {
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: "14px",
  },
}));

const createData = (obj) => ({
  id: Math.floor(Math.random() * 1000),
  ...obj,
  isEditMode: true,
});

const getCellSplit = (row, name) => {
  if (row[name] && typeof row[name] === "string" && row[name].includes("/")) {
    const splited = row[name].split("/");

    return (
      <>
        {splited[0]}
        <Box pt={1} />
        {splited[1]}
      </>
    );
  }

  return row[name];
};

export default function Callendar() {
  const classes = useStyles();

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

  const columns = [
    {
      title: "Ред.",
      field: "red",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    {
      title: "Назва",
      field: "name",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    // if yo want to disabled for sort and search same column
    // sorting: false, searchable: false
    {
      title: "Понеділок",
      field: "mondey",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: false,
      searchable: false,
    },
    {
      title: "Вівторок",
      field: "Thuesday",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: false,
      searchable: false,
    },
    {
      title: "Середа",
      field: "Wednesday",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: false,
      searchable: false,
    },
    {
      title: "Четвер",
      field: "Thursday",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: false,
      searchable: false,
    },
    {
      title: "П'ятниця",
      field: "Friday",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: false,
      searchable: false,
    },
    {
      title: "Cубота",
      field: "Saturday",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: false,
      searchable: false,
    },
    {
      title: "Неділя",
      field: "Sunday",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: false,
      searchable: false,
    },
  ];

  const DateNow = new Date();
  let DateBefore = new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);

  const [rows, setRows] = useState([]);

  // const onToggleEditMode = (id) => {
  //   setRows((state) => rows.map((row) => {
  //     if (row.id === id) {
  //       return { ...row, isEditMode: !row.isEditMode };
  //     }
  //     return row;
  //   }));
  // };

  // const onChange = (e, row) => {
  //   if (!previous[row.id]) {
  //     setPrevious((state) => ({ ...state, [row.id]: row }));
  //   }
  //   const { value } = e.target;
  //   const { name } = e.target;
  //   const { id } = row;
  //   const newRows = rows.map((row) => {
  //     if (row.id === id) {
  //       return { ...row, [name]: value };
  //     }
  //     return row;
  //   });
  //   setRows(newRows);
  // };

  // const onChangeDate = (value, name, row) => {
  //   if (!previous[row.id]) {
  //     setPrevious((state) => ({ ...state, [row.id]: row }));
  //   }
  //   const { id } = row;
  //   const newRows = rows.map((row) => {
  //     if (row.id === id) {
  //       return { ...row, [name]: moment(value.ts ? value.ts : value).format('yyyy-MM-DD') };
  //     }
  //     return row;
  //   });
  //   setRows(newRows);
  // };

  // const onSave = async (row) => {
  //   const age = `,${row.mon},${row.tues},${row.wedn},${row.thurs},${row.friday},${row.sat},${row.sun}`;
  //   const time = `,${row.startDate}`,
  //         timeB = `,${row.endDate}`;

  //   if (created) {
  //     const fetchData = async () => {
  //       const data = await axios({
  //         method: 'post',
  //         url: `/api/ausersIRW`,
  //         headers: {
  //           'Content-type': 'application/json',
  //           'Access-Control-Allow-Origin': '*',
  //           'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  //         },
  //         data: {
  //           age,
  //           time,
  //           timeB,
  //           name: row.name,
  //         }
  //       });
  //       return data;
  //     }
  //     const record = await fetchData().catch(console.error);
  //       onToggleEditMode(row.id);
  //       setCreated(false);
  //       return await getData();
  //   }

  //   const fetchData = async () => {
  //     await axios({
  //       method: 'put',
  //       url: `/api/ausersIRW`,
  //       headers: {
  //         'Content-type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  //       },
  //       data: {
  //         age,
  //         time,
  //         timeB,
  //         id: row.id,
  //         name: row.name,
  //       }
  //     });
  //   }
  //   fetchData().catch(console.error);
  //   onToggleEditMode(row.id);
  //   setCreated(false);
  // }

  // const onRevert = (id) => {
  //   const newRows = rows.map((row) => {
  //     if (row.id === id) {
  //       return previous[id] ? previous[id] : row;
  //     }
  //     return row;
  //   });
  //   setRows(newRows);
  //   setPrevious((state) => {
  //     delete state[id];
  //     return state;
  //   });
  //   onToggleEditMode(id);
  // };

  // const onDelete = async (id) => {
  //   const newRows = rows.filter((row) => row.id !== id);
  //   setRows(newRows);
  //   await axios({
  //     method: 'delete',
  //     url: `/api/ausersIRW/${id}`,
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  //     },
  //   });

  //   setPrevious((state) => {
  //     delete state[id];
  //     return state;
  //   });
  // };

  return (
    <Grid container spacing={3} className={classes.bg}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h1 className={classes.title}>Календар</h1>
          {/* <Box pt={2}>
            {loadingTable ? (
              <div style={{
                display: 'flex', justifyContent: 'center',
              }}
              >
                <CircularProgress style={{ color: '#1e88e5' }} />
              </div>
            ) : (
              <>
                <TableContainer style={{ overflowX: 0 }}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeaderFirst} align="center">Ред.</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Назва</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Понеділок</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Вівторок</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Середа</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Четвер</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Пятниця</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Субота</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Неділя</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Дата початку</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Дата кінця</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={row.id} style={{ backgroundColor: index % 2 !== 0 ? '#fafafa' : '#FFFFFF' }}>
                          <TableCell
                            className={clsx(classes.selectTableCell, {
                              [classes.selectTableCellEdit]: row.isEditMode,
                              [classes.selectTableCell]: !row.isEditMode,
                            })}
                            align="center"
                          >
                            {row.isEditMode ? (
                              <>
                                <Tooltip title="Зберегти">
                                  <IconButton
                                    aria-label="done"
                                    onClick={() => onSave(row)}
                                  >
                                    <DoneIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Відмінити">
                                  <IconButton
                                    aria-label="revert"
                                    onClick={() => onRevert(row.id)}
                                  >
                                    <RevertIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              <>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => onToggleEditMode(row.id)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="revert"
                                  onClick={() => onDelete(row.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            )}
                          </TableCell>
                          <CustomTableCell clas {...{ row, name: 'name', onChange }} />
                          <CustomTableCell {...{ row, name: 'mon', onChange }} />
                          <CustomTableCell {...{ row, name: 'tues', onChange,}}/>
                          <CustomTableCell {...{ row, name: 'wedn', onChange,}}/>
                          <CustomTableCell {...{ row, name: 'thurs', onChange,}}/>
                          <CustomTableCell {...{ row, name: 'friday', onChange,}}/>
                          <CustomTableCell {...{ row, name: 'sat', onChange }}/>
                          <CustomTableCell {...{ row, name: 'sun', onChange }}/>
                          <CustomTableCell {...{ row, name: 'startDate', onChange }}/>
                          <CustomTableCell {...{ row, name: 'endDate', onChange }}/>
                        </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box> */}
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
              actionsColumnIndex: -1,
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
