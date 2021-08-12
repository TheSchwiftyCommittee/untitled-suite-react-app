import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  FilledInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import postData from "../utils/postData";

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
    maxWidth: "25ch",
  },
  paper: {
    width: "80%",
    maxWidth: "70ch",
    padding: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0rem",
  },
  btncontainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  },
  btn: {
    marginTop: "1rem",
  },
}));

export const SignUp = (props) => {
  const { setUser } = props;

  const [registrationErrors, setRegistrationErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegistrationErrors("");

    const body = {
      "username": values.username,
      "password": values.password,
      "email": values.email,
      "password_confirmation": values.password_confirmation,
    }

    try {
      const data = await postData("/users/users", body);
      // console.log(data)
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", data.user.id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);
      console.log(localStorage.getItem("email"))
      setUser(true);
      setLoading(false);

      setTimeout(() => {
        history.push("/profile/new");
      }, 1000);
    } catch (error) {
      setRegistrationErrors("Invalid username or email");
      // console.log(error.response)
      setLoading(false);
    }
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <h1>Sign Up</h1>
      {registrationErrors && (
        <div style={{ color: "red" }}>{registrationErrors}</div>
      )}
      {loading && <h2>Loading ... </h2>}
      <Grid container className={classes.container}>
        <form onSubmit={handleOnSubmit} autoComplete="off">
          <Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel
                required
                htmlFor="filled-adornment-username"
                color="secondary"
              >
                Username
              </InputLabel>
              <FilledInput
                required
                id="filled-adornment-username"
                color="secondary"
                type="text"
                value={values.username}
                onChange={handleChange("username")}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel
                required
                htmlFor="filled-adornment-email"
                color="secondary"
              >
                Email
              </InputLabel>
              <FilledInput
                required
                id="filled-adornment-email"
                color="secondary"
                type="text"
                value={values.email}
                onChange={handleChange("email")}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel
                required
                htmlFor="filled-adornment-password"
                color="secondary"
              >
                Password
              </InputLabel>
              <FilledInput
                required
                id="filled-adornment-password"
                color="secondary"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel
                required
                htmlFor="filled-adornment-passwordConfirmation"
                color="secondary"
              >
                Confirm Password
              </InputLabel>
              <FilledInput
                required
                id="filled-adornment-passwordConfirmation"
                color="secondary"
                type={values.showPassword ? "text" : "password"}
                value={values.passwordConfirmation}
                onChange={handleChange("passwordConfirmation")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid container className={classes.btncontainer}>
            <Grid item>
              <Button
                className={classes.btn}
                id="filled-adornment-signupbutton"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.btn}
                variant="contained"
                color="secondary"
                component={NavLink}
                to="/signin"
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};
