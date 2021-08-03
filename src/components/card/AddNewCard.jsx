import React from 'react'

import { Card, CardHeader } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.main, 0.85),
    },
    color: theme.palette.primary.main,
  },
  heading: {
    textAlign: 'center',
  },
}));

export const AddNewCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={2}>
      <CardHeader
        avatar={
          <AddCircleIcon fontSize="large" />
        }
        title="Add New List"
        titleTypographyProps={{variant: "h6"}}
        className={classes.heading}
      />
    </Card>
  )
}
