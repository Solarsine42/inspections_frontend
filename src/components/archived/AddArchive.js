import React, { useState } from "react";
import { connect } from "react-redux";
import Loading from "../utility/Loading";
import { addArchive } from "../../store/archived/actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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

const AddArchive = props => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");
  const [document, setDocument] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [memberNumber, setMemberNumber] = useState("");
  const [addressID, setAddressID] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return props.addresses && props.addresses[0] ? (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Add Archive
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
          {"Add File to Archive"}
        </DialogTitle>
        <DialogContent>
          <Grid className={classes.form}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={() => {
                props.dispatch(
                  addArchive({
                    document: document,
                    inspection_date: inspectionDate,
                    member_number: memberNumber,
                    address_id: addressID.id
                  })
                );
                setOpen(false);
              }}
            >
              <Grid item>
                <TextField
                  style={{ width: "100%" }}
                  label="Document"
                  name="document"
                  value={document}
                  onChange={e => setDocument(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "45%" }}
                  label="Inspection Date"
                  name="inspection_date"
                  value={inspectionDate}
                  onChange={e => setInspectionDate(e.target.value)}
                />

                <TextField
                  style={{ width: "45%", marginLeft: "10%" }}
                  label="Member Number"
                  name="member_number"
                  value={memberNumber}
                  onChange={e => setMemberNumber(e.target.value)}
                  required
                />
                <Grid item>
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
                </Grid>
              </Grid>
              <DialogActions>
                <Button
                  type="submit"
                  onClick={handleClose}
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
    addresses: state.addresses.all
  };
}

export default connect(mapStateToProps)(AddArchive);
