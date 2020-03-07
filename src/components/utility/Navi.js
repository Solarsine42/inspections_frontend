import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { searchPending } from "../../store/pending/actions";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

const Navi = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = React.useState({ left: false });
  const preventDefault = event => event.preventDefault();

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
    console.log("CH VAL:", e.target.value);
    props.searchPending(e.target.value);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <Typography variant="h6">KD References</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRightIcon />
          </ListItemIcon>
          <Link href="#" color="inherit" onClick={preventDefault}>
            <ListItemText>ITV Deviation</ListItemText>
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRightIcon />
          </ListItemIcon>
          <Link href="#" color="inherit" onClick={preventDefault}>
            <ListItemText>Determining ITV</ListItemText>
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRightIcon />
          </ListItemIcon>
          <Link href="#" color="inherit" onClick={preventDefault}>
            <ListItemText>Dwelling Types</ListItemText>
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRightIcon />
          </ListItemIcon>
          <Link href="#" color="inherit" onClick={preventDefault}>
            <ListItemText>XACTWARE Home Characteristics</ListItemText>
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRightIcon />
          </ListItemIcon>
          <Link href="#" color="inherit" onClick={preventDefault}>
            <ListItemText>When to Submit a Request to UW</ListItemText>
          </Link>
        </ListItem>
        <Divider />
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <HelpOutlineIcon />
          </ListItemIcon>
          <Link href="#" color="inherit" onClick={preventDefault}>
            <ListItemText>Submit a Feature Request</ListItemText>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#12395B" }}>
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{ color: "#FAC705" }}
            className={classes.title}
          >
            USAA ITV INSPECTION HUB
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              name="mbrNumber"
              onChange={handleChange}
              placeholder="Member #"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <Paper
          className={classes.root}
          style={{ width: "90%", marginLeft: "5%" }}
        >
          <Tabs centered>
            <Link to="/pending">
              <Tab style={{ color: "#12395B" }} label="Pending Inspections" />
            </Link>
            <Link to="/archived">
              <Tab style={{ color: "#12395B" }} label="Inspection Archive" />
            </Link>
            <Link to="/uwreviews">
              <Tab style={{ color: "#12395B" }} label="Underwriter Review" />
            </Link>
          </Tabs>
        </Paper>
      </div>
    </div>
  );
};

export default connect(null, { searchPending })(Navi);
