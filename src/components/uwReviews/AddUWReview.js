import React, { useState } from "react";
import { connect } from "react-redux";
import Loading from "../utility/Loading";
import { addUWReview } from "../../store/uwReviews/actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  form: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}));

const AddUWReview = props => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");
  const [memberNumber, setMemberNumber] = useState("");
  const [addressID, setAddressID] = useState("");
  const [inspectionCompany, setInspectionCompany] = useState("");
  const [requestText, setRequestText] = useState("");

  var date = new Date();
  var newdate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(
      addUWReview({
        member_number: Number(memberNumber),
        address_id: Number(addressID.id),
        inspection_company: String(inspectionCompany),
        in_process: true,
        request_date: String(newdate),
        request_text: String(requestText),
        decision_text: ""
      })
    );
    setOpen(false);
  };

  return props.addresses && props.addresses[0] ? (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        New Underwriter Review
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Underwriting Review of ITV Inspection"}
        </DialogTitle>
        <DialogContent>
          <Grid className={classes.form}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid item>
                <TextField
                  style={{ width: "40%" }}
                  label="Member Number"
                  name="member_number"
                  value={memberNumber}
                  onChange={e => setMemberNumber(e.target.value)}
                  required
                />
                <TextField
                  style={{ marginLeft: "10%", width: "50%" }}
                  label="Inspection Company"
                  name="inspection_company"
                  value={inspectionCompany}
                  onChange={e => setInspectionCompany(e.target.value)}
                />

                <Autocomplete
                  label="Address"
                  options={props.addresses}
                  value={addressID}
                  name="address_id"
                  onChange={(event, newValue) => {
                    setAddressID(newValue);
                  }}
                  getOptionLabel={option =>
                    `${option.street_info ? option.street_info : "Choose"} ${
                      option.city ? option.city : "street"
                    } ${option.state ? option.state : "address"} ${
                      option.zipcode ? option.zipcode : "from list"
                    }`
                  }
                  renderInput={params => {
                    return <TextField {...params} label="Address Select" />;
                  }}
                />

                <TextField
                  multiline
                  style={{ width: "100%" }}
                  label="Request Text"
                  name="request_text"
                  value={requestText}
                  onChange={e => setRequestText(e.target.value)}
                  required
                />
              </Grid>
              <DialogActions>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  color="primary"
                  autoFocus
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
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

export default connect(mapStateToProps)(AddUWReview);
