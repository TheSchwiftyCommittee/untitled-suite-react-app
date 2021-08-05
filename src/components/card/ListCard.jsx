import React from 'react'

import { Avatar, Card, CardHeader, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(() => ({
  root: {
  },
  avatar: {
    backgroundColor: "red",
  },
  heading: {
    textAlign: 'left',
  },
}));

export const ListCard = (props) => {
  const { list } = props
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
        title={list.title}
        titleTypographyProps={{variant: "h6"}}
        subheader={Object.keys(list).length + " tasks"}
        className={classes.heading}
      />
    </Card>
  )
}
