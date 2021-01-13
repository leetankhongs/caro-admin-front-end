import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classNames from "classnames";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  Toolbar,
  InputBase,
} from "@material-ui/core";
import {
  Search as SearchIcon,
} from "@material-ui/icons";

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
  const [values, setValues] = React.useState({
    searchText: "",
    status: "null",
    role:'-1',
  });
  const [isSearchOpen, setSearchOpen] = React.useState(false);
  const [openDiaglog, setOpenDialog] = React.useState(false);

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

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >

        <Typography className={classes.title} variant="h4" id="tableTitle">
          <b>Quản lý lịch sử</b>
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
        </>
      </Toolbar>
    </>

  );
};


export default EnhancedTableToolbar;