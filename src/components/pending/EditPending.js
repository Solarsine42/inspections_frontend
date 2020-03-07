import React, { useState } from "react";
import { connect } from "react-redux";
import { editPending } from "../../store/pending/actions";
import Loading from "../utility/Loading";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditPending = props => {
  const [open, setOpen] = React.useState(false);
  const [contactPhone, setContactPhone] = useState("");
  const [specInst, setSpecInst] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return props.addresses && props.addresses[0] ? (
    <div>
      <Button color="primary" variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Edit content of ITV inspection request"}</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              label="Contact Phone"
              helperText="(XXX) XXXXXXX"
              name="contact_info"
              value={contactPhone ? contactPhone : props.pending.contact_info}
              onChange={e => setContactPhone(e.target.value)}
              required
            />
            <TextField
              style={{ marginLeft: "20px" }}
              label="Special Instructions"
              name="special_instructions"
              multiline
              value={specInst ? specInst : props.pending.special_instructions}
              onChange={e => setSpecInst(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
          <Button
            onClick={() => {
              props.dispatch(
                editPending({
                  id: props.pending.id,
                  inspector_id: props.pending.inspector_id,
                  special_instructions: String(
                    specInst ? specInst : props.pending.special_instructions
                  ),
                  inspection_type: props.pending.inspection_type,
                  contact_info: String(
                    contactPhone ? contactPhone : props.pending.contact_info
                  ),
                  address_id: props.pending.address_id,
                  member_number: props.pending.member_number
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
  ) : (
    <Loading />
  );
};

function mapStateToProps(state) {
  return {
    pendings: state.pending.all,
    addresses: state.addresses.all
  };
}

export default connect(mapStateToProps)(EditPending);
