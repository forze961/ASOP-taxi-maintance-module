/* eslint-disable prefer-const */
// Main UI-module for comparing ASOP statistics data at the enterprise level
import { useState, useEffect } from 'react';
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
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

// Add style to existing material theme
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 300,
    '& .MuiTableCell-root': {
      borderLeft: '1px solid rgba(224, 224, 224, 1)',
      maxWidth: 100,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  cellWithImg: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}));

// Generate times for selects components
const genTimesArr = () => new Array(24).fill().map((_, x) => moment({ hour: x }).format('HH:mm'));

// Main compare (today - yesterday)
export default function CompareTables() {
  const classes = useStyles();

  const DateNow = new Date();
  let DateBefore = new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);

  const [dataNow, setDataNow] = useState({});
  const [dataBefore, setDataBefore] = useState({});

  const [selectedDateNow, setSelectedDateNow] = useState(DateNow);
  const [selectedDateBefore, setSelectedDateBefore] = useState(DateBefore);

  const [timeNow, setTimeNow] = useState(`${moment().format('HH')}:00`);
  const [timeBefore, setTimeBefore] = useState(`${moment().format('HH')}:00`);

  const [loadingTable, setLoadingTable] = useState(true);
  const [loadingTableTwo, setLoadingTableTwo] = useState(true);

  useEffect(() => {
    setLoadingTable(true);

    const dateTo = moment(`${moment(selectedDateNow.ts ? selectedDateNow.ts : selectedDateNow)
      .format('YYYY-MM-DD')} ${timeNow}:00`)
      .add(59, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss');

    axios.post('/api/getAsopStats', {
      // eslint-disable-next-line react/prop-types
      filter: [`${moment(selectedDateNow.ts ? selectedDateNow.ts : selectedDateNow).format('YYYY-MM-DD')} ${timeNow}:00`, dateTo],
      type: 'all',
    }).then((response) => {
      setDataNow(response.data);
      setLoadingTable(false);
    }).catch((e) => { setLoadingTable(false); });
  }, [selectedDateNow, timeNow]);

  useEffect(() => {
    setLoadingTableTwo(true);

    const dateTo = moment(`${moment(selectedDateBefore.ts ? selectedDateBefore.ts : selectedDateBefore)
      .format('YYYY-MM-DD')} ${timeBefore}:00`)
      .add(59, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss');

    axios.post('/api/getAsopStats', {
      // eslint-disable-next-line react/prop-types
      filter: [`${moment(selectedDateBefore.ts ? selectedDateBefore.ts : selectedDateBefore).format('YYYY-MM-DD')} ${timeBefore}:00`, dateTo],
      type: 'all',
    }).then((response) => {
      setDataBefore(response.data);
      setLoadingTableTwo(false);
    }).catch((e) => { setLoadingTableTwo(false); });
  }, [selectedDateBefore, timeBefore]);

  const handleChangeNow = (event) => {
    setTimeNow(event.target.value);
  };

  const handleChangeBefore = (event) => {
    setTimeBefore(event.target.value);
  };

  const handleDateChangeNow = (date) => {
    setSelectedDateNow(date);
  };

  const handleDateChangeBefore = (date) => {
    setSelectedDateBefore(date);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <h1 style={{ color: '#2371E5' }}>
            Оперативна статистика активності обладнання АСОП
          </h1>
          <h4 style={{ color: '#2371E5' }}>
            * Оновлення даних кожні 10 хвилин
          </h4>
        </Grid>
      </Grid>
      <Box pt={2}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Divider />
            <Paper className={classes.paper}>
              <Box>
                <h1>{`Станом на: ${moment(selectedDateNow.ts ? selectedDateNow.ts : selectedDateNow).format('yyyy-MM-DD')} (${timeNow})`}</h1>
              </Box>

              <FormControl className={classes.formControl}>
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
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Оберіть час</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={timeNow}
                  onChange={handleChangeNow}
                >
                  {genTimesArr().map((x) => (
                    <MenuItem key={`${x}`} value={x}>{`${x}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                    {dataNow.allOk && dataNow.someError && dataNow.closed && dataNow.noConnectEquip ? (

                      <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                          <TableBody>
                            <TableRow key="1" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <h3>Всього рухомих одиниць по наряду:</h3>
                              </TableCell>
                              <TableCell align="center"><h2>{(dataNow.allOk + dataNow.someError + dataNow.closed + dataNow.noConnectEquip) || 0}</h2></TableCell>
                            </TableRow>
                            <TableRow key="2" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <div className={classes.cellWithImg}>
                                  <img src="/images/asop-success.png" alt="allSuccess" />
                                  <Box m={1} />
                                  <h3>АСОП активовано:</h3>
                                </div>
                              </TableCell>
                              <TableCell align="center"><h2 style={{ color: '#55C013' }}>{dataNow.allOk || 0}</h2></TableCell>
                            </TableRow>
                            <TableRow key="3" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <div className={classes.cellWithImg}>
                                  <img src="/images/asop-warning.png" alt="allWarning" />
                                  <Box m={1} />
                                  <h3>АСОП активовано, але працює з відхиленнями:</h3>
                                </div>
                              </TableCell>
                              <TableCell align="center"><h2 style={{ color: '#FC9D0E' }}>{dataNow.someError || 0}</h2></TableCell>
                            </TableRow>
                            <TableRow key="4" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <div className={classes.cellWithImg}>
                                  <img src="/images/asop-closed.png" alt="allClosed" />
                                  <Box m={1} />
                                  <h3>Система зачинена:</h3>
                                </div>
                              </TableCell>
                              <TableCell align="center"><h2 style={{ color: '#FD3434' }}>{dataNow.closed || 0}</h2></TableCell>
                            </TableRow>
                            <TableRow key="5" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <div className={classes.cellWithImg}>
                                  <img src="/images/asop-broken.png" alt="allBroken" />
                                  <Box m={1} />
                                  <h3>Дані від РО відсутні:</h3>
                                </div>
                              </TableCell>
                              <TableCell align="center"><h2 style={{ color: '#000000' }}>{dataNow.noConnectEquip || 0}</h2></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <h3>Даних не знайдено</h3>
                    )}
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Divider />
            <Paper className={classes.paper}>
              <Box>
                <h1>{`Станом на: ${moment(selectedDateBefore.ts ? selectedDateBefore.ts : selectedDateBefore).format('yyyy-MM-DD')} (${timeBefore})`}</h1>
              </Box>

              <FormControl className={classes.formControl}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  id="date-picker-inline"
                  label="Оберіть дату"
                  value={selectedDateBefore}
                  onChange={handleDateChangeBefore}
                  autoOk
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Оберіть час</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={timeBefore}
                  onChange={handleChangeBefore}
                >
                  {genTimesArr().map((x) => (
                    <MenuItem key={`${x}`} value={x}>{`${x}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box pt={2}>
                {loadingTableTwo ? (
                  <div style={{
                    display: 'flex', justifyContent: 'center',
                  }}
                  >
                    <CircularProgress style={{ color: '#1e88e5' }} />
                  </div>
                ) : (
                  <>
                    {dataBefore.allOk && dataBefore.someError && dataBefore.closed && dataBefore.noConnectEquip ? (
                      <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                          <TableBody>
                            <TableRow key="6" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <h3>Всього рухомих одиниць по наряду:</h3>
                              </TableCell>
                              <TableCell align="center"><h2>{(dataBefore.allOk + dataBefore.someError + dataBefore.closed + dataBefore.noConnectEquip) || 0}</h2></TableCell>
                            </TableRow>
                            <TableRow key="7" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <div className={classes.cellWithImg}>
                                  <img src="/images/asop-success.png" alt="allSuccess" />
                                  <Box m={1} />
                                  <h3>АСОП активовано:</h3>
                                </div>
                              </TableCell>
                              <TableCell align="center"><h2 style={{ color: '#55C013' }}>{dataBefore.allOk || 0}</h2></TableCell>
                            </TableRow>
                            <TableRow key="8" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <div className={classes.cellWithImg}>
                                  <img src="/images/asop-warning.png" alt="allWarning" />
                                  <Box m={1} />
                                  <h3>АСОП активовано, але працює з відхиленнями:</h3>
                                </div>
                              </TableCell>
                              <TableCell align="center"><h2 style={{ color: '#FC9D0E' }}>{dataBefore.someError || 0}</h2></TableCell>
                            </TableRow>
                            <TableRow key="9" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <div className={classes.cellWithImg}>
                                  <img src="/images/asop-closed.png" alt="allClosed" />
                                  <Box m={1} />
                                  <h3>Система зачинена:</h3>
                                </div>
                              </TableCell>
                              <TableCell align="center"><h2 style={{ color: '#FD3434' }}>{dataBefore.closed || 0}</h2></TableCell>
                            </TableRow>
                            <TableRow key="10" hover>
                              <TableCell component="th" scope="row" size="medium">
                                <div className={classes.cellWithImg}>
                                  <img src="/images/asop-broken.png" alt="allBroken" />
                                  <Box m={1} />
                                  <h3>Дані від РО відсутні:</h3>
                                </div>
                              </TableCell>
                              <TableCell align="center"><h2 style={{ color: '#000000' }}>{dataBefore.noConnectEquip || 0}</h2></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <h3>Даних не знайдено</h3>
                    )}
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
