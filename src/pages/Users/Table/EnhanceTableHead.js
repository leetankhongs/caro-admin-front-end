import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headCells = [
  { id: 'stt', label: 'STT' },
  { id: 'username', label: 'Tên tài khoản' },
  { id: 'name', label: 'Họ tên' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Vai trò' },
  { id: 'status', label: 'Trạng thái' },
  { id: 'action', label: 'Hành động' },  
];

const EnhancedTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (headCell.id !== 'role' && headCell.id !== 'action' && headCell.id !== 'stt' && headCell.id !== 'status') {
            if(headCell.id === 'email'){
              return (
                <TableCell
                  key={headCell.id}
                  align='left'
                  padding='default'
                  width='30%'
                  sortDirection={orderBy === headCell.id ? order : false}
                  style={{ backgroundColor: "white"}}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                    
                  >
                    <b>{headCell.label}</b>
                    {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              )

            }
            return (
              <TableCell
                key={headCell.id}
                align='left'
                padding='default'
                width='15%'
                sortDirection={orderBy === headCell.id ? order : false}
                style={{ backgroundColor: "white"}}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  
                >
                  <b>{headCell.label}</b>
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          }
          else {
            return (
              <TableCell
                key={headCell.id}
                align='left'
                padding={headCell.disablePadding ? 'none' : 'default'}
                style={{ backgroundColor: "white" }}
              >
                <b>{headCell.label}</b>
              </TableCell>
            )
          }
        })}

      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;