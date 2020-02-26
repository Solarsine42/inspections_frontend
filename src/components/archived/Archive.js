import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../utility/Loading";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-block",
    flexWrap: "wrap",
    justifyContent: "wrap-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

const Archive = props => {
  const classes = useStyles();
  const address = props.addresses.filter(
    address => address.id === props.archive.address_id
  );

  return props.addresses ? (
    <div className={classes.root}>
      <GridList style={{ marginLeft: "20px" }}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">
            {props.archive.member_number}
          </ListSubheader>
        </GridListTile>
        <GridListTile>
          <img src={props.archive.document} />
          <GridListTileBar
            title={address[0] ? address[0].street_info : "Loading"}
            subtitle={props.archive.inspection_date}
          />
        </GridListTile>
        )}
      </GridList>
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
