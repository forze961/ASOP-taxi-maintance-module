// TODO: Not used.
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import lodash from 'lodash';

// india
export default function App() {
  const [, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    const url = 'api/getAsopCarDictionary';
    axios
      .get(url)
      .then((response) => {
        // handle success
        const { status, data } = response;
        if (status === 200) {
          const b = lodash.map(data, 'NumPe');
          // console.log(b);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    const paramSearch = event.target.value;
    const url = `api/getAsopCarDictionary?car=${paramSearch}`;
    axios
      .get(url)
      .then((response) => {
        // handle success
        const { status, data } = response;
        if (status === 200) {
          console.log(data);
          const data2 = data.filter((x) => x.NumPe.includes(paramSearch));
          console.log(data);
          setOptions(data2);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Autocomplete
        id="google-map-demo"
        style={{ width: 300 }}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.NumPe)}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        freeSolo
        disableOpenOnFocus
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add a location"
            fullWidth
            onChange={handleChange}
          />
        )}
        renderOption={(option) => (
          <Grid container alignItems="center">
            <Grid item xs>
              {option.NumPe}
            </Grid>
          </Grid>
        )}
      />
    </div>
  );
}
