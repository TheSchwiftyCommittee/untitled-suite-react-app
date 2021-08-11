import React, { useEffect, useState } from "react";
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
import getData from "../../utils/getData";


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
  const [updateErrors, setUpdateErrors] = useState("");
  const [listTitle, setListTitle] = useState("");

  const getListDetails = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      params: {
        "username": localStorage.getItem("username"),
      },
    };
  
    const data = await getData(`/lists/${listId}`, config);
    let listDetails = await data;
    setListTitle(listDetails.title)
  }

  useEffect(() => {
    getListDetails();
  }, [])

  const handleChange = (e) => {
    let newListTitle = e.target.value
    setListTitle(newListTitle);
  };

  const handleSubmitNewList = async (e) => {
    e.preventDefault();
    setUpdateErrors("");

    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"))
    formData.append("title", listTitle)
    formData.append("id", listId)

    try {
      const data = await putData(`/lists/${listId}`, formData)
      console.log(data)
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
                value={listTitle}
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
