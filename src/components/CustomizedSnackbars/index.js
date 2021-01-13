import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles  from './styles';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CustomizedSnackbars({pIsOpen, pType, pMesssage, onClose}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(pIsOpen);
  const [type, setType] = React.useState(pType);
  const [message, setMessage] = React.useState(pMesssage);

  React.useEffect(()=>{
    setOpen(pIsOpen);
    setType(pType);
    setMessage(pMesssage);
  }, [pIsOpen, pType, pMesssage])

  const handleClose = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }
    onClose();
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
