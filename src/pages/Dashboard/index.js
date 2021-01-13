import React from "react";
import { Grid } from "@material-ui/core";

import CustomizedBreadcrumbs from './../../components/Breadcrumbs/index'
export default function Dashboard(props) {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CustomizedBreadcrumbs nextLinks={[]} />
        </Grid>
        <Grid item xs={12}>
          {/* <Table></Table> */}
        </Grid>
      </Grid>
    </>
  );
}
