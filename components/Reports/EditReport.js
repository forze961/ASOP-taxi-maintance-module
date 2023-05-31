import {Tooltip} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import EditIcon from '@material-ui/icons/EditOutlined';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import {KeyboardDatePicker} from '@material-ui/pickers';
import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import useUser from '../../lib/useUser';
import ControlledOpenSelect from '../Select/select';
import TableHeaderBar from '../TableHeaderBar';

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
    backgroundColor: '#fafafa'
  },
}));

const createData = (obj) => ({
  id: Math.floor(Math.random() * 1000),
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
            name.includes('datelocal') ? (
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

export default function EditRouteFlights() {
  const classes = useStyles();

  const { user } = useUser();
  const DateNow = new Date();
  let DateBefore = new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);
  const [selectedDateNow, setSelectedDateNow] = useState(DateNow);
  const [loadingTable, setLoadingTable] = useState(false);
  const [previous, setPrevious] = React.useState({});
  const [created, setCreated] = useState(false);
  const [rows, setRows] = useState([]);
  const [drivers, setDrivers] = useState('');


  useEffect(() => {
    if (user) {
      const getCarrier = user?.login?.filialParsed;

      if (getCarrier && !drivers) setDrivers(getCarrier);
    }
  }, [user]);

  const getData = useCallback(async () => {
    if (drivers) {
      const {data} = await axios({
        method: 'get',
        url: `/api/ausersDuIRB1/${drivers}`,
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
      });

      const formatted = data.reduce((acc, curr) => {
        const splitted = curr.age.split(',');
        const stopA = curr.timea.split(',');
        const stopB = curr.timeb.split(',');

        acc.push({
          id: curr.id,
          timedate: curr.datebe,
          coundpt: curr.coundpt,
          driver: curr.driver,
          filial: curr.filial,
          price: curr.price,
          dutystate: curr.dutystate,
          vehicle: curr.pe,
          name: curr.name ? curr.name : '',
          serviceId: splitted[0] ? splitted[0] : '',
          tripId: splitted[1] ? splitted[1] : '',
          tripHead: splitted[2] ? splitted[2] : '',
          directionId: splitted[3] ? splitted[3] : '',
          tripIdA: stopA[0] ? stopA[0] : '',
          arrivalTimeA: stopA[1] ? stopA[1] : '',
          departureTimeA: stopA[2] ? stopA[2] : '',
          stopIdA: stopA[3] ? stopA[3] : '',
          stopSeqA: stopA[4] ? stopA[4] : '',
          stopHeadA: stopA[5] ? stopA[5] : '',
          pickUpA: stopA[6] ? stopA[6] : '',
          dropOffA: stopA[7] ? stopA[7] : '',
          tripIdB: stopB[0] ? stopB[0] : '',
          arrivalTimeB: stopB[1] ? stopB[1] : '',
          departureTimeB: stopB[2] ? stopB[2] : '',
          stopIdB: stopB[3] ? stopB[3] : '',
          stopSeqB: stopB[4] ? stopB[4] : '',
          stopHeadB: stopB[5] ? stopB[5] : '',
          pickUpB: stopB[6] ? stopB[6] : '',
          dropOffB: stopB[7] ? stopB[7] : '',
        })
        return acc;
      }, [])

      setRows(formatted);
    }
  }, [drivers])

  useEffect(() => {
    getData().catch(console.error);
  }, [getData])

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
    const age = `${row.serviceId},${row.tripId},${row.tripHead},${row.directionId}`;
    const time = `${row.tripIdA},${row.arrivalTimeA},${row.departureTimeA},${row.stopIdA},${row.stopSeqA},${row.stopHeadA},${row.pickUpA},${row.dropOffA}`,
      timeB = `${row.tripIdB},${row.arrivalTimeB},${row.departureTimeB},${row.stopIdB},${row.stopSeqB},${row.stopHeadB},${row.pickUpB},${row.dropOffB}`;
    if (created) {
      const fetchData = async () => {
        const data = await axios({
          method: 'post',
          url: `/api/ausersDu1IRBS`,
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
          },
          data: {
            age,
            time,
            timeB,
            datebe: row.timedate,
            coundpt: row.coundpt,
            driver: row.driver,
            filial: row.filial,
            price: row.price,
            dutystate: row.dutystate,
            pe: row.vehicle,
            name: row.name,
          }
        });
        return data;
      }
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
        url: `/api/ausersDuIRB`,
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
        data: {
          age,
          time,
          timeB,
          id: row.id,
          datebe: row.timedate,
          coundpt: row.coundpt,
          driver: row.driver,
          filial: row.filial,
          price: row.price,
          dutystate: row.dutystate,
          pe: row.vehicle,
          name: row.name,
        }
      });
    }
    fetchData().catch(console.error);
    onToggleEditMode(row.id);
    setCreated(false);
  }

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
      url: `/api/ausersDu1IRBS/${id}`,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
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
            titleNoDatepicker="Формуляри"
            btnTitle="Створити формуляр"
            btnOnClick={() => {
              setCreated(true);
              setRows([createData({
                name: '',
                timedate: '',
                coundpt: '',
                driver: '',
                filial: '',
                price: '',
                dutystate: '',
                vehicle: '',
                serviceId: '',
                tripId: '',
                tripHead: '',
                directionId: '',
                tripIdA: '',
                arrivalTimeA: '',
                departureTimeA: '',
                stopIdA: '',
                stopSeqA: '',
                stopHeadA: '',
                pickUpA: '',
                dropOffA: '',
                tripIdB: '',
                arrivalTimeB: '',
                departureTimeB: '',
                stopIdB: '',
                stopSeqB: '',
                stopHeadB: '',
                pickUpB: '',
                dropOffB: '',
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
                        <TableCell className={classes.tableHeaderFirst} colSpan={12} align="center"></TableCell>
                        <TableCell className={classes.tableHeaderFirst} colSpan={8} align="center">Час на зупинці А</TableCell>
                        <TableCell className={classes.tableHeaderFirst} colSpan={8} align="center">Час на зупинці Б</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableHeaderFirst} align="center">Ред.</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Маршрут</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Тип дня</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Перевізник</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Рухома одиниця</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Водій</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Випуск</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Термін роботи</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Календар</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Ідентифікатор маршруту</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Назва маршруту</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Ідентифікатор напрямку</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Ідентифікатор маршруту</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Час прибуття</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Час відправлення</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Ідентифікатор зупинки</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Послідовність зупинок</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Знак зупинки</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Тип завантаження</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Тип вигрузки</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Ідентифікатор маршруту</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Час прибуття</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Час відправлення</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Ідентифікатор зупинки</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Послідовність зупинок</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Знак зупинки</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Тип посадки</TableCell>
                        <TableCell className={classes.tableHeaderFirst} align="center">Тип висадки</TableCell>
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
                          <CustomTableCell {...{ row, name: 'dutystate', onChange }} />
                          <CustomTableCell {...{ row, name: 'filial', onChange }} />
                          <CustomTableCell {...{ row, name: 'vehicle', onChange }} />
                          <CustomTableCell {...{ row, name: 'driver', onChange }} />
                          <CustomTableCell {...{ row, name: 'coundpt', onChange }} />
                          <CustomTableCell {...{ row, name: 'timedate', onChange }} />
                          <CustomTableCell {...{ row, name: 'serviceId', onChange }} />
                          <CustomTableCell {...{ row, name: 'tripId', onChange }} />
                          <CustomTableCell {...{ row, name: 'tripHead', onChange }} />
                          <CustomTableCell {...{ row, name: 'directionId', onChange }} />
                          <CustomTableCell {...{ row, name: 'tripIdA', onChange }} />
                          <CustomTableCell {...{ row, name: 'arrivalTimeA', onChange }} />
                          <CustomTableCell {...{ row, name: 'departureTimeA', onChange }} />
                          <CustomTableCell {...{ row, name: 'stopIdA', onChange }} />
                          <CustomTableCell {...{ row, name: 'stopSeqA', onChange }} />
                          <CustomTableCell {...{ row, name: 'stopHeadA', onChange }} />
                          <CustomTableCell {...{ row, name: 'pickUpA', onChange }} />
                          <CustomTableCell {...{ row, name: 'dropOffA', onChange }} />
                          <CustomTableCell {...{ row, name: 'tripIdB', onChange }} />
                          <CustomTableCell {...{ row, name: 'arrivalTimeB', onChange }} />
                          <CustomTableCell {...{ row, name: 'departureTimeB', onChange }} />
                          <CustomTableCell {...{ row, name: 'stopIdB', onChange }} />
                          <CustomTableCell {...{ row, name: 'stopSeqB', onChange }} />
                          <CustomTableCell {...{ row, name: 'stopHeadB', onChange }} />
                          <CustomTableCell {...{ row, name: 'pickUpB', onChange }} />
                          <CustomTableCell {...{ row, name: 'dropOffB', onChange }} />
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
