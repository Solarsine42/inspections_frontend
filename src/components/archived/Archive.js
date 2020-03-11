import React from "react";
import { connect } from "react-redux";
import DeleteArchive from "./DeleteArchive";
import EditArchive from "./EditArchive";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Loading from "../utility/Loading";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "inline-block"
  },
  paper: {
    padding: theme.spacing(2),
    margin: "18px",
    maxWidth: 350
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

const Archive = props => {
  const classes = useStyles();
  const address = props.addresses.filter(
    address => address.id === props.archive.address_id
  );

  return props.addresses ? (
    <div className={classes.root}>
      <Paper style={{ color: "#12395B" }} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                }
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {address[0] ? address[0].street_info : "Loading"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Member Number: {props.archive.member_number}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Inspection Date: {props.archive.inspection_date}
                </Typography>
              </Grid>
              <Grid item container>
                <EditArchive archive={props.archive} />
                <DeleteArchive id={props.archive.id} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  ) : (
    <Loading />
  );
};

function mapStateToProps(state) {
  return {
    addresses: state.addresses.all
  };
}

export default connect(mapStateToProps)(Archive);
