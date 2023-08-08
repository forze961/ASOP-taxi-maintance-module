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
  wrapper: {
    margin: "30px",
  },
}));

const Role = (props) => {
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
  const [tableData, setTableData] = useState([
    {
      id: "1",
      name: "Tomak",
      description: "lorem",
      rights: "see",
      permission: [
        {
          page: "Довідник",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
      ],
    },
    {
      id: "2",
      name: "Nazik",
      description: "lorem",
      rights: "see",
      permission: [
        {
          page: "Довідник",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
      ],
    },
    {
      id: "3",
      name: "Petro",
      description: "lorem",
      rights: "see",
      permission: [
        {
          page: "Довідник",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Перевізники",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Календар",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Рухомі склади",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Водії",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Вартість проїзду",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Розклад руху",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Маршрути",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Контральна точка",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Випуски",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Рейси маршрутів",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Наряд",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Формуляри",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "звіти",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
        {
          page: "Aдміністрування",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },

      ],
    },
    {
      id: "4",
      name: "Oleg",
      description: "lorem",
      rights: "see",
      permission: [
        {
          page: "Довідник",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
      ],
    },
    {
      id: "5",
      name: "Saha",
      description: "lorem",
      rights: "see",
      permission: [
        {
          page: "Довідник",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
      ],
    },
    {
      id: "6",
      name: "Nazik",
      description: "lorem",
      rights: "see",
      permission: [
        {
          page: "Довідник",
          reade: false,
          create: true,
          update: false,
          delete: true,
          token: false,
        },
      ],
    },
  ]);

  const columns = [
    {
      title: "Role id",
      field: "id",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    {
      title: "Role name",
      field: "name",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    {
      title: "Role description",
      field: "description",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    {
      title: "Role Rights",
      field: "Rights",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
  ];

  const subColumns = [
    {
      title: "Page",
      field: "page",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    {
      title: "Read",
      field: "reade",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    { 
      title: "Create",
      field: "create",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
    },
    { 
      title: "Update",
      field: "update",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
     },
    { 
      title: "Delete",
      field: "delete",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
     },
    { 
      title: "Access by API token",
      field: "token",
      align: "left",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
     },
  ];

  // JSX рендеринг
  return (
    <Paper className={classes.paper}>
      <h4 className={classes.title}>Ролі</h4>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        // data
        data={tableData}
        title=""
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          pageSizeOptions: [5, 10],
          // mod pagination
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { backgroundColor: "#F0F0F0" } : null,
          headerStyle: { backgroundColor: "#FFFBF4" },
        }}
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
        detailPanel={(rowData) => {
          return (
            <div className={classes.wrapper}>
              <h4 className={classes.title}>
                User {rowData.name} with id: {rowData.id}
              </h4>
              <MaterialTable
                icons={tableIcons}
                title=""
                columns={subColumns}
                data={rowData?.permission}
                options={{
                  pageSizeOptions: false,
                  showFirstLastPageButtons: false,
                }}
              />
            </div>
          );
        }}
      />
    </Paper>
  );
};

export default Role;
