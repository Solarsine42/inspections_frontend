import React, { useState } from "react";
import { connect } from "react-redux";
import { editPending } from "../../store/pending/actions";
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
  const [contactPhone, setContactPhone] = useState(props.pending.contact_info);
  const [specInst, setSpecInst] = useState(props.pending.special_instructions);
  console.log(props.special_instructions);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              label="Contact Phone"
              helperText="(XXX) XXX-XXXX"
              name="contact_info"
              value={contactPhone}
              onChange={e => setContactPhone(e.target.value)}
              required
            />
            <TextField
              label="Special Instructions"
              name="special_instructions"
              multiline
              value={specInst}
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
                editPending(props.id, {
                  contact_info: contactPhone,
                  special_instructions: specInst
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
    pendings: state.pending.all
  };
}

export default connect(mapStateToProps)(EditPending);
