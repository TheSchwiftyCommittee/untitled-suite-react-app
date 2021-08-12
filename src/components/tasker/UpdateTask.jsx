import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import putData from "../../utils/putData";

import clsx from "clsx";
import {
  Grid,
  Button,
  FilledInput,
  InputLabel,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import getData from "../../utils/getData";
import { useEffect } from "react";

const priorities = ["Critical", "High", "Medium", "Low"];
const completed = [
  {
    value: true,
    label: "Yes",
  },
  {
    value: false,
    label: "No",
  },
];

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

export const UpdateTask = ({ listId, taskId, setOpenPopup }) => {
  const history = useHistory();
  const classes = useStyles();
  const [updateErrors, setUpdateErrors] = useState("");
  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "",
    completed: false,
  });

  const getTaskDetails = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      params: {
        username: localStorage.getItem("username"),
        list_id: listId,
      },
    };

    const data = await getData(`/tasks/${taskId}`, config);
    let taskDetails = await data;
    setValues({
      ...values,
      title: taskDetails.title,
      description: taskDetails.description,
      priority: taskDetails.priority,
      completed: taskDetails.completed,
    });
  };

  useEffect(() => {
    getTaskDetails();
    // eslint-disable-next-line
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmitNewList = async (e) => {
    e.preventDefault();
    setUpdateErrors("");

    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("list_id", listId);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("priority", values.priority);
    formData.append("completed", values.completed);

    try {
      const data = await putData(`/tasks/${taskId}`, formData);
      console.log(data);
      history.go();
    } catch (error) {
      setUpdateErrors(error.message);
    }
  };

  return (
    <div>
      {updateErrors && <div style={{ color: "red" }}>{updateErrors}</div>}
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
                value={values.title}
                onChange={handleChange("title")}
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
          </Grid>
          <Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <TextField
                id="outlined-select-priority-native"
                select
                required
                label="Priority"
                value={values.priority}
                onChange={handleChange("priority")}
                SelectProps={{
                  native: true,
                }}
                variant="filled"
              >
                {priorities.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <TextField
                id="outlined-select-completed-native"
                select
                required
                label="Completed?"
                value={values.completed}
                onChange={handleChange("completed")}
                SelectProps={{
                  native: true,
                }}
                variant="filled"
              >
                {completed.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid container className={classes.btncontainer}>
            <Grid item>
              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpenPopup(false);
                }}
              >
                Update Task Details
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};
