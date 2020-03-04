import React, { useState } from "react";
import { addPending } from "../../store/pending/actions";
import Loading from "../utility/Loading";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "95%"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const AddPending = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [memberNumber, setMemberNumber] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [specInst, setSpecInst] = useState("");
  const [update, setUpdate] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(update + 1);
  };

  return props.addresses && props.addresses[0] ? (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        New Inspection
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>{"Order New Inspection"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={() => {
                props.dispatch(
                  addPending({
                    inspector_id: 0,
                    special_instructions: String(specInst),
                    inspection_type: "ITV",
                    contact_info: String(contactPhone),
                    address_id: Number(address.id),
                    member_number: Number(memberNumber)
                  })
                );
                handleClose();
              }}
            >
              <TextField
                label="Member Number"
                value={memberNumber}
                onChange={e => setMemberNumber(e.target.value)}
              />
              <Autocomplete
                options={props.addresses}
                value={address}
                onChange={(event, newValue) => {
                  setAddress(newValue);
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
                label="Contact Phone"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
              />
              <TextField
                multiline
                label="Special Instructions"
                value={specInst}
                onChange={e => setSpecInst(e.target.value)}
              />
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
          </DialogContentText>
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

export default connect(mapStateToProps)(AddPending);
