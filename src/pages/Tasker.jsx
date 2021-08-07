import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import importData from '../utils/importData';

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { ListCard } from "../components/card/ListCard";
import { AddNewCard } from "../components/card/AddNewCard";
import { SearchBar } from "../components/SearchBar";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    width: "80%",
    maxWidth: "100ch",
    padding: theme.spacing(3),
  },
}));

const Tasker = () => {
  const classes = useStyles();
  const [lists, setLists] = useState(null)

  const getLists = async () => {
    const data = await importData("/lists")
    console.log(data)
    let listsArray = await data
    setLists(listsArray)
  }
  
  useEffect(() => {
    getLists();
  }, [])

  return (
    <Paper key="tasker" className={classes.paper} elevation={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Tasker
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Lists
          </Typography>
        </Grid>
        {lists && lists.map((list) => (
          <Grid item key={list.id} xs={12} md={6}>
            <ListCard key={list.id} list={list} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <AddNewCard path="/createNewList"/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withRouter(Tasker);
