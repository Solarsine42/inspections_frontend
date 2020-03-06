import React, { useState } from "react";
import { connect } from "react-redux";
import { editUWReview } from "../../store/uwReviews/actions";
import Loading from "../utility/Loading";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditUWReview = props => {
  const [open, setOpen] = React.useState(false);
  const [memberNumber, setMemberNumber] = useState(props.review.member_number);
  const [addressID, setAddressID] = useState(props.review.address_id);
  const [inspectionCompany, setInspectionCompany] = useState(
    props.review.inspection_company
  );
  const [inProcess, setInProcess] = useState(props.review.in_process);
  const [requestText, setRequestText] = useState(props.review.request_text);
  const [decisionText, setDecisionText] = useState(props.review.decision_text);
  console.log("UWAddress", addressID);

  const address = props.addresses.filter(
    address => address.id === props.review.address_id
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(
      editUWReview({
        id: Number(props.review.id),
        member_number: Number(memberNumber),
        address_id: Number(addressID.id ? addressID.id : addressID),
        inspection_company: String(inspectionCompany),
        in_process: Boolean(inProcess),
        request_date: String(props.review.request_date),
        request_text: String(requestText),
        decision_text: String(decisionText)
      })
    );
    setOpen(false);
  };

  return props.addresses && props.addresses[0] ? (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Edit ITV inspection review"}</DialogTitle>
        <DialogContent>
          <Grid container style={{ margin: "10px" }}>
            <Grid>
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <Grid container style={{ marginTop: "10px" }}>
                  <TextField
                    label="Member Number"
                    name="member_number"
                    value={memberNumber}
                    onChange={e => setMemberNumber(e.target.value)}
                    required
                  />

                  <TextField
                    required
                    style={{ marginLeft: "20px" }}
                    label="Inspection Company"
                    name="inspection_company"
                    value={inspectionCompany}
                    onChange={e => setInspectionCompany(e.target.value)}
                  />
                  <TextField
                    style={{ marginLeft: "20px" }}
                    label="Review in Process?"
                    name="in_process"
                    value={inProcess}
                    onChange={e => setInProcess(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    style={{ marginLeft: "1px" }}
                    options={props.addresses}
                    value={addressID}
                    onChange={(event, newValue) => {
                      setAddressID(newValue);
                    }}
                    getOptionLabel={option =>
                      `${
                        option.street_info
                          ? option.street_info
                          : address[0].street_info
                      }  ${option.city ? option.city : address[0].city}, ${
                        option.state ? option.state : address[0].state
                      }  ${
                        option.zipcode ? option.zipcode : address[0].zipcode
                      }`
                    }
                    renderInput={params => {
                      return <TextField {...params} label="Address Select" />;
                    }}
                  />
                </Grid>
                <Grid container>
                  <TextField
                    style={{ width: "100%" }}
                    multiline
                    label="Request Notes"
                    name="request_text"
                    value={requestText}
                    onChange={e => setRequestText(e.target.value)}
                    required
                  />
                </Grid>
                <Grid container>
                  <TextField
                    style={{ width: "100%" }}
                    multiline
                    label="Decision Notes"
                    name="decision_text"
                    value={decisionText}
                    onChange={e => setDecisionText(e.target.value)}
                    required
                  />
                </Grid>
              </form>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : (
    <Loading />
  );
};

function mapStateToProps(state) {
  return {
    uwReviews: state.uwReviews.all,
    addresses: state.addresses.all
  };
}

export default connect(mapStateToProps)(EditUWReview);
