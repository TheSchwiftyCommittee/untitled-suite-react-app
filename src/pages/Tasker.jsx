import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  paper: {
    width: "80%",
    maxWidth: "100ch",
    padding: "1rem",
  },
  btncontainer: {
    margin: "1rem 0rem",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  btn: {
    marginTop: "1rem",
  },
}));

const Tasker = (props) => {
  const { user } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography variant="h4" component="h2" gutterBottom>
        Tasker
      </Typography>

      {!user && (
        <Grid container className={classes.btncontainer}>
          <Grid item sm={6}>
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              size="large"
              component={NavLink}
              to="/signup"
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item sm={6}>
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              size="large"
              component={NavLink}
              to="/signin"
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default withRouter(Tasker);
