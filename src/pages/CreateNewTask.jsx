import React, { useState } from "react";
import {  useHistory, useParams, withRouter } from "react-router-dom";

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

const CreateNewTask = () => {
  const { listId } = useParams()
  const [taskErrors, setTaskErrors] = useState("");
  const history = useHistory();

  const classes = useStyles();
  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmitNewTask = async (e) => {
    e.preventDefault();
    setTaskErrors("");

    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"))
    formData.append("list_id", listId)
    formData.append("title", values.title)
    formData.append("description", values.description)
    formData.append("priority", values.priority)

    try {
      const data = await postData("/tasks", formData)
      console.log(data)
      setTimeout(() => {
        history.push("/tasker");
      }, 1000);
    } catch (error) {
      setTaskErrors(error.message);
    }
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <h1>Create New Task</h1>
      {taskErrors && <div style={{ color: "red" }}>{taskErrors}</div>}
      <Grid container className={classes.container}>
        <form onSubmit={handleSubmitNewTask} autoComplete="off">
          <Grid item id="title">
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
                value={values.title}
                onChange={handleChange("title")}
              />
            </FormControl>
          </Grid>
          <Grid item id="description">
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel
                required
                htmlFor="filled-adornment-description"
                color="secondary"
              >
                Description
              </InputLabel>
              <FilledInput
                required
                id="filled-adornment-description"
                color="secondary"
                type="text"
                value={values.description}
                onChange={handleChange("description")}
              />
            </FormControl>
          </Grid><Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel
                required
                htmlFor="filled-adornment-priority"
                color="secondary"
              >
                Priority
              </InputLabel>
              <FilledInput
                required
                id="filled-adornment-priority"
                color="secondary"
                type="text"
                value={values.priority}
                onChange={handleChange("priority")}
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
                Create New Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default withRouter(CreateNewTask);
