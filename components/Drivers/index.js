/* eslint-disable prefer-const */
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
// Icons
import EditIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Input from '@material-ui/core/Input';
import clsx from 'clsx';
import { KeyboardDatePicker } from '@material-ui/pickers';
import ControlledOpenSelect from '../Select/select';
import TableHeaderBar from '../TableHeaderBar';
import useUser from '../../lib/useUser';

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },

  formControl: {
    minWidth: 120,
  },
  smallTableCell: {
    maxWidth: '30px',
  },
  tableHeaderFirst: {
    backgroundColor: '#FFFBF4',
  },
  tableHeaderSecond: {
    backgroundColor: '#FFFBF4',
  },
  selectTableCell: {
    width: 140,
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
  },
  selectTableCellEdit: {
    width: 140,
    borderLeft: '5px solid #ED9137',
  },
  bg: {
    backgroundColor: '#fafafa',
  },
}));

const createData = (obj) => ({
  id: Math.floor(Math.random() * 10000),
  ...obj,
  isEditMode: true,
});

const getCellSplit = (row, name) => {
  if (row[name] && typeof row[name] === 'string' && row[name].includes('/')) {
    const splited = row[name].split('/');

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

const CustomTableCell = ({
  row, name, onChange, onChangeDate,
}) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="center" className={classes.tableCell}>
      {
        isEditMode ? (
            name.includes('date') ? (
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                id="date-picker-inline"
                label="Оберіть дату"
                value={row[name]}
                onChange={(value) => onChangeDate(value, name, row)}
                autoOk
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            ) : (
              <Input
                value={row[name]}
                name={name}
                onChange={(e) => onChange(e, row)}
                className={classes.input}
              />
            )
          )
          : (getCellSplit(row, name))
      }
    </TableCell>
  );
};

export default function Drivers() {
  const classes = useStyles();

  const { user } = useUser();
  const DateNow = new Date();
  let DateBefore = new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);
  const [selectedDateNow, setSelectedDateNow] = useState(DateNow);
  const [loadingTable, setLoadingTable] = useState(false);
  const [previous, setPrevious] = React.useState({});
  const [drivers, setDrivers] = useState('');
  const [created, setCreated] = useState(false);

  const [rows, setRows] = useState([]);

  const onToggleEditMode = (id) => {
    setRows((state) => rows.map((row) => {
      if (row.id === id) {
        return { ...row, isEditMode: !row.isEditMode };
      }
      return row;
    }));
  };

  useEffect(() => {
    if (user) {
      const getCarrier = user?.login?.filialParsed;

      if (getCarrier && !drivers) setDrivers(getCarrier);
    }
  }, [user]);

  const getData = useCallback(async () => {
    if (drivers) {
      const { data } = await axios({
        method: 'get',
        url: `/api/ausersdr1/${drivers}`,
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      });

      const formatted = data.reduce((acc, curr) => {
        acc.push({
          id: curr.id,
          name: curr.name,
          description: curr.age,
        });
        return acc;
      }, []);
      setRows(formatted);
    }
  }, [drivers]);

  useEffect(() => {
    getData().catch(console.error);
  }, [getData, drivers]);

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
    if (created) {
      const fetchData = async () => {
        const data = await axios({
          method: 'post',
          url: '/api/ausersdr',
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
          data: {
            age: row.description,
            name: row.name,
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
        url: '/api/ausersdr',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        data: {
          age: row.description,
          id: row.id,
          name: row.name,
        },
      });
    };
    fetchData().catch(console.error);
    onToggleEditMode(row.id);
    setCreated(false);
  };

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const onDelete = async (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
    await axios({
      method: 'delete',
      url: `/api/ausersdr/${id}`,
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

  return (
    <Grid container spacing={3} className={classes.bg}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ControlledOpenSelect carrier={drivers} setCarrier={setDrivers} />
          <TableHeaderBar
            selectedDateNow={selectedDateNow}
            handleDateChangeNow={(() => {})}
            disableDatepicker
            titleNoDatepicker="Водії"
            btnTitle="Додати водія"
            btnOnClick={() => {
              setCreated(true);
              setRows([createData({
                name: '',
                description: '',
              }), ...rows]);
            }}
          />

          <Box pt={2}>
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
                        <TableCell className={classes.tableHeaderFirst} align="center">Опис</TableCell>
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
                                <IconButton
                                  aria-label="done"
                                  onClick={() => onSave(row)}
                                >
                                  <DoneIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="revert"
                                  onClick={() => onRevert(row.id)}
                                >
                                  <RevertIcon />
                                </IconButton>
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
                          <CustomTableCell {...{
                            row, name: 'description', onChange,
                          }}
                          />
                        </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
