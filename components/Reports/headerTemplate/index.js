import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import DateRangePickerComp from '../headerManagePanel';

function getDateToToStr(range) {
  const startStr = range.startDate.customFormat('#YYYY#-#MM#-#DD#');
  const endStr = range.endDate.customFormat('#YYYY#-#MM#-#DD#');
  return `${startStr} — ${endStr}`;
}

function isDatesPeriod(range) {
  const startStr = range.startDate.customFormat('#YYYY#-#MM#-#DD#');
  const endStr = range.endDate.customFormat('#YYYY#-#MM#-#DD#');
  return startStr !== endStr;
}

// Types report.
// TODO: move to utils 'Cause backend use it also
const reportTypes = [
  {
    value: '0',
    label: 'По перевізникам',
  },
  {
    value: '1',
    label: 'По маршрутам',
  },
  {
    value: '2',
    label: 'По рухомій одиниці',
  },
];

export default function headerManagePanel({
  handleChangeValue,
}) {
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - 1);

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: dateNow, endDate: dateNow });
  const [dateRangeLimit, setDateRangeLimit] = useState(false);
  const [typeReport, setTypeReport] = useState(0);
  const [checkedUpdate, setCheckedUpdate] = useState(false);


  useEffect(() => {
    // Use not strict compare
    const nameReport = reportTypes.find((x) => x.value == typeReport);

    handleChangeValue(dateRange, { type: typeReport, name: nameReport?.label });
  }, [dateRange, typeReport]);

  return (
    <div style={{ display: 'inline-flex' }}>
      <Box pt={2}>
        <DateRangePickerComp
          value={getDateToToStr(dateRange)}
          handleOpen={() => setOpenDatePicker(true)}
          changeValue={(x) => {
            const dateDiff = x.endDate - x.startDate;
            const diffCount = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

            // Limit period one week
            if (diffCount <= 31) {
              if (diffCount > 0 && checkedUpdate) {
                setDateRangeLimit(2);
              } else {
                setDateRangeLimit(false);
                setDateRange(x);
                setOpenDatePicker(false);
              }
            } else {
              setDateRangeLimit(1);
            }
          }}
          toggle={() => setOpenDatePicker(!openDatePicker)}
          open={openDatePicker}
        />
      </Box>
      <Box pl={2}>
        <TextField
          id="standard-select-currency-native"
          select
          label="Тип звіту"
          value={typeReport.toString()}
          onChange={(e) => setTypeReport(Number(e.target.value))}
          SelectProps={{
            native: true,
          }}
        >
          {reportTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
    </div>
  );
}

Date.prototype.customFormat = function (formatString) {
  let YYYY; let YY; let MMMM; let MMM; let MM; let M; let DDDD; let DDD; let DD; let D; let hhhh; let hhh; let hh; let h; let mm; let m; let ss; let s; let ampm; let AMPM; let dMod; let
    th;
  YY = (`${YYYY = this.getFullYear()}`).slice(-2);
  MM = (M = this.getMonth() + 1) < 10 ? (`0${M}`) : M;
  MMM = (MMMM = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][M - 1]).substring(0, 3);
  DD = (D = this.getDate()) < 10 ? (`0${D}`) : D;
  DDD = (DDDD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.getDay()]).substring(0, 3);
  th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
  formatString = formatString.replace('#YYYY#', YYYY).replace('#YY#', YY).replace('#MMMM#', MMMM).replace('#MMM#', MMM)
    .replace('#MM#', MM)
    .replace('#M#', M)
    .replace('#DDDD#', DDDD)
    .replace('#DDD#', DDD)
    .replace('#DD#', DD)
    .replace('#D#', D)
    .replace('#th#', th);
  h = (hhh = this.getHours());
  if (h == 0) h = 24;
  if (h > 12) h -= 12;
  hh = h < 10 ? (`0${h}`) : h;
  hhhh = hhh < 10 ? (`0${hhh}`) : hhh;
  AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
  mm = (m = this.getMinutes()) < 10 ? (`0${m}`) : m;
  ss = (s = this.getSeconds()) < 10 ? (`0${s}`) : s;
  return formatString.replace('#hhhh#', hhhh).replace('#hhhh#', hhh).replace('#hh#', hh).replace('#h#', h)
    .replace('#mm#', mm)
    .replace('#m#', m)
    .replace('#ss#', ss)
    .replace('#s#', s)
    .replace('#ampm#', ampm)
    .replace('#AMPM#', AMPM);
};

Date.prototype.isValidDate = function () {
  return this instanceof Date && !isNaN(this);
};
