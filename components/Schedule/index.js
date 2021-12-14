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
}));

const createData = (obj) => ({
  id: Math.floor(Math.random() * 1000),
  ...obj,
  isEditMode: false,
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

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="center" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : getCellSplit(row, name)}
    </TableCell>
  );
};

export default function Schedule() {
  const classes = useStyles();

  const DateNow = new Date();
  let DateBefore = new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);
  const [selectedDateNow, setSelectedDateNow] = useState(DateNow);
  const [timeNow, setTimeNow] = useState(`${moment().format('HH')}:00`);
  const [loadingTable, setLoadingTable] = useState(false);
  const [previous, setPrevious] = React.useState({});

  const [rows, setRows] = useState([
    createData({
      route: 215,
      graph: 1,
      smen: '1',
      trips: 11,
      time1: '05:24',
      time2: '05:30',
      time3: '-',
      time4: '18:41',
      time5: '-',
      carType: 'Богдан А091',
    }),
    createData({
      route: 401,
      graph: 1,
      smen: '1',
      trips: 6,
      time1: '05:24',
      time2: '05:30',
      time3: '12:43',
      time4: '12:41',
      time5: '-',
      carType: 'Богдан А091',
    }),
    createData({
      route: 401,
      graph: 1,
      smen: '2',
      trips: 5,
      time1: '12:45',
      time2: '12:45',
      time3: '-',
      time4: '23:10',
      time5: '-',
      carType: 'Богдан А091',
    }),
    createData({
      route: 203,
      graph: 1,
      smen: '1/2',
      trips: 20,
      time1: '05:24',
      time2: '05:30',
      time3: '-',
      time4: '22:00',
      time5: '-',
      carType: 'Volvo TRN',
    }),
    createData({
      route: 203,
      graph: 2,
      smen: '1/2',
      trips: 20,
      time1: '05:24',
      time2: '05:30',
      time3: '-',
      time4: '22:00',
      time5: '-',
      carType: 'МАЗ 203',
    }),
    createData({
      route: 203,
      graph: 3,
      smen: '1/2',
      trips: 20,
      time1: '05:24',
      time2: '05:30',
      time3: '-',
      time4: '22:00',
      time5: '-',
      carType: 'Богдан А092',
    }),
  ]);

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

  const onDelete = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Box>
            <h2>{`Розклад станом на: ${moment(selectedDateNow.ts ? selectedDateNow.ts : selectedDateNow).format('yyyy-MM-DD')}`}</h2>
          </Box>

          <TableHeaderBar
            selectedDateNow={selectedDateNow}
            handleDateChangeNow={(value) => setSelectedDateNow(moment(value.ts ? value.ts : value).format('yyyy-MM-DD'))}
            btnTitle="Створити розклад"
            btnOnClick={() => {
              setRows([createData({
                route: 0,
                graph: 1,
                smen: '1',
                trips: 0,
                time1: '',
                time2: '',
                time3: '',
                time4: '',
                time5: '',
                carType: '',
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
                        <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">Ред.</TableCell>
                        <TableCell className={classes.tableHeaderFirst} colSpan={4} align="center">Маршрут/Графік/Зміна/К-сть рейсів</TableCell>
                        <TableCell className={classes.tableHeaderFirst} colSpan={5} align="center">Час</TableCell>
                        <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">РО</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableHeaderFirst} align="center" />
                        <TableCell className={classes.tableHeaderSecond} align="center">М</TableCell>
                        <TableCell className={classes.tableHeaderSecond} align="center">Г</TableCell>
                        <TableCell className={classes.tableHeaderSecond} align="center">З</TableCell>
                        <TableCell className={classes.tableHeaderSecond} align="center">Рейси</TableCell>

                        <TableCell className={classes.tableHeaderSecond} align="center">Явка</TableCell>
                        <TableCell className={classes.tableHeaderSecond} align="center">Виїзд</TableCell>
                        <TableCell className={classes.tableHeaderSecond} align="center">Перезміна</TableCell>
                        <TableCell className={classes.tableHeaderSecond} align="center">Заїзд</TableCell>
                        <TableCell className={classes.tableHeaderSecond} align="center">Час зміни</TableCell>
                        <TableCell className={classes.tableHeaderSecond} align="center">Марка</TableCell>

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
                                  onClick={() => onToggleEditMode(row.id)}
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
                          <CustomTableCell clas {...{ row, name: 'route', onChange }} />
                          <CustomTableCell {...{ row, name: 'graph', onChange }} />
                          <CustomTableCell {...{ row, name: 'smen', onChange }} />
                          <CustomTableCell {...{ row, name: 'trips', onChange }} />
                          <CustomTableCell {...{ row, name: 'time1', onChange }} />
                          <CustomTableCell {...{ row, name: 'time2', onChange }} />
                          <CustomTableCell {...{ row, name: 'time3', onChange }} />
                          <CustomTableCell {...{ row, name: 'time4', onChange }} />
                          <CustomTableCell {...{ row, name: 'time5', onChange }} />
                          <CustomTableCell {...{ row, name: 'carType', onChange }} />
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
