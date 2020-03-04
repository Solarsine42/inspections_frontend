import React, { useState } from "react";
import { connect } from "react-redux";
import { editArchive } from "../../store/archived/actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

const EditArchive = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [document, setDocument] = useState(props.archive.document);
  const [inspectionDate, setInspectionDate] = useState(
    props.archive.inspection_date
  );
  const [memberNumber, setMemberNumber] = useState(props.archive.member_number);
  const [addressID, setAddressID] = useState(props.archive.address_id);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const address = props.addresses.filter(
    address => address.id === props.archive.address_id
  );

  return (
    <div>
      <IconButton aria-label="edit" color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Edit Archived Inspection"}</DialogTitle>
        <DialogContent>
          <Grid className={classes.form}>
            <form noValidate autoComplete="off">
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
                  {/* <TextField
                    style={{ width: "100%" }}
                    label="Address"
                    name="address_id"
                    value={addressID}
                    onChange={e => setAddressID(e.target.value)}
                    required
                  /> */}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
          <Button
            onClick={() => {
              props.dispatch(
                editArchive({
                  id: props.archive.id,
                  document: document,
                  inspection_date: inspectionDate,
                  member_number: memberNumber,
                  address_id: addressID.id
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
    archives: state.archived.all,
    addresses: state.addresses.all
  };
}

export default connect(mapStateToProps)(EditArchive);
