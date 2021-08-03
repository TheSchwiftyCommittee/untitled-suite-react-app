import React from 'react'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  avatar: {
    backgroundColor: "red",
  },
  heading: {
    textAlign: 'left',
  },
}));

export const ListCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={2}>
      <CardHeader
        avatar={
          <Avatar aria-label="list" className={classes.avatar}>
            W
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Work"
        subheader="1 task"
        className={classes.heading}
      />
    </Card>
  )
}
