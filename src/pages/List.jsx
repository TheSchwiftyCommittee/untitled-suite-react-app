import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import getData from '../utils/getData';

import { alpha, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { ListCard } from "../components/card/ListCard";
import { AddNewCard } from "../components/card/AddNewCard";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    width: "80%",
    maxWidth: "100ch",
    padding: "1rem",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey['400'], 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey['400'], 0.25),
    },
    marginLeft: 0,
    marginBottom: '1rem',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const List = () => {
  const classes = useStyles();
  const [lists, setLists] = useState(null)

  const getLists = async () => {
    const config = {
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("jwt")
      // }
    };
    const data = await getData("/lists", config)
    console.log(data)
    let listsArray = await data
    setLists(listsArray)
  }
  
  useEffect(() => {
    getLists();
  }, [])

  return (
    <Paper key="list" className={classes.paper} elevation={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Tasker
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search List Name…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
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

export default withRouter(List);
