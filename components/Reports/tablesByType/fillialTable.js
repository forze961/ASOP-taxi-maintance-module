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
  plan: 96 * diff,
  fact: 90 * diff,
}),
createData({
  fillial: 'Кийтранс-2005',
  route: '202',
  plan: 45 * diff,
  fact: 44 * diff,
}),
createData({
  fillial: 'Київпастранс',
  route: '220',
  plan: 35 * diff,
  fact: 35 * diff,
}),
createData({
  fillial: 'Універсал-Транс',
  route: 171,
  plan: 67 * diff,
  fact: 75 * diff,
})];

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
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">План випуску</TableCell>
          <TableCell className={classes.tableHeaderFirst} colSpan={1} align="center">Факт випуску</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow>
            <TableCell>{row.fillial}</TableCell>
            <TableCell>{row.route}</TableCell>
            <TableCell>{row.plan}</TableCell>
            <TableCell>{row.fact}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
