// @flow strict
// eslint-disable-next-line import/no-unresolved
import React, { PureComponent } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import clsx from "clsx";
// components withc we use for sidebar
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Collapse from "@material-ui/core/Collapse";
// icons for nav menu
// https://v4.mui.com/components/material-icons/#api
// розклад
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
// перевізник
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
// оплата
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
// водії
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
// calendar
import DateRangeIcon from "@material-ui/icons/DateRange";
// склади
import ApartmentIcon from "@material-ui/icons/Apartment";
// довідник
import ChromeReaderModeOutlinedIcon from "@material-ui/icons/ChromeReaderModeOutlined";
// ролі
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
// ?
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
// адмінустровання
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
// звіти
import ContactMailOutlinedIcon from "@material-ui/icons/ContactMailOutlined";
// контроль точка
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
// випуски
import RecordVoiceOverOutlinedIcon from "@material-ui/icons/RecordVoiceOverOutlined";
// маргшрути
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
//рейси
import RvHookupOutlinedIcon from "@material-ui/icons/RvHookupOutlined";
// arrow
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const drawerWidth = 340;

// styles
const styles = (theme) => ({
  container: {
    width: 330,
  },
  list: {
    [theme.breakpoints.up("xs")]: {
      "& .MuiListItem-root": {
        borderBottom: "1px solid #eef4f8",
      },
    },
  },
  menuLink: {
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: "16px",
    textDecoration: "none",
    color: "#ED9137",
    fontColor: "#FEFEFE",
    
  },
  icon:{
    minWidth: "47px",
  },
  nested: {
    padding: "8px 26px",
    backgroundColor: "transparent",
    borderRadius: "10px",
  },
  nestedSub: {
    padding: "8px 26px 8px 30px",
    backgroundColor: "transparent",
    borderRadius: "10px",
  },
  nestedDoubleSub: {
    padding: "8px 26px 8px 40px",
    backgroundColor: "transparent",
    borderRadius: "10px",
  },
  nestedTripleSubMenu: {
    padding: "8px 0px 8px 50px",
    backgroundColor: "transparent",
    borderRadius: "10px",
  },
  nestedActive: {
    padding: "8px 26px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
  },
  nestedSubActive: {
    padding: "8px 26px 8px 30px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
  },
  nestedDoubleSubActive: {
    padding: "8px 26px 8px 40px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
  },
  nestedTripleSubMenuActive: {
    padding: "8px 0px 8px 50px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
  },
  drawer: {
    marginLeft: "5px",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    marginLeft: "5px",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
  drawerClose: {
    marginLeft: "5px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "red",
  },
  drawerContainer: {
    overflow: "none",
    backgroundColor: "#FEFEFE",
  },
});
// old data
// const itemsMenu =[
//     {
//     id: 1,
//     name: "Розклад",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 2,
//     name: "Перевізники",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 3,
//     name: "Рухомі одиниці",
//     url: "/schedule",

//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 4,
//     name: "Водії",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 5,
//     name: "Формуляри",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 6,
//     name: "Маршрути",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 7,
//     name: "Звіти",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 8,
//     name: "Зупинки",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 9,
//     name: "Тижневий календар",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 10,
//     name: "Способи оплати проїзду",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id:11,
//     name: "Вартість проїзду",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 12,
//     name: "Рейси маршрутів",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },
//   {
//     id: 13,
//     name: "Наряди",
//     url: "/schedule",
//     img: (
//       <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
//     ),
//   },

// ]
// data
const itemsMenu = [
  {
    id: 1,
    name: "Довідники",
    url: "/schedule",
    img: (
      <ChromeReaderModeOutlinedIcon
        style={{ color: "#111827" }}
        fontSize="medium"
      />
    ),
    subMenu: [
      // 1 -item subMenu
      {
        id: 1,
        name: "Перевізники",
        url: "/schedule",
        img: <LocalShippingOutlinedIcon fontSize="small" />,
      },
      // 2 -item subMenu
      {
        id: 2,
        name: "Календар",
        url: "/schedule",
        img: <DateRangeIcon fontSize="small" />,
      },
      // 3-item subMenu
      {
        id: 3,
        name: "Рухомі склади",
        url: "/schedule",
        img: <ApartmentIcon fontSize="small" />,
      },
      // 4-item subMenu
      {
        id: 4,
        name: "Водії",
        url: "/schedule",
        img: <FaceRoundedIcon fontSize="small" />,
      },
      // 5-item subMenu
      {
        id: 5,
        name: "Вaртість проїзду",
        url: "/schedule",
        img: <AttachMoneyRoundedIcon fontSize="small" />,
      },
    ],
  },
  {
    id: 6,
    name: "Розклад Руху",
    url: "/schedule",
    img: (
      <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
    ),
    subMenu: [

      {
        id: 7,
        name: "Маршрути",
        url: "/schedule",
        img: <MapOutlinedIcon fontSize="small" />,
        doubleSubMenu: [
          {
            id: 8,
            name: "Контрольна точка",
            url: "/schedule",
            img: (
              <LocationOnOutlinedIcon
                style={{ color: "#999797" }}
                fontSize="small"
              />
            ),
          },
          {
            id: 100,
            name: "Випуски",
            url: "/schedule",
            img: (
              <RecordVoiceOverOutlinedIcon
                style={{ color: "#999797" }}
                fontSize="small"
              />
            ),
            tripleSubMenu: [
              {
                id: 10,
                name: "Рейси",
                url: "/schedule",
                img: <RvHookupOutlinedIcon fontSize="small" style={{ color: "#ada8a8" }} />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Наряд",
    url: "/schedule",
    img: (
      <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
    ),
  },
  {
    id: 12,
    name: "Формуляри",
    url: "/schedule",
    img: (
      <AssignmentOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
    ),
  },

  {
    id: 6,
    name: "Звіти",
    url: "/schedule",
    img: (
      <ContactMailOutlinedIcon style={{ color: "#111827" }} fontSize="medium" />
    ),
  },

  {
    id: 22,
    name: "Адміністрування",
    url: "/schedule",
    img: (
      <PersonOutlineOutlinedIcon
        style={{ color: "#111827" }}
        fontSize="medium"
      />
    ),

    subMenu: [
      {
        id: 23,
        name: "Ролі Route taxi",
        url: "/schedule",
        img: <SupervisorAccountOutlinedIcon fontSize="small" />,
      },

      {
        id: 24,
        name: "Ще не знають",
        url: "/schedule",
        img: <HelpOutlineOutlinedIcon fontSize="small" />,
      },
    ],
  },
];

class SideMenu extends PureComponent {
  // Local component state
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 1,
      // local state for menu item witch have sub menu (open-close)
      openTooltipId: null,
      // local state for menu item witch have doubleSub menu (open-close)
      openDoubleSubMenu: null,
      // local state for  menu item witch have tripleSub menu (open-close)
      openTripleSubMenu: null,
    };
  }

  menuContent = () => {
    const { classes, open, onChoice } = this.props;

    // function witch add item active and dis-active effect
    const selectTab = (item) => {
      this.setState({
        isSelected: item.id,
        openTooltipId: false,
        openDoubleSubMenu: false,
        openTripleSubMenu: false,
      });
      return onChoice(item.id);
    };

    // function witch open and close submenu
    const handleClick = (item) => {
      this.setState((prevState) => ({
        isSelected: item.id,
        openTooltipId: prevState.openTooltipId === item.id ? null : item.id,
        openDoubleSubMenu: false,
        openTripleSubMenu: false,
      }));
      return onChoice(item.id);
    };

    // function handleClick for submenu
    const handleClickSubmenu = (item) => {
      this.setState({
        isSelected: item.id,
      });
      return onChoice(item.id);
    };

    //
    const handleClickDoubleSubMenu = (item) => {
      this.setState((prevState) => ({
        isSelected: item.id,
        openDoubleSubMenu:
          prevState.openDoubleSubMenu === item.id ? null : item.id,
      }));
      return onChoice(item.id);
    };
    //
    const handleClickTripleSubMenu = (item) => {
      this.setState((prevState) => ({
        isSelected: item.id,
        openTripleSubMenu:
          prevState.openTripleSubMenu === item.id ? null : item.id,
      }));
      return onChoice(item.id);
    };
    // drawer it's wrapper for side menu
    return (
      <Drawer
        variant="permanent"
        BackdropProps={{ invisible: true }}
        anchor="left"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} />
        <div className={classes.drawerContainer}>
          <Box className={classes.container}>
            <List component="nav" disablePadding>
              {itemsMenu.map((item) => (
                <React.Fragment key={item.id}>
                  {/* condition rendering if ListItem have one lvl menu */}
                  {!item.subMenu && (
                    <ListItem
                      button
                      key={item.name}
                      // in this line we add condition rendering for styles active and default
                      className={
                        item.id === this.state.isSelected
                          ? classes.nestedActive
                          : classes.nested
                      }
                      onClick={() => selectTab(item)}
                    >
                      <Tooltip title={item.name} aria-label="add">
                        <ListItemIcon className={classes.icon}>{item.img}</ListItemIcon>
                      </Tooltip>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  )}
                  {/* condition rendering if ListItem have submenu then he rendering */}
                  {item.subMenu && (
                    <div>
                      <ListItem
                        button
                        onClick={() => handleClick(item)}
                        key={item.id}
                        className={
                          item.id === this.state.isSelected
                            ? classes.nestedActive
                            : classes.nested
                        }
                      >
                        <Tooltip title={item.name} aria-label="add">
                          <ListItemIcon className={classes.icon}>{item.img}</ListItemIcon>
                        </Tooltip>
                        <ListItemText primary={item.name} />
                        {this.state.openTooltipId === item.id ? (
                          <ExpandMore />
                        ) : (
                          <ExpandLess />
                        )}
                      </ListItem>
                      <Collapse
                        in={this.state.openTooltipId === item.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.subMenu.map((subItem) => (
                            <div>
                              {!subItem.doubleSubMenu && (
                                <ListItem
                                  button
                                  className={
                                    // Apply active class to the clicked submenu ListItem
                                    subItem.id === this.state.isSelected
                                      ? classes.nestedSubActive
                                      : classes.nestedSub
                                  }
                                  key={subItem.id}
                                  onClick={() => handleClickSubmenu(subItem)}
                                >
                                  <Tooltip
                                    title={subItem.name}
                                    aria-label="add"
                                  >
                                    <ListItemIcon className={classes.icon} >{subItem.img}</ListItemIcon>
                                  </Tooltip>
                                  <ListItemText primary={subItem.name} />
                                </ListItem>
                              )}
                              {subItem.doubleSubMenu && (
                                <>
                                  <ListItem
                                    button
                                    className={
                                      // Apply active class to the clicked submenu ListItem
                                      subItem.id === this.state.isSelected
                                        ? classes.nestedSubActive
                                        : classes.nestedSub
                                    }
                                    key={subItem.id}
                                    onClick={() =>
                                      handleClickDoubleSubMenu(subItem)
                                    }
                                  >
                                    <Tooltip
                                      title={subItem.name}
                                      aria-label="add"
                                    >
                                      <ListItemIcon className={classes.icon} >{subItem.img}</ListItemIcon>
                                    </Tooltip>
                                    <ListItemText primary={subItem.name} />
                                    {this.state.openDoubleSubMenu ===
                                    subItem.id ? (
                                      <ExpandMore />
                                    ) : (
                                      <ExpandLess />
                                    )}
                                  </ListItem>
                                  <Collapse
                                    in={
                                      this.state.openDoubleSubMenu ===
                                      subItem.id
                                    }
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    {subItem.doubleSubMenu.map(
                                      (doubleSubMenu) => (
                                        // {console.log(doubleSubMenu.tripleSubMenu)}
                                        <div>
                                          {!doubleSubMenu.tripleSubMenu && (
                                            <List
                                              component="div"
                                              disablePadding
                                            >
                                              <ListItem
                                                button
                                                aria-label="add"
                                                className={
                                                  doubleSubMenu.id ===
                                                  this.state.isSelected
                                                    ? classes.nestedDoubleSubActive
                                                    : classes.nestedDoubleSub
                                                }
                                                onClick={() =>
                                                  handleClickSubmenu(
                                                    doubleSubMenu
                                                  )
                                                }
                                              >
                                                <Tooltip
                                                  title={doubleSubMenu.name}
                                                  aria-label="add"
                                                >
                                                  <ListItemIcon>
                                                    {doubleSubMenu.img}
                                                  </ListItemIcon>
                                                </Tooltip>
                                                <ListItemText
                                                  primary={doubleSubMenu.name}
                                                />
                                              </ListItem>
                                            </List>
                                          )}
                                          {doubleSubMenu.tripleSubMenu && (
                                            <List
                                              component="div"
                                              disablePadding
                                            >
                                              <ListItem
                                                button
                                                aria-label="add"
                                                onClick={() =>
                                                  handleClickTripleSubMenu(
                                                    doubleSubMenu
                                                  )
                                                }
                                                className={
                                                  doubleSubMenu.id ===
                                                  this.state.isSelected
                                                    ? classes.nestedDoubleSubActive
                                                    : classes.nestedDoubleSub
                                                }
                                              >
                                                <Tooltip
                                                  title={doubleSubMenu.name}
                                                  aria-label="add"
                                                >
                                                  <ListItemIcon>
                                                    {doubleSubMenu.img}
                                                  </ListItemIcon>
                                                </Tooltip>
                                                <ListItemText
                                                  primary={doubleSubMenu.name}
                                                />
                                                {this.state
                                                  .openTripleSubMenu ===
                                                doubleSubMenu.id ? (
                                                  <ExpandMore />
                                                ) : (
                                                  <ExpandLess />
                                                )}
                                              </ListItem>
                                              <Collapse
                                                in={
                                                  this.state
                                                    .openTripleSubMenu ===
                                                  doubleSubMenu.id
                                                }
                                                timeout="auto"
                                                unmountOnExit
                                              >
                                                {doubleSubMenu.tripleSubMenu.map(
                                                  (tripleSubMenu) => {
                                                    return (
                                                      <List
                                                        component="div"
                                                        disablePadding
                                                      >
                                                        <ListItem
                                                          button
                                                          className={
                                                            tripleSubMenu.id ===
                                                            this.state
                                                              .isSelected
                                                              ? classes.nestedTripleSubMenuActive
                                                              : classes.nestedTripleSubMenu
                                                          }
                                                          onClick={() =>
                                                            handleClickSubmenu(
                                                              tripleSubMenu
                                                            )
                                                          }
                                                        >
                                                          <ListItemIcon>
                                                            {tripleSubMenu.img}
                                                          </ListItemIcon>
                                                          <ListItemText
                                                            primary={
                                                              tripleSubMenu.name
                                                            }
                                                          />
                                                        </ListItem>
                                                      </List>
                                                    );
                                                  }
                                                )}
                                              </Collapse>
                                            </List>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </Collapse>
                                </>
                              )}
                            </div>
                          ))}
                        </List>
                      </Collapse>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </div>
      </Drawer>
    );
  };

  render() {
    const { open, classes } = this.props;
    return (
      <Box className={classes.container} data-cy="menu">
        <Drawer variant="permanent" open>
          {this.menuContent()}
        </Drawer>
      </Box>
    );
  }
}

const SideMenuWithStyles = withStyles(styles)(SideMenu);

export default SideMenuWithStyles;
