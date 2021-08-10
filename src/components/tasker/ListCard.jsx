import React from 'react'
import { NavLink } from 'react-router-dom';

import { Avatar, ButtonBase, Card, CardActions, CardHeader, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  card: {
    width: "100%",
  },
  avatar: {
    color: theme.palette.getContrastText(orange[900]),
    backgroundColor: orange[600],
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
              {list.title[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={list.title}
          titleTypographyProps={{variant: "h6"}}
          className={classes.heading}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="rename list">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete list">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </ButtonBase>
  )
}
