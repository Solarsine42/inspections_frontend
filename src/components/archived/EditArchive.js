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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditArchive = props => {
  const [open, setOpen] = React.useState(false);
  const [document, setDocument] = useState(props.archive.document);
  const [inspectionDate, setInspectionDate] = useState(
    props.archive.inspection_date
  );
  const [memberNumber, setMemberNumber] = useState(props.archive.member_number);
  const [addressID, setAddressID] = useState(props.archive.address_id);

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
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Edit content of ITV inspection request"}</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              label="Document"
              name="document"
              value={document}
              onChange={e => setDocument(e.target.value)}
              required
            />
            <TextField
              label="Inspection Date"
              name="inspection_date"
              value={inspectionDate}
              onChange={e => setInspectionDate(e.target.value)}
            />
            <TextField
              label="Member Number"
              name="member_number"
              value={memberNumber}
              onChange={e => setMemberNumber(e.target.value)}
              required
            />
            <TextField
              label="Address"
              name="address_id"
              value={addressID}
              onChange={e => setAddressID(e.target.value)}
              required
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
                editArchive({
                  id: props.archive.id,
                  document: document,
                  inspection_date: inspectionDate,
                  member_number: memberNumber,
                  address_id: addressID
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
    archives: state.archived.all
  };
}

export default connect(mapStateToProps)(EditArchive);
