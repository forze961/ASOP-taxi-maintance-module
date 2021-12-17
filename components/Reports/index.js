/* eslint-disable prefer-const */
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHeaderBar from '../TableHeaderBar';
import HeaderTemplate from './headerTemplate';
import FillialTable from './tablesByType/fillialTable';
import RouteTable from './tablesByType/routeTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
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

const getTableByType = (typeReportData) => {
  const { report } = typeReportData || 0;

  console.log(report.type)

  switch (report.type) {
    case 0: {
      return (<FillialTable typeReportData={typeReportData} />);
    }

    case 1: {
      return (<RouteTable typeReportData={typeReportData} />);
    }

    default: {
      return (<FillialTable typeReportData={typeReportData} />);
    }
  }
};

export default function Schedule() {
  const classes = useStyles();
  const [loadingTable, setLoadingTable] = useState(false);
  const [typeReportData, setTypeReportData] = useState({ dateRangeDiff: 1, report: { type: '0', name: 'Перевізники' } });

  const onDateOrTypeChanged = (datePeriod, report) => {
    let diffCount = 1;

    const dateDiff = datePeriod.endDate - datePeriod.startDate;
    diffCount = Math.ceil(dateDiff / (1000 * 60 * 60 * 24)) || 1;

    setTypeReportData({ dateRangeDiff: diffCount, report });
  };

  console.log(typeReportData.report);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Box>
            <h2>
              {`Звіт з виконання маршрутної роботи по: ${typeReportData.report.name}`}
            </h2>
          </Box>

          <TableHeaderBar
            disableDatepicker
            btnTitle="Зберегти PDF"
            child={<HeaderTemplate handleChangeValue={onDateOrTypeChanged} />}
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
                  {getTableByType(typeReportData)}
                </TableContainer>
              </>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
