import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Pending from "./Pending";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const Pendings = props => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const pendingInspections = props.pendings
    .filter(inspection => String(inspection.member_number).includes(search))
    .map((inspection, i) => <Pending key={i} pending={inspection} />);

  return (
    <div className={classes.root}>
      <form
        style={{ marginLeft: "10%" }}
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
