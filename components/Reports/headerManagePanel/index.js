// flow strict
import { DateRangePicker } from 'materialui-daterange-picker';
import InputAdornment from '@material-ui/core/InputAdornment';
import CalendarIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

type PropsTypes = {|
  +value: string,
  +changeValue: () => void,
  +handleOpen: () => void,
  +open: boolean
|}

export default function headerManagePanel({
  value, handleOpen, changeValue, open, toggle,
}: PropsTypes) {
  return (
    <Grid>
      <Input
        id="standard-basic"
        label="Обрати дату"
        value={value}
        style={{
          cursor: 'pointer',
          width: '250px',
        }}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              onClick={handleOpen}
              aria-label="choise date period"
            >
              <CalendarIcon />
            </IconButton>
          </InputAdornment>
        )}
      />
      <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={changeValue}
      />
    </Grid>

  );
}
