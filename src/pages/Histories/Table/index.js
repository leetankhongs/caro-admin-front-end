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
import VisibilityIcon from '@material-ui/icons/Visibility';

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
    callAuth('matchs', JSON.parse(localStorage.getItem(ACCESS_TOKEN))).then((res) => {
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
      return (
        row.player1Username.toLowerCase().includes(newFilter.searchText.toLowerCase()) ||
        row.player2Username.toLowerCase().includes(newFilter.searchText.toLowerCase()))}) : [];

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
                        scope="row"
                        padding="default" > {index + 1} </TableCell>
                      <TableCell align="left" > {row.roomId} </TableCell>
                      <TableCell align="left" > {row.player1Username} </TableCell>
                      <TableCell align="left" > {row.player2Username} </TableCell>
                      <TableCell align="left" > {row.status === 1 && "Player 1 thắng"} {row.status === 2 && "Player 2 thắng"} {row.status === 0 && "Hòa"} </TableCell>
                      <TableCell align="left" > {row.time} </TableCell>
                      <TableCell align="left" >
                        <Link to={'histories/' + row.id}><IconButton title='Xem chi tiết' aria-label="edit" className={classes.iconButton}>
                          <VisibilityIcon style={{ color: "#ffffff" }} />
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