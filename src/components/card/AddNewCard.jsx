import React from "react";
import { NavLink } from "react-router-dom";

import { ButtonBase, Card, CardHeader } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  card: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: alpha(theme.palette.secondary.main, 0.85),
    },
    color: theme.palette.primary.main,
    width: "100%",
  },
  heading: {
    textAlign: "center",
  },
}));

export const AddNewCard = (props) => {
  const { path } = props;
  const classes = useStyles();

  return (
    <ButtonBase className={classes.root} component={NavLink} to={path}>
      <Card className={classes.card} elevation={2}>
        <CardHeader
          avatar={<AddCircleIcon fontSize="large" />}
          title="Add New List"
          titleTypographyProps={{ variant: "h6" }}
          className={classes.heading}
        />
      </Card>
    </ButtonBase>
  );
};
