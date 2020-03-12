import React, { useState } from "react";
import { connect } from "react-redux";
import { editArchive } from "../../store/archived/actions";
import Loading from "../utility/Loading";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
  const [document, setDocument] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [memberNumber, setMemberNumber] = useState("");
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return props.addresses && props.addresses[0] ? (
    <div>
      <Button
        color="primary"
        size="small"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
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
                  value={document ? document : props.archive.document}
                  onChange={e => setDocument(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "45%" }}
                  label="Inspection Date"
                  name="inspection_date"
                  value={
                    inspectionDate
                      ? inspectionDate
                      : props.archive.inspection_date
                  }
                  onChange={e => setInspectionDate(e.target.value)}
                />

                <TextField
                  style={{ width: "45%", marginLeft: "10%" }}
                  label="Member Number"
                  name="member_number"
                  value={
                    memberNumber ? memberNumber : props.archive.member_number
                  }
                  onChange={e => setMemberNumber(e.target.value)}
                  required
                />
              </Grid>
            </form>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.dispatch(
                editArchive({
                  id: Number(props.archive.id),
                  document: String(
                    "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                  ),
                  inspection_date: String(
                    inspectionDate
                      ? inspectionDate
                      : props.archive.inspection_date
                  ),
                  member_number: Number(
                    memberNumber ? memberNumber : props.archive.member_number
                  ),
                  address_id: String(props.archive.address_id)
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
    archives: state.archived.all,
    addresses: state.addresses.all
  };
}

export default connect(mapStateToProps)(EditArchive);
