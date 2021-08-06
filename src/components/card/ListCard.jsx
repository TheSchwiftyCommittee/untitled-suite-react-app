import React from 'react'

import { Avatar, ButtonBase, Card, CardHeader, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  card: {
    width: "100%",
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
    <ButtonBase className={classes.root} component={NavLink} to="#">
      <Card className={classes.card} elevation={2}>
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
          subheader={list.description.length + " tasks"}
          className={classes.heading}
        />
      </Card>
    </ButtonBase>
  )
}
