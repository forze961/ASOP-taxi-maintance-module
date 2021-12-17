import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({

  table: {
    minWidth: 300,
    '& .MuiTableCell-root': {
      borderRight: '1px solid rgba(224, 224, 224, 1)',
    },
  },

}));

const createData = (obj) => ({
  id: Math.floor(Math.random() * 1000),
  ...obj,
});

const mockData = (diff = 1) => [createData({
  fillial: 'Кийтранс-2005',
  route: '155',
  graph: '5',
  carNum: '2514',
  carNumState: 'АА 2198 КА',
  plan: 96 * diff,
  fact: 90 * diff,
  troubleReason: '-',
}),
createData({
  fillial: 'Кийтранс-2005',
  route: '202',
  graph: '5',
  carNum: '2611',
  carNumState: 'АА 2724 КА',
  plan: 45 * diff,
  fact: 44 * diff,
  troubleReason: '-',
}),
createData({
  fillial: 'Київпастранс',
  route: '220',
  graph: '1',
  carNum: '3117',
  carNumState: 'АА 7824 КА',
  plan: 30 * diff,
  fact: 30 * diff,
  troubleReason: '-',
}),
createData({
  fillial: 'Київпастранс',
  route: '220',
  graph: '2',
  carNum: '9781',
  carNumState: 'АА 7825 КА',
  plan: 5 * diff,
  fact: 5 * diff,
  troubleReason: '-',
}),
createData({
  fillial: 'Універсал-Транс',
  route: 171,
  graph: '1',
  carNum: '2200',
  carNumState: 'АА 7826 КА',
  plan: 51 * diff,
  fact: 59 * diff,
  troubleReason: '-',
}),
createData({
  fillial: 'Універсал-Транс',
  route: 171,
  graph: '3',
  carNum: '2201',
  carNumState: 'КН 05238',
  plan: 16 * diff,
  fact: 16 * diff,
  troubleReason: '-',
}),
];

export default function headerManagePanel({ typeReportData }) {
  const classes = useStyles();

  const [rows, setRows] = useState(mockData(1));

  useEffect(() => {
    setRows(mockData(typeReportData.dateRangeDiff));
  }, [typeReportData]);

  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">Перевізник</TableCell>
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">Маршрут</TableCell>
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">Номер випуску</TableCell>
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">Бортовий номер</TableCell>
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">Державний номер</TableCell>
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">План рейсів</TableCell>
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">Факт рейсів</TableCell>
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">Причина недовипуску</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow>
            <TableCell>{row.fillial}</TableCell>
            <TableCell>{row.route}</TableCell>
            <TableCell>{row.graph}</TableCell>
            <TableCell>{row.carNum}</TableCell>
            <TableCell>{row.carNumState}</TableCell>
            <TableCell>{row.plan}</TableCell>
            <TableCell>{row.fact}</TableCell>
            <TableCell>{row.troubleReason}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
