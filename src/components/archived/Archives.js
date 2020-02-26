import React, { useState } from "react";
import { connect } from "react-redux";
import Archive from "./Archive";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({});

const Archives = props => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const archivesList = props.archives
    .filter(archive => String(archive.member_number).includes(search))
    .map((archive, i) => <Archive key={i} archive={archive} />);

  return (
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
