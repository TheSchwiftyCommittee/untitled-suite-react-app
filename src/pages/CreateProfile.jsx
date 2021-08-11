import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  FilledInput,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";
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
    marginTop: theme.spacing(3),
  },
}));



const CreateProfile = () => {
  const [createProfileErrors, setCreateProfileErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const classes = useStyles();
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const getAvatar = async () => {
    try {
      const data = await fetch("http://res.cloudinary.com/dw6yvkydp/image/upload/v1628677146/g8ommuwe8ml02wrgnut1dcpzulxp.png");
      const blob = await data.blob();
      const file = new File([blob], 'Placeholder.jpg', {type: blob.type});
      console.log(file); 
      setValues({ ...values, avatar: file });
    } catch (err) {
      console.error(err.name, err.message);
    }
  }
  
  useEffect(() => {
    getAvatar()
  }, [])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onImageChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.files[0],
    });
    // console.log(URL.createObjectURL(event.target.files[0]))
    console.log("My name is ", event.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCreateProfileErrors("");

    let formData = new FormData();
    formData.append("id", localStorage.getItem("user"));
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("avatar", values.avatar, values.avatar.name);

    try {
      const data = await postData("/profiles", formData);

      console.log(data);
      // localStorage.setItem("profile", data.profile.id)
      setLoading(false);
      setTimeout(() => {
        history.push("/tasker");
      }, 1000);
    } catch (error) {
      setCreateProfileErrors(error.message);
      console.log(error.response);
      setLoading(false);
    }
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <h1>Create Profile</h1>
      {createProfileErrors && (
        <div style={{ color: "red" }}>{createProfileErrors}</div>
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
                src={values.avatar ? URL.createObjectURL(values.avatar) : "http://res.cloudinary.com/dw6yvkydp/image/upload/v1628677146/g8ommuwe8ml02wrgnut1dcpzulxp.png" }
                alt={values.avatar ? values.avatar.name : "default image"}
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
                htmlFor="filled-adornment-firstname"
                color="secondary"
              >
                First Name
              </InputLabel>
              <FilledInput
                required
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
                htmlFor="filled-adornment-email"
                color="secondary"
              >
                Last Name
              </InputLabel>
              <FilledInput
                required
                id="filled-adornment-email"
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
                Create Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default withRouter(CreateProfile);
