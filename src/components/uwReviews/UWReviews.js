import React, { useState } from "react";
import { connect } from "react-redux";
import UWReview from "./UWReview";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AddUWReview from "./AddUWReview";
const useStyles = makeStyles({});

const UWReviews = props => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const uwReviewsList = props.archives
    .filter(archive => String(archive.member_number).includes(search))
    .map((review, i) => <UWReview key={i} review={review} />);

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
      <AddUWReview />
      <br />
      <div>{uwReviewsList}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    archives: state.uwReviews.all
  };
}

export default connect(mapStateToProps)(UWReviews);
