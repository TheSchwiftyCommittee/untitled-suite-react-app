import React, { useEffect, useState } from "react";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import { USuiteApi } from "../api/USuiteApi";
import importData from "../utils/importData";

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
  Divider,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

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

const Profile = (props) => {
  const { setAdmin, setUser } = props;

  const [registrationErrors, setRegistrationErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const getProfile = async () => {
    const config = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      params: {
        "email": localStorage.getItem("email")
      }
    };
    const data = await importData("/profiles", config);
    
    console.log(data);
    setValues({
      ...values,
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      first_name: data.profile.first_name,
      last_name: data.profile.last_name,
      avatar: data.avatar
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onImageChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.files[0],
    });
    // console.log(URL.createObjectURL(event.target.files[0]))
    console.log(event.target.files[0])
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegistrationErrors("");

    try {
      const { data } = await USuiteApi.post("/users/users", {
        username: values.username,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      });
      localStorage.setItem("jwt", data.token);
      if (data.user.admin === true) {
        setAdmin(true);
      }
      setUser(true);
      setLoading(false);

      setTimeout(() => {
        history.push("/tasker");
      }, 2000);
    } catch (error) {
      setRegistrationErrors(error.response.data.error);
      // console.log(error.response)
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <Paper className={classes.paper} elevation={5}>
      <h1>Profile Page</h1>
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
              <label htmlFor="image">Avatar Image</label>
              <img
                src={
                  typeof values.avatar == "string" 
                    ? 
                    values.avatar
                    : URL.createObjectURL(values.avatar)
                }
                alt={values.avatar ? "Default Image" : values.avatar.name}
              />
              <input
                type="file"
                accept="image/*"
                name="image"
                multiple={false}
                onChange={onImageChange("avatar")}
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
                htmlFor="filled-adornment-username"
                color="secondary"
              >
                Username
              </InputLabel>
              <FilledInput
                disabled
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
                disabled
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
          <Divider />
          <Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel
                required
                htmlFor="filled-adornment-firstname"
                color="secondary"
              >
                First Name
              </InputLabel>
              <FilledInput
                disabled
                id="filled-adornment-firstname"
                color="secondary"
                type="text"
                value={values.first_name}
                onChange={handleChange("first_name")}
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
                htmlFor="filled-adornment-lastname"
                color="secondary"
              >
                Last Name
              </InputLabel>
              <FilledInput
                disabled
                id="filled-adornment-lastname"
                color="secondary"
                type="text"
                value={values.last_name}
                onChange={handleChange("last_name")}
              />
            </FormControl>
          </Grid>
          <Grid container className={classes.btncontainer}>
            <Grid item>
              <Button
                className={classes.btn}
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

export default withRouter(Profile);
