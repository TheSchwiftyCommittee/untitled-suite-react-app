import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import getData from "../utils/getData";
import putData from "../utils/putData";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  FilledInput,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Paper,
  Divider,
} from "@material-ui/core";

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

const Profile = () => {
  const [profileErrors, setProfileErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
    profile_id: ""
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
    const data = await getData("/profiles", config);
    // console.log(data);
    const profileAvatar = await fetch(data.avatar)
    const blob = await profileAvatar.blob();
    const file = new File([blob], `${localStorage.getItem("username")}.jpg`, {type: blob.type});
    console.log(file);

    setValues({
      ...values,
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      first_name: data.profile.first_name,
      last_name: data.profile.last_name,
      avatar: file,
      profile_id: data.profile.id
    });
  };

  useEffect(() => {
    getProfile();
  }, [])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onImageChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.files[0],
    });
    // console.log(event.target.files[0])
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProfileErrors("");

    console.log(values);
    let formData = new FormData();
    formData.append("username", values.username)
    formData.append("user_id", localStorage.getItem("user"))
    formData.append("email", values.email)
    formData.append("first_name", values.first_name)
    formData.append("last_name", values.last_name)
    formData.append("avatar", values.avatar, values.avatar.name)

    try {
      const data = await putData(`/profiles/${values.profile_id}`, formData);

      console.log(data);
      setLoading(false);
      setTimeout(() => {
        history.go();
      }, 10);
    } catch (error) {
      setProfileErrors(error.message);
      console.log(error.response)
      setLoading(false);
    }
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <h1>Profile Page</h1>
      {profileErrors && (
        <div style={{ color: "red" }}>{profileErrors}</div>
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
          <Divider />
          <Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <label htmlFor="image">Update Avatar Image</label>
              <img
                src={values.avatar ? URL.createObjectURL(values.avatar) : "http://res.cloudinary.com/dw6yvkydp/image/upload/v1628677146/g8ommuwe8ml02wrgnut1dcpzulxp.png" }
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
                htmlFor="filled-adornment-firstname"
                color="secondary"
              >
                First Name
              </InputLabel>
              <FilledInput
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
                htmlFor="filled-adornment-lastname"
                color="secondary"
              >
                Last Name
              </InputLabel>
              <FilledInput
                id="filled-adornment-lastname"
                color="secondary"
                type="text"
                value={values.last_name}
                onChange={handleChange("last_name")}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              className={classes.btn}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Update Profile
            </Button>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default withRouter(Profile);
