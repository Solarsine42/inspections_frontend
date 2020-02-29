import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Loading from "../utility/Loading";
import DeletePending from "./DeletePending";
import EditPending from "./EditPending";
import { connect } from "react-redux";

const Pending = props => {
  const address = props.addresses.filter(
    address => address.id === props.pending.address_id
  );

  const contactInfo =
    props.pending.contact_info.slice(0, 9) +
    "-" +
    props.pending.contact_info.slice(9, 14);

  return address ? (
    <ExpansionPanel
      style={{ background: "primary", width: "80%", marginLeft: "10%" }}
    >
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
      <div>
        <ExpansionPanelDetails>
          <span>
            <Typography>
              Inspector Assigned:{" "}
              {props.pending.inspector_id ? props.pending.inspector_id : "None"}
            </Typography>
          </span>
          <span style={{ marginLeft: "30px" }}>
            <Typography>Contact Info: {contactInfo}</Typography>
          </span>
        </ExpansionPanelDetails>
      </div>
      <ExpansionPanelDetails>
        <Typography>
          Special Instructions: {props.pending.special_instructions}
        </Typography>
        <DeletePending id={props.pending.id} />
        <EditPending id={props.pending.id} pending={props.pending} />
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
