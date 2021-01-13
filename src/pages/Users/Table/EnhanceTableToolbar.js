import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import classNames from "classnames";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  Toolbar,
  IconButton,
  InputBase,
} from "@material-ui/core";
import {
  Search as SearchIcon,
} from "@material-ui/icons";
import Grid from '@material-ui/core/Grid';

import AlertDialogSlide from '../../../components/AlertDialogSlide/index';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark,
      },
  title: {
    flex: '1 1 100%',
    marginLeft: theme.spacing(1)
  },
  filter: {
    margin: theme.spacing(2)
  },
  search: {
    position: "relative",
    borderRadius: 25,
    paddingLeft: theme.spacing(2.5),
    width: 36,
    backgroundColor: fade(theme.palette.common.black, 0),
    transition: theme.transitions.create(["background-color", "width"]),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
  },
  searchFocused: {
    backgroundColor: fade(theme.palette.common.black, 0.08),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 300,
    },
  },
  searchIcon: {
    width: 36,
    right: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("right"),
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchIconOpened: {
    right: theme.spacing(1.25),
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing(1.25),
    width: "100%",
  },
  blockButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },

  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [values, setValues] = React.useState({
    searchText: "",
    status: "null",
    role:'-1',
  });
  const [isSearchOpen, setSearchOpen] = React.useState(false);
  const [openDiaglog, setOpenDialog] = React.useState(false);
  const [action, setAction] = React.useState({
    value: null,
    title: "",
    description: ""
  });

  React.useEffect(() => {
    if (props.allowFilter === false) {
      setOpen(false);
    }
  }, [props.allowFilter])

  const handleChange = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    }
    console.log(newValues);
    setValues(newValues);

    if (event.target.name === 'status') {
      props.onSetFilter({
        ...values,
        status: event.target.value === "null" ? null : (event.target.value === "unlock" ? true : false)
      })
      return;
    }
    else {
      props.onSetFilter({
        ...values,
        [event.target.name]: event.target.value,
        status: values.status === "null" ? null : (values.status === "unlock" ? true : false)
      })
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <AlertDialogSlide isOpen={openDiaglog}
        onCloseDialog={
          () => {
            setOpenDialog(false);
          }
        }
        onAgreeDialog={
          () => {
            props.onChangeSelectedRowStatus(action.value);
          }
        }
        title={action.title}
        description={action.description} />
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >

        <Typography className={classes.title} variant="h4" id="tableTitle">
          <b>Quản lý danh sách người chơi</b>
        </Typography>
        <>
          <ClickAwayListener onClickAway={() => {
            if (values.searchText === '')
              setSearchOpen(false);
          }} >
            <Tooltip title="Search button">
              <div
                className={classNames(classes.search, {
                  [classes.searchFocused]: isSearchOpen,
                })}
              >
                <div
                  className={classNames(classes.searchIcon, {
                    [classes.searchIconOpened]: isSearchOpen,
                  })}
                  onClick={() => setSearchOpen(!isSearchOpen)}
                >
                  <SearchIcon classes={{ root: classes.headerIcon }} />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  name="searchText"
                  onChange={handleChange}
                  value={values.searchText}
                />
              </div>
            </Tooltip>

          </ClickAwayListener>

          <Tooltip title="Filter list" ref={anchorRef} onClick={handleToggle}>
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>


          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 1000 }}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <FormControl component="fieldset" className={classes.filter}>
                      <Grid container>
                        <Grid item>
                          <FormLabel component="legend">Trạng thái</FormLabel>
                          <RadioGroup aria-label="status" name="status" value={values.status} onChange={handleChange}>
                            <FormControlLabel value="null" control={<Radio />} label="Tất cả" />
                            <FormControlLabel value="unlock" control={<Radio />} label="Tài khoản mở" />
                            <FormControlLabel value="lock" control={<Radio />} label="Tài khoản đã khóa" />
                          </RadioGroup>
                        </Grid>
                        <Grid item>
                          <FormLabel component="legend">Vai trò</FormLabel>
                          <RadioGroup aria-label="role" name="role" value={values.role} onChange={handleChange}>
                            <FormControlLabel value='-1' control={<Radio />} label="Tất cả" />
                            <FormControlLabel value="1" control={<Radio />} label="User" />
                            <FormControlLabel value="2" control={<Radio />} label="Admin" />
                          </RadioGroup>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      </Toolbar>
    </>

  );
};


export default EnhancedTableToolbar;