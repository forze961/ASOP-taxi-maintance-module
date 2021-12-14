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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import generateTableInfo from './generateTableInfo';
import BackToMain from '../returnBack';
import ScrollTop from '../returnTop';

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

const formFilterArr = (dateNow, akpNum) => {
  const newDateTo = moment(`${moment(dateNow.ts ? dateNow.ts : dateNow)
    .format('YYYY-MM-DD')} 23:59`)
    .format('YYYY-MM-DD HH:mm:ss');

  return [akpNum, `${moment(dateNow.ts ? dateNow.ts : dateNow).format('YYYY-MM-DD')} 00:00`, newDateTo];
};

export default function CompareTableFilies({ akpNumGlobal = '', dateGlobal = '', backToMainUrl = '' }) {
  const classes = useStyles();

  const DateNow = dateGlobal !== '' ? new Date(dateGlobal) : new Date();
  let DateBefore = dateGlobal !== '' ? new Date(dateGlobal) : new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);

  const [akpNum, setAkpNum] = useState(akpNumGlobal);
  const [filName, setFilName] = useState('');

  const [dataNow, setDataNow] = useState({});
  const [selectedDateNow, setSelectedDateNow] = useState(DateNow);
  const [loadingTable, setLoadingTable] = useState(true);

  const getData = () => {
    setLoadingTable(true);
    setFilName('');
    axios.post('/api/getAsopStatsAkp', {
      // eslint-disable-next-line react/prop-types
      filter: formFilterArr(selectedDateNow, akpNum),
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

  const handleChangeAkpNum = (event) => {
    setFilName('');
    const re = /^[0-9\b]+$/;

    if (event.target.value === '' || re.test(event.target.value)) setAkpNum(event.target.value);
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
                    <BackToMain backUrl={backToMainUrl} />
                  </Box>
                )}
                <Box pt={1} flexGrow={1}>
                  <h1>
                    {`Інформація за: ${moment(selectedDateNow.ts ? selectedDateNow.ts : selectedDateNow).format('yyyy-MM-DD')} по станції: ${akpNum} ${filName || ''}`}
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
                        id="akp-number"
                        label="Введіть locationID станції"
                        value={akpNum}
                        onChange={handleChangeAkpNum}
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
                    <Box pt={2}>
                      {dataNow.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Дата</TableCell>
                                <TableCell align="center">Час останньої валідації</TableCell>
                                <TableCell align="center">Час даних від обладнання</TableCell>
                                <TableCell align="center">Детальна інформація</TableCell>
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
                                    {x.elem.validation ? (
                                      <TableCell align="left">
                                        <Accordion
                                          style={{ width: 'auto' }}
                                        >
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                          >
                                            <h3>{x.elem.validation.includes('T') ? moment(x.elem.validation).format('YYYY-MM-DD HH:mm:ss') : moment(`${moment(x.datetime).format('YYYY-MM-DD')} ${x.elem2.validation}`).format('YYYY-MM-DD HH:mm:ss')}</h3>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <TableContainer component={Paper}>
                                              <Table className={classes.table} size="small" aria-label="a dense table">
                                                <TableHead>
                                                  <TableRow>
                                                    <TableCell align="center">Транспортна картка</TableCell>
                                                    <TableCell align="center">Картка киянина</TableCell>
                                                    <TableCell align="center">QR</TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                  <TableCell align="center">
                                                    <h3>{x.elem.validationKC.includes('T') ? moment(x.elem.validationKC).format('YYYY-MM-DD HH:mm:ss') : moment(`${moment(x.datetime).format('YYYY-MM-DD')} ${x.elem2.validationKC}`).format('YYYY-MM-DD HH:mm:ss')}</h3>
                                                  </TableCell>
                                                  <TableCell align="center">
                                                    <h3>{x.elem.validationTC.includes('T') ? moment(x.elem.validationTC).format('YYYY-MM-DD HH:mm:ss') : moment(`${moment(x.datetime).format('YYYY-MM-DD')} ${x.elem2.validationTC}`).format('YYYY-MM-DD HH:mm:ss')}</h3>
                                                  </TableCell>
                                                  <TableCell align="center">
                                                    <h3>{x.elem.validationQR.includes('T') ? moment(x.elem.validationQR).format('YYYY-MM-DD HH:mm:ss') : moment(`${moment(x.datetime).format('YYYY-MM-DD')} ${x.elem2.validationQR}`).format('YYYY-MM-DD HH:mm:ss')}</h3>
                                                  </TableCell>
                                                </TableBody>
                                              </Table>
                                            </TableContainer>
                                          </AccordionDetails>
                                        </Accordion>
                                      </TableCell>
                                    ) : (
                                      <TableCell align="center">
                                        <h3>Валідація не знайдена...</h3>
                                      </TableCell>
                                    )}
                                    {x.elem.obtime ? (
                                      <TableCell align="center"><h3>{x.elem.obtime.includes('T') ? moment(x.elem.obtime).format('YYYY-MM-DD HH:mm:ss') : moment(`${moment(x.datetime).format('YYYY-MM-DD')} ${x.elem2.obtime}`).format('YYYY-MM-DD HH:mm:ss')}</h3></TableCell>
                                    ) : (
                                      <TableCell align="center">
                                        <h3>Обладнання не знайдене...</h3>
                                      </TableCell>
                                    )}
                                    <TableCell align="left">
                                      <Accordion
                                        style={{ width: 'auto' }}
                                      >
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <Typography>Детальніше:</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <div className="Container" dangerouslySetInnerHTML={{ __html: generateTableInfo(x.elem.info) }} />
                                        </AccordionDetails>
                                      </Accordion>
                                    </TableCell>
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
