// flow strict
import { useEffect, useState } from 'react';
import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  innerTable: {
    backgroundColor: '#1e88e50a',
  },
  innerCell: {
    cursor: 'pointer',

  },
}));

// Gen items cars on click to route row
const generateCarsList = (cars, dateStr, fillial) => cars.map((x) => (
  <MenuItem key={x}>
    <Link href={`/statVehicle/${x}/${dateStr}/${fillial}`}>
      <a target="_blank">
        {`• РО: #${x}`}
      </a>
    </Link>
  </MenuItem>
));

export default function InnerTableRow({
  open, fill, fillId, filterDate,
}) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [currentCars, setCurrentCars] = useState([]);
  const [currentRoute, setCurrentRoute] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, cars, route) => {
    setCurrentCars(cars);
    setCurrentRoute(route);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    axios.post('/api/getAsopStats', {
      // eslint-disable-next-line react/prop-types
      filter: [fillId, ...filterDate],
      type: 'routes',
    }).then((response) => {
      setData(response.data);
    }).catch((e) => { console.log(e); });
  }, []);

  return (
    <>
      {currentCars.length > 0 && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <MenuItem disabled>
            {`Детальніше по маршруту: #${currentRoute}`}
          </MenuItem>
          {generateCarsList(currentCars, filterDate[0], fillId)}
        </Menu>
      )}

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }} colSpan="100%">
          <Collapse in={open === fillId} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {fill}
              </Typography>
              {data.length !== 0 ? (
                <Table size="small" aria-label="purchases" className={classes.innerTable}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Маршрут</TableCell>
                      <TableCell align="center">АСОП активовано</TableCell>
                      <TableCell align="center">АСОП активовано, але працює з відхиленнями</TableCell>
                      <TableCell align="center">Система зачинена</TableCell>
                      <TableCell align="center">Дані від РО відсутні</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(data).map(([key, val]) => (
                      <TableRow key={`prop_${key}`} hover>
                        <TableCell align="center" key={`cell_${key}`}><h3>{key}</h3></TableCell>
                        {Object.values(val).map((cell, cellIndex) => (
                          <>
                            <TableCell className={classes.innerCell} align="center" key={`cell_${cellIndex}`}>
                              <Box
                                onClick={(e) => handleClick(e, cell, key)}
                              >
                                {cell.length !== 0 ? cell.length : '—'}
                              </Box>
                            </TableCell>
                          </>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <>
                  <LinearProgress style={{ color: '#1e88e5' }} />
                </>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
