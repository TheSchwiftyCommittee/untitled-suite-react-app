import React, { useState } from "react";
import {  useHistory } from "react-router-dom";

import putData from "../../utils/putData";

import clsx from "clsx";
import {
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

export const UpdateList = ({listId, setOpenPopup}) => {
  const history = useHistory();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [updateErrors, setUpdateErrors] = useState("");

  const handleChange = (e) => {
    let newTitle = e.target.value
    setTitle(newTitle);
  };

  const handleSubmitNewList = async (e) => {
    e.preventDefault();
    setUpdateErrors("");

    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"))
    formData.append("title", title)
    formData.append("id", listId)

    try {
      const data = await putData(`/lists/${listId}`, formData)

      console.log(data)
      setTimeout(() => {
        history.push("/tasker");
      }, 1000);
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
                onClick={() => {
                  setOpenPopup(false);
                }}
              >
                Update Title
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  )
}
