import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },

  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  container: {
    maxHeight: 600,
  },
  iconButton:{
    backgroundColor: 'blue',
    '&:hover': {
      backgroundColor: 'red',
    },
    margin:theme.spacing(1),
  },
}));

export default useStyles;