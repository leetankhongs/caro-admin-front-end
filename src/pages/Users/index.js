import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Table from './Table/index';
import CustomizedBreadcrumbs from '../../components/Breadcrumbs/index';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: "#ffffff",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
);
export default function Users(props) {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomizedBreadcrumbs nextLinks={[]} finalLink={{ label: "Danh sách người dùng", path: '/users' }} />
        </Grid>
        <Grid item xs={12} className={classes.root}>
          <Table />
        </Grid>
      </Grid>
    </>
  );
}