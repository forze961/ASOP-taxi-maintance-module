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
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
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
      borderLeft: '1px solid rgba(224, 224, 224, 1)',
      maxWidth: 100,
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
}));

const formFilterArr = (dateNow, timeNow) => {
  const newDateTo = moment(`${moment(dateNow.ts ? dateNow.ts : dateNow)
    .format('YYYY-MM-DD')} ${timeNow}:00`)
    .add(59, 'minutes')
    .format('YYYY-MM-DD HH:mm:ss');

  return [`${moment(dateNow.ts ? dateNow.ts : dateNow).format('YYYY-MM-DD')} ${timeNow}:00`, newDateTo];
};

export default function CompareTableFilies() {
  const classes = useStyles();

  const DateNow = new Date();
  let DateBefore = new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);

  const [dataNow, setDataNow] = useState({});
  const [selectedDateNow, setSelectedDateNow] = useState(DateNow);
  const [timeNow, setTimeNow] = useState(`${moment().format('HH')}:00`);
  const [loadingTable, setLoadingTable] = useState(true);
  const [open, setOpen] = useState('');

  useEffect(() => {
    setLoadingTable(true);
    axios.post('/api/getAsopStats', {
      // eslint-disable-next-line react/prop-types
      filter: formFilterArr(selectedDateNow, timeNow),
      type: 'fillies',
    }).then((response) => {
      setDataNow(response.data);
      setLoadingTable(false);
    }).catch(() => { setLoadingTable(false); });
  }, [selectedDateNow, timeNow]);

  const handleChangeNow = (event) => {
    setTimeNow(event.target.value);
  };

  const handleDateChangeNow = (date) => {
    setSelectedDateNow(date);
  };

  return (
    <div className={classes.root}>
      <Box pt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Divider />
            <Paper className={classes.paper}>
              <Box>
                <h4>{`Розклад станом на: ${moment(selectedDateNow.ts ? selectedDateNow.ts : selectedDateNow).format('yyyy-MM-DD')} (${timeNow})`}</h4>
              </Box>

              <TableHeaderBar
                selectedDateNow={selectedDateNow}
                handleDateChangeNow={handleDateChangeNow}
                btnTitle="Створити розклад"
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
                    <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.tableHeaderFirst} colSpan={4} align="center">Маршрут/Графік/Зміна/К-сть рейсів</TableCell>
                            <TableCell className={classes.tableHeaderFirst} colSpan={5} align="center">Час</TableCell>
                            <TableCell className={classes.tableHeaderFirst} colSpan={2} align="center">Водій</TableCell>
                            <TableCell className={classes.tableHeaderFirst} colSpan={2} align="center">РО</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableHeaderSecond} align="center">М</TableCell>
                            <TableCell className={classes.tableHeaderSecond} align="center">Г</TableCell>
                            <TableCell className={classes.tableHeaderSecond} align="center">З</TableCell>
                            <TableCell className={classes.tableHeaderSecond} align="center">Рейс</TableCell>

                            <TableCell className={classes.tableHeaderSecond} align="center">Явка</TableCell>
                            <TableCell className={classes.tableHeaderSecond} align="center">Виїзд</TableCell>
                            <TableCell className={classes.tableHeaderSecond} align="center">Перезміна</TableCell>
                            <TableCell className={classes.tableHeaderSecond} align="center">Заїзд</TableCell>
                            <TableCell className={classes.tableHeaderSecond} align="center">Час зміни</TableCell>

                            <TableCell className={classes.tableHeaderSecond} align="center">ПІБ</TableCell>
                            <TableCell className={classes.tableHeaderSecond} align="center">ТН</TableCell>

                            <TableCell className={classes.tableHeaderSecond} align="center">БН</TableCell>
                            <TableCell className={classes.tableHeaderSecond} align="center">Марка</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">215</TableCell>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">
                              1
                              <Box pt={1} />
                              2
                            </TableCell>
                            <TableCell align="center">3</TableCell>

                            <TableCell align="center">05:24</TableCell>
                            <TableCell align="center">05:27</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">18:41</TableCell>
                            <TableCell align="center">-</TableCell>

                            <TableCell align="center">Литвиненко О.А.</TableCell>
                            <TableCell align="center">2641</TableCell>

                            <TableCell align="center">М1</TableCell>
                            <TableCell align="center">Богдан А091</TableCell>

                          </TableRow>

                        </TableBody>
                      </Table>
                    </TableContainer>
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
