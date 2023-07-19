/* eslint-disable prefer-const */
// axios
import axios from 'axios';
// react hooks
import {useState, useEffect, useCallback} from 'react';

import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
// component
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: "transparent" ,
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
  bg: {
    backgroundColor: 'transparent',
  },
}));

const createNewData = (obj, rows) => ({
  id: Math.floor(Math.random() * 1000),
  ...obj,
  isEditMode: true,
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

const CustomTableCell = ({
  row, name, onChange, onChangeDate,
}) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="center" className={classes.tableCell}>
      {
        isEditMode ? (
            name.includes('date') ? (
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                id="date-picker-inline"
                label="Оберіть дату"
                value={row[name]}
                onChange={(value) => onChangeDate(value, name, row)}
                autoOk
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            ) : (
              <Input
                value={row[name]}
                name={name}
                onChange={(e) => onChange(e, row)}
                className={classes.input}
              />
            )
          )
          : (getCellSplit(row, name))
      }
    </TableCell>
  );
};

export default function Carriers() {
  const classes = useStyles();

  const DateNow = new Date();
  let DateBefore = new Date();
  DateBefore.setDate(DateBefore.getDate() - 1);
  const [selectedDateNow, setSelectedDateNow] = useState(DateNow);
  const [loadingTable, setLoadingTable] = useState(false);
  const [previous, setPrevious] = useState({});
  const [created, setCreated] = useState(false);
  // data for table
  const [tableData, setTableData] = useState([
    {name:'Петро', address: 'Левандівка вул.', number: '+380623777778'},
    {name:'Олег', address: 'Гіпсова вул.', number: '+38063111111'},
    {name:'Василь', address: 'Кульпарківська вул.', number: '+38062333333'},
    {name:'Артур', address: null, number: '+38062333333'},
    {name:'Пантелеймон', address: null, number: null},
    {name:'Ярослав', address: null, number: null},
  ])

  const [rows, setRows] = useState([]);
  console.log(rows)


  // get data
  const getData = useCallback(async () => {
    const { data } = await axios({
      method: 'get',
      url: `/api/ausers`,
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
        address: splitted[2],
        timezone: splitted[3],
        phone: splitted[4],
        lang: splitted[5],
      })
      return acc;
    },[])
    setRows(formatted);
  }, [])

  useEffect(() => {
    getData().catch(console.error);
  }, [getData])

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

  const onChangeDate = (value, name, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: moment(value.ts ? value.ts : value).format('yyyy-MM-DD') };
      }
      return row;
    });
    setRows(newRows);
  };

  const onSave = async (row) => {
    const age = `,${row.personalId},${row.address},${row.timezone},${row.phone},${row.lang}`;
    if (created) {
      const fetchData = async () => {
        const data = await axios({
          method: 'post',
          url: `/api/ausers`,
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
          },
          data: {
            age,
            name: row.name,
          }
        });
        return data;
      }
      const record = await fetchData().catch(console.error);
      if (record) {
        onToggleEditMode(row.id);
        setCreated(false);
        return await getData();
      }
    }

    const fetchData = async () => {
      await axios({
        method: 'put',
        url: `/api/ausers`,
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
        data: {
          age,
          id: row.id,
          name: row.name,
        }
      });
    }
    fetchData().catch(console.error);
    onToggleEditMode(row.id);
    setCreated(false);
  }

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

  const onDelete = async (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
    await axios({
      method: 'delete',
      url: `/api/ausers/${id}`,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
    });
    setPrevious((state) => {
      delete state[id];
      return state;
    });
  };
  // from this array you can control your table like position and another ...
  // align -control position

  const columns =[
    {title: 'Назва', field: "name", align:'left',emptyValue: ()=> <em>null</em>, defaultSort: "asc"},
    {title: 'Поштова адреса', field: "address", align:'left',emptyValue: ()=> <em>null</em>, defaultSort: "asc"},
    // if yo want to disabled for sort and search same column
    // sorting: false, searchable: false
    {title: 'Телефон', field: "number", align:'left', emptyValue: ()=> <em>null</em>, sorting: false, searchable: false }
  ]
// icons
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  

  return (
    <Grid item  spacing={2} xs={12} className={classes.bg}>
        <Paper className={classes.paper}>
          <MaterialTable
            title="Перевізники"
            // columns
            columns ={columns}
            // icons
            icons={tableIcons}
            // data
            data={tableData}
            // in option wee add options for table like sorting ....
            options={
              {
              sorting:true,
              search: true,
              pageSizeOptions:[5,10]
            }
            }
          />
        </Paper>
    </Grid>
  );
}
