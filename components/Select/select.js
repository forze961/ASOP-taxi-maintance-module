import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect({carrier, setCarrier}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [carriers, setCarriers] = useState([]);

  const fetchData = useCallback(async () => {
    const { data } = await axios({
      method: 'get',
      url: `http://193.23.225.178:8082/api/ausers`,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
    });
    const formatted = data.reduce((acc, curr) => {
      const splitted = curr.age.split(',');
      acc.push({
        id: curr.id,
        name: curr.name,
        personalId: splitted[1],
      })
      return acc;
    },[])
    setCarriers(formatted);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData])

  const handleChange = (event) => {
    setCarrier(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Перевізник</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={carrier}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {carriers.map((el) => (
            <MenuItem value={el.personalId}>{el.name}</MenuItem>))}
        </Select>
      </FormControl>
    </div>
  );
}
