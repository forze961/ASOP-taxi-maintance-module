import MUIDataTable from 'mui-datatables';
import formattedValue from '../mockLinesDict';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function createData(data, date) {
  const resultArrayTable = [];

  for (const [keyName, value] of Object.entries(data)) {
    const keyNameParse = keyName.split('_');
    const formKeyName = formattedValue(keyNameParse[0]);

    resultArrayTable.push([formKeyName, numberWithCommas(value), keyNameParse[1] || date]);
  }

  return resultArrayTable;
}

const columns = ['Рівень', 'Кількість валідацій', 'Дата'];

export default function DataTable({ data, dateDefault }) {
  const options = {
    filter: true,
    filterType: 'dropdown',
    download: false,
    jumpToPage: true,
  };

  return (
    <>
      <MUIDataTable
        title="Детальна інформація кількості валідацій за заданим фільтром"
        data={createData(data, dateDefault)}
        columns={columns}
        options={options}
      />
    </>
  );
}
