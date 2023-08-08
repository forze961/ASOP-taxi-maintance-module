import React, { useState, useEffect } from "react";
// component
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import { lightBlue } from "@mui/material/colors";
import Checkbox from "@material-ui/core/Checkbox";
// Icons
// https://v4.mui.com/components/material-icons/#api
import AddBox from "@material-ui/icons/AddBox";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
// --- for rendering icon and rendering styles
import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { lightBlue300 } from "material-ui/styles/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
  },
  title: {
    marginBottom: "10px",
  },
}));

const Users = (props) => {
  const [tableData, setTableData] = useState([
    {
      email: "1-mockData@mail.com",
      name: "Ігор Васильович",
      password: "1cv8062cvcv3",
      carrier: "1",
      role: "Admin",
      active: true,
    },
    {
      email: "2-mockData@mail.com",
      name: "Ігор Васильович",
      password: "2cv8062cvcv3",
      carrier: "2",
      role: "User",
      active: false,
    },
    {
      email: "mockData@mail.com",
      name: "Ігор Васильович",
      password: "3cv8062cvcv3",
      carrier: "3",
      role: "USer",
      active: true,
    },
    {
      email: "mockData@mail.com",
      name: "Ігор Васильович",
      password: "4cv8062cvcv3",
      carrier: "4",
      role: "USer",
      active: false,
    },
    {
      email: "mockData@mail.com",
      name: "Ігор Васильович",
      password: "5cv8062cvcv3",
      carrier: "5",
      role: "Admin",
      active: true,
    },
    {
      email: "mockData@mail.com",
      name: "Ігор Васильович",
      password: "6cv8062cvcv3",
      carrier: "6",
      role: "User",
      active: false,
    },
    {
      email: "mockData@mail.com",
      name: "Ігор Васильович",
      password: "7cv8062cvcv3",
      carrier: "7",
      role: "User",
    },
    {
      email: "mockData@mail.com",
      name: "Ігор Васильович",
      password: "8cv8062cvcv3",
      carrier: "8",
      role: "Admin",
    },
  ]);
  const [filter, setFilter] = useState(false);

  const handleChange = () => {
    setFilter(!filter);
  };

  const columns = [
    {
      title: "Email",
      field: "email",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    {
      title: "User name",
      field: "name",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    // if yo want to disabled for sort and search same column
    // sorting: false, searchable: false
    {
      title: "Password",
      field: "password",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: true,
      searchable: true,
      defaultSort: "asc",
    },
    {
      title: "Carrier",
      field: "carrier",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: true,
      searchable: true,
    },
    {
      title: "Role",
      field: "role",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: true,
      searchable: true,
      defaultSort: "asc",
    },
    {
      title: "API token",
      field: "token",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: true,
      searchable: true,
      defaultSort: "asc",
    },
    {
      title: "is Active",
      field: "active",
      align: "left",
      emptyValue: () => <em>null</em>,
      sorting: true,
      searchable: true,
      defaultSort: "asc",
    },
  ];

  const classes = useStyles();
  const tableIcons = {
    Add: forwardRef((props, ref) => (
      <button className={classes.buttonAdd} ref={ref} {...props}>
        <AddCircleOutlineIcon />
        Додати перевізника
      </button>
    )),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  // JSX рендеринг
  return (
    <Paper className={classes.paper}>
      <h4 className={classes.title}>Користувачі</h4>

      <MaterialTable
        icons={tableIcons}
        title=""
        columns={columns}
        // data
        data={tableData}
        editable={{
          // Callback function to add a new row to the table
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updatedDAta = [...tableData];
              updatedDAta[oldRow.tableData.id] = newRow;
              setTableData(updatedDAta);
              setTimeout(() => resolve(), 500);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const updatedDAta = [...tableData];
              updatedDAta.splice(selectedRow.tableData.id, 1);

              console.log(selectedRow);
              setTimeout(() => resolve(), 1000);
            }),
        }}
        options={{
          filtering: filter,
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          pageSizeOptions: 10,
          // mod pagination
          paginationType: false,
          showFirstLastPageButtons: false,
          addRowPosition: "first",
          actionsColumnIndex: -1,

          rowStyle: (data, index) =>
            index % 2 === 0 ? { backgroundColor: "#F0F0F0" } : null,
          headerStyle: { backgroundColor: "#FFFBF4" },
        }}
        actions={[
          {
            icon: () => 
              <Checkbox
                checked={filter}
                onChange={handleChange}
                sx={{
                  color: lightBlue300,
                  "&.Mui-checked": {
                    color: lightBlue,
                  },
                }}
              />,
              tooltip: 'Filter',
              isFreeAction: true
          },
        ]}
      />
    </Paper>
  );
};

export default Users;
