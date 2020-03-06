import React from "react";
import { connect } from "react-redux";
import Archive from "./Archive";
import { makeStyles } from "@material-ui/core/styles";
import AddArchive from "./AddArchive";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: "5%"
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
  const archivesList = props.archives
    .filter(archive => String(archive.member_number).includes(props.mbrSearch))
    .map((archive, i) => (
      <LazyLoad key={i} height={50}>
        <Archive key={i} archive={archive} />
      </LazyLoad>
    ));

  return (
    <div className={classes.root}>
      <br />
      <AddArchive />
      <br />
      <div>{archivesList}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    archives: state.archived.all,
    mbrSearch: state.archived.searchArchivesFromNav
  };
}

export default connect(mapStateToProps)(Archives);
