/* eslint-disable prefer-const */
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
import moment from 'moment';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ScrollTop from '../returnTop';
import BackToMain from '../returnBack';

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
  gridFormControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  smallTableCell: {
    maxWidth: '30px',
  },
}));

const formFilterArr = (dateNow, carNum) => {
  const newDateTo = moment(`${moment(dateNow.ts ? dateNow.ts : dateNow)
    .format('YYYY-MM-DD')} 23:59`)
    .format('YYYY-MM-DD HH:mm:ss');

  return [carNum, `${moment(dateNow.ts ? dateNow.ts : dateNow).format('YYYY-MM-DD')} 00:00`, newDateTo];
};

// Functionality for filter by type car on filies. (Fix situation when in fillial car num identicaly with other fillial)
const busFilials = ['2', '5', '6', '8'];
const trolFilials = ['9', '10', '11', '12'];
const tramFilials = ['13', '14', '15'];

const initCarType = (fillial) => {
  if (busFilials.includes(fillial)) {
    return 'bus';
  } if (trolFilials.includes(fillial)) {
    return 'trol';
  } if (tramFilials.includes(fillial)) {
    return 'tram';
  }
  return 'bus';
};

export default function CompareTableFilies({ carNumGlobal = '', dateGlobal = '', fillial = '0' }) {
  const classes = useStyles();

  const DateNow = dateGlobal !== '' ? new Date(dateGlobal) : new Date();
  let DateBefore = dateGlobal !== '' ? new Date(dateGlobal) : new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);

  const [carNum, setCarNum] = useState(carNumGlobal);
  const [filName, setFilName] = useState('');

  const [dataNow, setDataNow] = useState({});
  const [selectedDateNow, setSelectedDateNow] = useState(DateNow);
  const [loadingTable, setLoadingTable] = useState(true);
  const [checkedCarType, setCheckedCarType] = useState(initCarType(fillial));

  const getData = () => {
    setLoadingTable(true);
    setFilName('');
    axios.post('/api/getAsopStatsCar', {
      // eslint-disable-next-line react/prop-types
      filter: formFilterArr(selectedDateNow, carNum),
      carType: checkedCarType,
    }).then((response) => {
      setDataNow(response.data.data);

      if (response.data.filName) setFilName(`(${response.data.filName})`);

      setLoadingTable(false);
    }).catch((e) => { setLoadingTable(false); });
  };

  useEffect(() => {
    getData();
  }, [selectedDateNow]);

  const handleDateChangeNow = (date) => {
    setSelectedDateNow(date);
  };

  const handleChangeCarNum = (event) => {
    setFilName('');
    const re = /^[0-9\b]+$/;

    if (event.target.value === '' || re.test(event.target.value)) setCarNum(event.target.value);
  };

  const handleChangeTypeCar = (param = 'bus') => {
    setCheckedCarType(param);
  };

  return (
    <div className={classes.root}>
      <div id="back-to-top-anchor" style={{ maxHeight: '1px' }} />
      <Box pt={dateGlobal !== '' ? 0 : 2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Divider />
            <Paper className={classes.paper}>

              <Box display="flex" justifyContent="center">
                {dateGlobal !== '' && (
                  <Box p={1}>
                    <BackToMain />
                  </Box>
                )}
                <Box pt={1} flexGrow={1}>
                  <h1>
                    {`Інформація за: ${moment(selectedDateNow.ts ? selectedDateNow.ts : selectedDateNow).format('yyyy-MM-DD')} по рухомій одиниці: ${carNum} ${filName || ''}`}
                  </h1>
                </Box>
              </Box>

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
                    <Grid container justify="center" className={classes.gridFormControl}>
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
                      <Box m={1} />
                      <TextField
                        inputProps={{ type: 'numeric' }}
                        id="car-number"
                        label="Оберіть РО"
                        value={carNum}
                        onChange={handleChangeCarNum}
                      />
                      <Box m={1} />
                      <Button
                        color="primary"
                        size="medium"
                        variant="outlined"
                        onClick={() => getData()}
                      >
                        Знайти
                      </Button>
                    </Grid>
                    <Grid container justify="center" className={classes.gridFormControl}>
                      <FormControlLabel
                        control={<Checkbox checked={checkedCarType === 'bus'} onChange={() => handleChangeTypeCar('bus')} inputProps={{ 'aria-label': 'primary checkbox' }} color="primary" />}
                        label="Автобус"
                      />
                      <Box m={1} />
                      <FormControlLabel
                        control={<Checkbox checked={checkedCarType === 'trol'} onChange={() => handleChangeTypeCar('trol')} inputProps={{ 'aria-label': 'primary checkbox' }} color="primary" />}
                        label="Тролейбус"
                      />
                      <Box m={1} />
                      <FormControlLabel
                        control={<Checkbox checked={checkedCarType === 'tram'} onChange={() => handleChangeTypeCar('tram')} inputProps={{ 'aria-label': 'primary checkbox' }} color="primary" />}
                        label="Трамвай"
                      />
                    </Grid>
                    <Box pt={2}>
                      {dataNow.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Дата</TableCell>
                                <TableCell align="center">Відмітки (Логи)</TableCell>
                                <TableCell align="center">Валідації</TableCell>
                                <TableCell align="center">Дія водія</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {dataNow.map((x) => (
                                <>
                                  <TableRow key={x.datetime} hover>
                                    <TableCell align="center">
                                      <h3>
                                        Стан на:
                                        <Box m={1}>
                                          {moment(x.datetime).format('YYYY-MM-DD HH:mm')}
                                        </Box>
                                      </h3>
                                    </TableCell>
                                    <TableCell align="left"><code><div className="Container" dangerouslySetInnerHTML={{ __html: x.elem2.info }} /></code></TableCell>
                                    {x.elem2.validation ? (
                                      <TableCell align="center"><h3>{x.elem2.validation.includes('T') ? moment(x.elem2.validation).format('YYYY-MM-DD HH:mm:ss') : moment(`${moment(x.datetime).format('YYYY-MM-DD')} ${x.elem2.validation}`).format('YYYY-MM-DD HH:mm:ss')}</h3></TableCell>
                                    ) : (
                                      <TableCell align="center">
                                        <h3>Валідація не знайдена...</h3>
                                      </TableCell>
                                    )}
                                    <TableCell align="center"><h3>{x.elem2.smenTripCount.replace(/T|,/g, ' ')}</h3></TableCell>
                                  </TableRow>
                                </>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <h3>Даних не знайдено</h3>
                      )}
                    </Box>
                    <ScrollTop />
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
