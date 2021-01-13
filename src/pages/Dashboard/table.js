// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// import { useSocketContext } from './../../context/UserContext'
// import CallAuthAPI from './../../utils/CallAuthAPI'
// import { ACCESS_TOKEN } from '../../constant/variables';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// export default function BasicTable() {
//   const classes = useStyles();
//   // const socket = useSocketContext();
//   // const [users, setUsers] = React.useState([])

//   // React.useEffect(() => {
//   //   socket.on('newConnect', users => {
//   //     CallAuthAPI('users/online', 'POST', {
//   //       users: users,
//   //     }, JSON.parse(localStorage.getItem(ACCESS_TOKEN)))
//   //       .then(res => {
//   //         setUsers(res.data)
//   //       })
//   //   })
//   // }, [socket])

//   return (
//     <></>
//     // <TableContainer component={Paper}>
//     //   <Table className={classes.table} aria-label="simple table">
//     //     <TableHead>
//     //       <TableRow>
//     //         <TableCell>ID</TableCell>
//     //         <TableCell >Username</TableCell>
//     //         <TableCell >Ngày lập</TableCell>
//     //       </TableRow>
//     //     </TableHead>
//     //     <TableBody>
//     //       {users.map((row) => (
//     //         <TableRow key={row.id}>
//     //           <TableCell component="th" scope="row">
//     //             {row.id}
//     //           </TableCell>
//     //           <TableCell >{row.username}</TableCell>
//     //           <TableCell >{row.date}</TableCell>
//     //         </TableRow>
//     //       ))}
//     //     </TableBody>
//     //   </Table>
//     // </TableContainer>
//   );
// }
