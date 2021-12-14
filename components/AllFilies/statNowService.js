/* eslint-disable prefer-const */
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    fontSize: '12px',
    color: theme.palette.text.secondary,
    maxWidth: '405px',
  },
  table: {
    '& .MuiTableCell-root': {
      borderLeft: '1px solid rgba(224, 224, 224, 1)',
      maxWidth: 255,
    },
  },
  tableNotActive: {
    '& .MuiTableCell-root': {
      borderLeft: '1px solid rgba(224, 224, 224, 1)',
      maxWidth: 255,
      filter: 'grayscale(100%);',
    },
  },
  cellWithImg: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}));

export default function StatNowFilies({ title, status }) {
  const classes = useStyles();

  const DateNow = new Date();
  let DateBefore = new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);

  const [dataNow, setDataNow] = useState({});
  const [selectedDateNow, setSelectedDateNow] = useState(DateNow);
  const [timeNow, setTimeNow] = useState(`${moment().format('HH')}:00`);
  const [loadingTable, setLoadingTable] = useState(true);

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

  return (

    <Paper className={classes.paper}>
      <Box>
        <h3 style={{ color: 'black' }}>{`${title} ${status ? `Обладнання станом на: ${moment(selectedDateNow.ts ? selectedDateNow.ts : selectedDateNow).format('yyyy-MM-DD')} (${timeNow})` : '(В РОЗРОБЦІ)'}`}</h3>
      </Box>

      <Box pt={1}>
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
                <Table className={status ? classes.table : classes.tableNotActive} size="small" aria-label="a dense table">
                  <TableBody>
                    {status && (
                    <TableRow key="1" hover>
                      <TableCell component="th" scope="row" size="small">

                        <h3>Всього рухомих одиниць по наряду:</h3>

                      </TableCell>
                      <TableCell align="center" style={{ width: '20px' }} size="small"><h4>{(dataNow.allOk + dataNow.someError + dataNow.closed + dataNow.noConnectEquip) || 0}</h4></TableCell>
                    </TableRow>
                    )}
                    <TableRow key="2" hover>
                      <TableCell component="th" scope="row" size="small">
                        <div className={classes.cellWithImg}>
                          <img src="/images/asop-success.png" alt="allSuccess" />
                          <Box m={1} />
                          <h3>АСОП активовано:</h3>
                        </div>
                      </TableCell>
                      <TableCell align="center"><h2 style={{ color: `${status ? '#55C013' : '#5f899a'}` }}>{dataNow.allOk && status ? dataNow.allOk : 0}</h2></TableCell>
                    </TableRow>
                    <TableRow key="3" hover>
                      <TableCell component="th" scope="row" size="small">
                        <div className={classes.cellWithImg}>
                          <img src="/images/asop-warning.png" alt="allWarning" />
                          <Box m={1} />
                          <h3>АСОП активовано; працює з відх.:</h3>
                        </div>
                      </TableCell>
                      <TableCell align="center"><h4 style={{ color: `${status ? '#FC9D0E' : '#5f899a'}` }}>{dataNow.someError && status ? dataNow.someError : 0}</h4></TableCell>
                    </TableRow>
                    <TableRow key="4" hover>
                      <TableCell component="th" scope="row" size="small">
                        <div className={classes.cellWithImg}>
                          <img src="/images/asop-closed.png" alt="allClosed" />
                          <Box m={1} />
                          <h3>Система зачинена:</h3>
                        </div>
                      </TableCell>
                      <TableCell align="center"><h2 style={{ color: `${status ? '#FD3434' : '#5f899a'}` }}>{dataNow.closed && status ? dataNow.closed : 0}</h2></TableCell>
                    </TableRow>
                    <TableRow key="5" hover>
                      <TableCell component="th" scope="row" size="small">
                        <div className={classes.cellWithImg}>
                          <img src="/images/asop-broken.png" alt="allBroken" />
                          <Box m={1} />
                          <h3>Дані від РО відсутні:</h3>
                        </div>
                      </TableCell>
                      <TableCell align="center"><h2 style={{ color: `${status ? '#000000' : '#5f899a'}` }}>{dataNow.noConnectEquip && status ? dataNow.noConnectEquip : 0}</h2></TableCell>
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
      <h3>
        Детальніше:
        <a target="_blank" href="https://monitoringasop.kyivcity.gov.ua">Monitoring E-ticket</a>
      </h3>
    </Paper>
  );
}
