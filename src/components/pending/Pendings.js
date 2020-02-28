import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Pending from "./Pending";
import AddPending from "./AddPending";

const useStyles = makeStyles();

const Pendings = props => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const pendingInspections = props.pendings
    .filter(inspection => String(inspection.member_number).includes(search))
    .map((inspection, i) => <Pending key={i} pending={inspection} />);

  return (
    <div style={{ marginLeft: "5%" }}>
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
      <AddPending />
      <br />
      <div>{pendingInspections}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    pendings: state.pending.all
  };
}

export default connect(mapStateToProps)(Pendings);
