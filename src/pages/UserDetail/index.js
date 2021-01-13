import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";

import CustomizedBreadcrumbs from '../../components/Breadcrumbs/index';
import callAuthAPI from '../../utils/CallAuthAPI';
import { ACCESS_TOKEN } from '../../constant/variables';
import {convertDateToString} from '../../services/date'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: "#ffffff",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    emailInput: {
      width: theme.spacing(40),
    },
    btn: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
    }
  }),
);



const UserDetail = () => {
  const [data, setData] = useState({});
  const [refesh, setRefesh] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    callAuthAPI(`users/${id}`, 'GET', {}, JSON.parse(localStorage.getItem(ACCESS_TOKEN))).then((res) => {
      console.log(res.data);
      setData(res.data);
    })
  }, [id,refesh])
  const classes = useStyles();

  const handleActiveUser = (id) => {
    console.log('Active id:' + id);
    callAuthAPI('users/activeuser', 'POST', { id: id}, JSON.parse(localStorage.getItem(ACCESS_TOKEN))).then((res) => {
      console.log(res.data);
      setRefesh(!refesh);
    });
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomizedBreadcrumbs nextLinks={[]} finalLink={{ label: "Xem thông tin người dùng", path: '/user/' }} />
        </Grid>
        <Grid item xs={12} className={classes.root}>
          <h1>Thông tin người dùng </h1>
          <h3>Thông tin cá nhân</h3>
          <Grid container spacing={5} alignItems="center">
            <Grid item>
              <TextField variant="filled" label='Họ tên' placeholder="Họ tên" value={data.name ? data.name : ''} flexGrow={1} InputProps={{ readOnly: true, }} />
            </Grid>
            <Grid item>
              <TextField variant="filled" label='Tên tài khoản' placeholder="Tên tài khoản" value={data.username ? data.username : ''} InputProps={{ readOnly: true, }} />
            </Grid>
            <Grid item>
              <TextField variant="filled" className={classes.emailInput} label='Email' placeholder="Email" value={data.email ? data.email : ''} InputProps={{ readOnly: true, }} />
            </Grid>
          </Grid>
          <h3>Lịch sử chơi</h3>
          <Grid container spacing={5} alignItems="center">
            <Grid item>
              <TextField variant="filled" label='Số cúp' placeholder="Số cúp" value={data.cup ? data.cup : 0} InputProps={{ readOnly: true, }} />
            </Grid>
            <Grid item>
              <TextField variant="filled" label='Số trận đã chơi' placeholder="Số trận đã chơi" value={data.countMatch ? data.countMatch : 0} InputProps={{ readOnly: true, }} />
            </Grid>
            <Grid item>
              <TextField variant="filled" label='Rank' placeholder="Rank" value={data.rank ? data.rank : ''} InputProps={{ readOnly: true, }} />
            </Grid>
            <Grid item>
              <TextField variant="filled" label='Tỷ lệ thắng' placeholder="Tỷ lệ thắng" value={data.winRatio ? data.winRatio : ''} InputProps={{ readOnly: true, }} />
            </Grid>
          </Grid>
          <h3>Thông tin tài khoản</h3>
          <Grid container spacing={5} alignItems="center">
            <Grid item>
              <TextField variant="filled" label='Trạng thái tài khoản' placeholder="Trạng thái tài khoản" value={data.status ? 'Đang mở' : 'Đã khóa'} InputProps={{ readOnly: true, }} />
            </Grid>
            <Grid item>
              <TextField variant="filled" label='Vai trò' placeholder="Vai trò" value={data.role ? data.role === 2 ? 'Admin' : 'User' : ''} InputProps={{ readOnly: true, }} />
            </Grid>
            <Grid item>
              <TextField variant="filled" label='Trạng thái kích hoạt tài khoản' placeholder="Trạng thái kích hoạt tài khoản" value={data.isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'} InputProps={{ readOnly: true, }} />
              {
                data.isActive===false ? <Button onClick={data.username ? () => handleActiveUser(id) : null} className={classes.btn} variant="contained" color="primary">
                  Kích hoạt tài khoản
              </Button>:null
              }
            </Grid>
            <Grid item>
              <TextField variant="filled" label='Ngày tạo' placeholder="Ngày tạo" value={data.dateCreate ? convertDateToString(data.dateCreate) : ''} InputProps={{ readOnly: true, }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default UserDetail;