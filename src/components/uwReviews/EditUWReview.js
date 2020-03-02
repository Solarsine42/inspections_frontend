import React, { useState } from "react";
import { connect } from "react-redux";
import { editUWReview } from "../../store/uwReviews/actions";
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
  const [fullWidth, setFullWidth] = React.useState(true);
  const [memberNumber, setMemberNumber] = useState(props.review.member_number);
  const [address_id, setAddress_id] = useState(props.review.address_id);
  const [inspectionCompany, setInspectionCompany] = useState(
    props.review.inspection_company
  );
  const [inProcess, setInProcess] = useState(props.review.in_process);
  const [requestText, setRequestText] = useState(props.review.request_text);
  const [decisionText, setDecisionText] = useState(props.review.decision_text);
  const address = props.addresses.filter(
    address => address.id === props.review.address_id
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="edit" color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullWidth={fullWidth}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Edit ITV inspection review"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid>
              <form noValidate autoComplete="off">
                <Grid item xs={3}>
                  <TextField
                    label="Member Number"
                    name="member_number"
                    value={memberNumber}
                    onChange={e => setMemberNumber(e.target.value)}
                    required
                  />

                  <TextField
                    label="Inspection Comnpany"
                    name="inspection_company"
                    value={inspectionCompany}
                    onChange={e => setInspectionCompany(e.target.value)}
                  />
                  <TextField
                    label="Review Complete?"
                    name="in_process"
                    value={inProcess}
                    onChange={e => setInProcess(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    options={props.addresses}
                    value={address_id}
                    onChange={(event, newValue) => {
                      setAddress_id(newValue);
                    }}
                    getOptionLabel={option =>
                      `${option.street_info}
                 ${option.city}
                 ${option.state}
                 ${option.zipcode}`
                    }
                    renderInput={params => {
                      return <TextField {...params} label="Address Select" />;
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Request Notes"
                    name="request_text"
                    value={requestText}
                    onChange={e => setRequestText(e.target.value)}
                    required
                  />
                  <TextField
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
          <Button
            onClick={() => {
              props.dispatch(
                editUWReview({
                  id: props.review.id,
                  member_number: memberNumber,
                  address_id: address_id.id,
                  inspection_company: inspectionCompany,
                  in_process: inProcess,
                  request_date: props.review.request_date,
                  request_text: requestText,
                  decision_text: decisionText
                })
              );
              setOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    uwReviews: state.uwReviews.all,
    addresses: state.addresses.all
  };
}

export default connect(mapStateToProps)(EditUWReview);
