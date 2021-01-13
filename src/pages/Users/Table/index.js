import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core';
import { Link } from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';

import EnhancedTableHead from './EnhanceTableHead';
import EnhancedTableToolbar from './EnhanceTableToolbar'
import { stableSort, getComparator } from './services';
import callAuth from '../../../utils/callAuth';
import callAuthAPI from '../../../utils/CallAuthAPI';
import { ACCESS_TOKEN } from '../../../constant/variables';
import useStyles from './styles';


export default function History(props) {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [refesh, setRefesh] = React.useState(true);
  useEffect(() => {
    callAuth('users', JSON.parse(localStorage.getItem(ACCESS_TOKEN))).then((res) => {
      console.log(res.data);
      setRows(res.data);
    })
  }, [refesh]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filter, setFilter] = React.useState({
    status: null,
    searchText: "",
    role: "-1",
  });
  const [selected, setSelected] = React.useState([]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSetFilter = (newFilter) => {
    setFilter(newFilter)
    setPage(0);
  }

  const filterList = (newFilter) => {
    const textSearchRows = Array.isArray(rows) ? rows.filter(row => {
      return (newFilter.status === null || newFilter.status === row.status) &&
        (parseInt(newFilter.role) === -1 || parseInt(newFilter.role) === row.role) &&
        (row.username.toLowerCase().includes(newFilter.searchText.toLowerCase()) ||
          row.name.toLowerCase().includes(newFilter.searchText.toLowerCase()) ||
          row.email.toLowerCase().includes(newFilter.searchText.toLowerCase()))
    }) : [];

    return textSearchRows;
  }


  const calculatePage = (rowsLength) => {
    if (rowsLength !== 0 && rowsLength < page * rowsPerPage + 1) {
      setPage(page - 1);
      return page - 1;
    }

    return page;
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const actualRows = filterList(filter);

  const handleLockUnLockUser = (id, status) => {
    callAuthAPI('users/changestatus', 'POST', { id: id, status: !status }, JSON.parse(localStorage.getItem(ACCESS_TOKEN))).then((res) => {
      console.log(res.data);
      setRefesh(!refesh);
    });
  }

  return (
    <div className={classes.root} >
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          allowFilter={selected.length === 0}
          onSetFilter={handleSetFilter}
          numSelected={selected.length}
        />
        <TableContainer className={classes.container}>
          <Table className={classes.table} stickyHeader
            aria-labelledby="tableTitle"
            aria-label="enhanced table" size='small'>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody >
              {stableSort(actualRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      name="table"
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className={classes.tableRow}
                    >
                      <TableCell component="th"
                        id={labelId}
                        > {index + 1} </TableCell>
                      <TableCell align="left" > {row.username} </TableCell>
                      <TableCell align="left" > {row.name} </TableCell>
                      <TableCell align="left" > <div>{row.email} </div></TableCell>
                      <TableCell align="left" > <div>{row.role === 2 ? "Admin" : "User"} </div></TableCell>
                      <TableCell align="left" > {row.status ?
                        <div style={{ color: "blue" }}>Mở</div> : <div style={{ color: "red" }}>Đã khóa</div>} </TableCell>
                      <TableCell align="left" >
                        {row.status ? <IconButton onClick={() => handleLockUnLockUser(row.id, row.status)} title='Khóa' aria-label="lock" className={classes.iconButton}>
                          <LockIcon style={{ color: "#ffffff" }} />
                        </IconButton>
                          : <IconButton onClick={() => handleLockUnLockUser(row.id, row.status)} title='Mở khóa' aria-label="unlock" className={classes.iconButton}>
                            <LockOpenIcon style={{ color: "#ffffff" }} />
                          </IconButton>
                        }
                        <Link to={'users/' + row.id}><IconButton title='Xem chi tiết' aria-label="edit" className={classes.iconButton}>
                          <EditIcon style={{ color: "#ffffff" }} />
                        </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={actualRows.length}
          rowsPerPage={rowsPerPage}
          page={calculatePage(actualRows.length)}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage} />
      </Paper >
    </div>
  );
}