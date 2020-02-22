import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Loading from "../utility/Loading";
import { connect } from "react-redux";

const Pending = props => {
  const address = props.addresses.filter(
    address => address.id === props.pending.address_id
  );
  console.log("ADDRESS: ", address);
  return address ? (
    <ExpansionPanel style={{ background: "primary" }}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
      >
        <Grid>
          <Typography>
            Member #: {props.pending ? props.pending.member_number : "loading"}
          </Typography>
          <Typography>
            Address: {props.addresses[0] ? address[0].street_info : "loading"}
          </Typography>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ) : (
    <div>
      <Loading />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    addresses: state.addresses.all
  };
}

export default connect(mapStateToProps)(Pending);
