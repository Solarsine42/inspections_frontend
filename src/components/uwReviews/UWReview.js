import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Loading from "../utility/Loading";
import DeleteUWReview from "./DeleteUWReview";
import EditUWReview from "./EditUWReview";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    display: "inline-block",
    margin: "20px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const UWReview = props => {
  const classes = useStyles();
  const address = props.addresses.filter(
    address => address.id === props.review.address_id
  );

  return props.addresses ? (
    <Card className={classes.root}>
      <CardContent style={{ color: "#12395B" }}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Member: {props.review.member_number}
        </Typography>
        <Typography variant="h5" component="h2">
          {address[0] ? address[0].street_info : "Loading"}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Inspection Company: {props.review.inspection_company}
        </Typography>
        <Typography variant="body2" component="p">
          Requested: {props.review.request_date}
          <br />
          {props.review.in_process ? (
            <i>Currently in process</i>
          ) : (
            <i>Review Complete</i>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <EditUWReview review={props.review} />
        <DeleteUWReview id={props.review.id} />
      </CardActions>
    </Card>
  ) : (
    <Loading />
  );
};

function mapStateToProps(state) {
  return {
    addresses: state.addresses.all,
    uwReviews: state.uwReviews.all
  };
}

export default connect(mapStateToProps)(UWReview);
