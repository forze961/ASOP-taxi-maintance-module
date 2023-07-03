// @flow strict
// eslint-disable-next-line import/no-unresolved
import React, { PureComponent } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import clsx from "clsx";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";

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
  nestedActive: {
    padding: "8px 26px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
  },
  nested: {
    padding: "8px 26px",
    backgroundColor: "transparent",
    borderRadius: "10px",
  },
  nestedSub: {
    padding: "8px 0px 8px 40px",
    backgroundColor: "transparent",
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

// data
const itemsMenu = [
  {
    id: 1,
    name: "Розклад",
    url: "/schedule",
    img: "clip.svg",
  },
  {
    id: 2,
    name: "Перевізники",
    url: "/schedule",
    img: "carriers.svg",
  },
  {
    id: 3,
    name: "Рухомі одиниці",
    url: "/schedule",
    img: "desktop.svg",
  },
  {
    id: 4,
    name: "Водії",
    url: "/schedule",
    img: "users.svg",
  },
  {
    id: 7,
    name: "Формуляри",
    url: "/schedule",
    img: "formular.svg",
  },
  {
    id: 5,
    name: "Маршрути",
    url: "/schedule",
    img: "tarify.svg",
  },
  {
    id: 6,
    name: "Звіти",
    url: "/schedule",
    img: "documentText.svg",
  },
  {
    id: 8,
    name: "Зупинки",
    url: "/schedule",
    img: "locationMarker.svg",
  },
  {
    id: 9,
    name: "Тижневий календар",
    url: "/schedule",
    img: "calendar.svg",
  },
  {
    id: 10,
    name: "Способи оплати проїзду",
    url: "/schedule",
    img: "payments.svg",
  },
  {
    id: 11,
    name: "Вартість проїзду",
    url: "/schedule",
    img: "price.svg",
  },
  {
    id: 12,
    name: "Рейси маршрутів",
    url: "/schedule",
    img: "tablerRoute.svg",
  },
  {
    id: 13,
    name: "Наряди",
    url: "/schedule",
    img: "formular.svg",
  },
  {
    id: 14,
    name: "Довідники",
    url: "/directory",
    img: "directory.svg",
    subMenu: [
      { id: 16, name: "Перевізни", url: "/schedule", img: "carriers.svg" },
      { id: 17, name: "Перевізниr", url: "/schedule", img: "carriers.svg" },
    ],
  },
];

class SideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 1,
      openTooltipId: false,
    };
  }

  menuContent = () => {
    const { classes, open, onChoice } = this.props;

    // function witch add item active and dis-active effect
    const selectTab = (item) => {
      this.setState({ isSelected: item.id, openTooltipId: false});
      return onChoice(item.id);
    };

    // function witch open and close submenu
    const handleClick = (item) => {
      this.setState((prevState) => ({
        isSelected: item.id,
        openTooltipId: !prevState.openTooltipId,
      }));
      return onChoice(item.id);
    };


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
                        <ListItemIcon>
                          <img src={`/images/menu/${item.img}`} alt={item.id} />
                        </ListItemIcon>
                      </Tooltip>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  )}
                  {item.subMenu && (
                    <div>
                      <ListItem
                        button
                        onClick={() => handleClick(item)}
                        key={item.id}
                        className={item.id === this.state.isSelected
                          ? classes.nestedActive
                          : classes.nested}
                      >
                        <ListItemIcon>
                          <img src={`/images/menu/${item.img}`} alt={item.id} />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                        {this.state.openTooltipId ? (
                          <ExpandMore />
                        ) : (
                          <ExpandLess />
                        )}
                      </ListItem>
                      {item.subMenu.map((subItem) => (
                        <>
                          <Collapse
                            in={this.state.openTooltipId}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <ListItem button className={classes.nestedSub}>
                                <ListItemIcon>
                                  <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary={subItem.name} />
                              </ListItem>
                            </List>
                          </Collapse>
                        </>
                      ))}
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
