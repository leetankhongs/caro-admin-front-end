import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide({isOpen, title, description, onAgreeDialog, onCloseDialog}) {
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])

  const handleClose = () => {
    onCloseDialog();
    setOpen(false);
  };

  const handleAgree = ()=>{
    onCloseDialog();
    onAgreeDialog();
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
