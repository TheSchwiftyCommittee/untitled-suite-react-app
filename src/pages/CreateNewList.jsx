import React, { useState } from "react";
import {  useHistory, withRouter } from "react-router-dom";

import postData from "../utils/postData";

import clsx from "clsx";
import {
  Paper,
  Grid,
  Button,
  FilledInput,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    maxWidth: "70ch",
    padding: theme.spacing(3),
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

const CreateNewList = () => {
  const [loading, setLoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState("");
  const history = useHistory();

  const classes = useStyles();
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    let newTitle = e.target.value
    setTitle(newTitle);
  };

  const handleSubmitNewList = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginErrors("");

    let formData = new FormData();
    formData.append("id", localStorage.getItem("user"))
    formData.append("username", localStorage.getItem("username"))
    formData.append("title", title)

    try {
      const data = await postData("/lists", formData)

      console.log(data)
      setLoading(false);
      setTimeout(() => {
        history.push("/tasker");
      }, 1000);
    } catch (error) {
      setLoginErrors(error.message);
      setLoading(false);
    }
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <h1>Create New List</h1>
      {loginErrors && <div style={{ color: "red" }}>{loginErrors}</div>}
      {loading && <h2>Loading ... </h2>}
      <Grid container className={classes.container}>
        <form onSubmit={handleSubmitNewList} autoComplete="off">
          <Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel
                required
                htmlFor="filled-adornment-title"
                color="secondary"
              >
                Title
              </InputLabel>
              <FilledInput
                required
                id="filled-adornment-title"
                color="secondary"
                type="text"
                value={title}
                onChange={handleChange}
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
                Create New List
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default withRouter(CreateNewList);
