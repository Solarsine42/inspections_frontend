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

import Grid from "@material-ui/core/Grid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditUWReview = props => {
  const [open, setOpen] = React.useState(false);
  const [memberNumber, setMemberNumber] = useState("");
  const [inspectionCompany, setInspectionCompany] = useState("");
  const [inProcess, setInProcess] = useState("");
  const [requestText, setRequestText] = useState("");
  const [decisionText, setDecisionText] = useState("");

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
        member_number: Number(
          memberNumber ? memberNumber : props.review.member_number
        ),
        address_id: Number(props.review.address_id),
        inspection_company: String(
          inspectionCompany
            ? inspectionCompany
            : props.review.inspection_company
        ),
        in_process: Boolean(inProcess ? inProcess : props.review.in_process),
        request_date: String(props.review.request_date),
        request_text: String(
          requestText ? requestText : props.review.request_text
        ),
        decision_text: String(
          decisionText ? decisionText : props.review.decision_text
        )
      })
    );
    setOpen(false);
  };

  return props.addresses && props.addresses[0] ? (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
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
                    value={
                      memberNumber ? memberNumber : props.review.member_number
                    }
                    onChange={e => setMemberNumber(e.target.value)}
                    required
                  />

                  <TextField
                    required
                    style={{ marginLeft: "20px" }}
                    label="Inspection Company"
                    name="inspection_company"
                    value={
                      inspectionCompany
                        ? inspectionCompany
                        : props.review.inspection_company
                    }
                    onChange={e => setInspectionCompany(e.target.value)}
                  />
                  <TextField
                    style={{ marginLeft: "20px" }}
                    label="Review in Process?"
                    name="in_process"
                    value={inProcess ? inProcess : props.review.in_process}
                    onChange={e => setInProcess(e.target.value)}
                    required
                  />
                </Grid>

                <Grid container>
                  <TextField
                    style={{ width: "100%" }}
                    multiline
                    label="Request Notes"
                    name="request_text"
                    value={
                      requestText ? requestText : props.review.request_text
                    }
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
                    value={
                      decisionText ? decisionText : props.review.decision_text
                    }
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
