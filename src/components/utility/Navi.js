import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Navi = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>MSR</MenuItem>
            <MenuItem onClick={handleClose}>Underwriter</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            USAA INSPECTION HUB
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Paper
          className={classes.root}
          style={{ width: "90%", marginLeft: "5%" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="none"
            textColor="primary"
            centered
          >
            <Link to="/pending">
              <Tab label="Pending Inspections" />
            </Link>
            <Link to="/archived">
              <Tab label="Inspection Archive" />
            </Link>
            <Link to="/uwreviews">
              <Tab label="Underwriter Review" />
            </Link>
          </Tabs>
        </Paper>
      </div>
    </div>
  );
};

export default connect()(Navi);
