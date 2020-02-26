import React, { useState } from "react";
import { connect } from "react-redux";
import Archive from "./Archive";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

const Archives = props => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const archivesList = props.archives
    .filter(archive => String(archive.member_number).includes(search))
    .map((archive, i) => <Archive key={i} archive={archive} />);

  return (
    <div className={classes.root}>
      <div style={{ display: "inline-block" }}>
        <div>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            name="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          >
            <TextField label="Member Number" />
          </form>
        </div>
        <div>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <br />
      <div>{archivesList}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    archives: state.archived.all
  };
}

export default connect(mapStateToProps)(Archives);
