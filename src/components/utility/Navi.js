import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navi = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/pending" className={classes.menuButton}>
              Pending Inspections
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/archives" className={classes.menuButton}>
              Inspection Archive
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/uwReview" className={classes.menuButton}>
              Underwriting Review
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect()(Navi);
