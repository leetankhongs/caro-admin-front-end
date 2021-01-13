import React from 'react';

import { Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const MessageItem = ({ typePlayer, name, time, content, image, index }) => {
  return (
    <>
      <Card keu={index} className={typePlayer} >
        <CardContent style={{ backgroundColor: "brown" }} closeButton={false}>
          <Grid container justify="space-between"
            alignItems="center">
            <strong className="mr-auto" style={{ color: "#DE9B72", fontSize: "70%" }}>{name ? name : 'Player'}</strong>
            <small style={{ color: "#DE9B72", fontSize: "70%" }}  >{time ? time : 'just now'}</small>
          </Grid>

        </CardContent>
        <CardContent style={{ height: "60%"}} ><p style={{ fontSize: "70%" }} >{content ? content : '...'}</p></CardContent>
      </Card>
    </>
  )
}
export default MessageItem;