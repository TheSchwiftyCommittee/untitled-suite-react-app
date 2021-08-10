import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import getData from "../utils/getData";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { ListCard } from "../components/tasker/ListCard";
import { AddNewCard } from "../components/tasker/AddNewCard";
import { SearchBar } from "../components/SearchBar";
import Popup from "../components/Popup";
import { UpdateList } from "../components/tasker/UpdateList";

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
  const [lists, setLists] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [errors, setErrors] = useState("")
  const [openPopup, setOpenPopup] = useState(false)

  const getLists = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      params: {
        username: localStorage.getItem("username"),
      },
    };

    const data = await getData("/lists", config);
    console.log(data);
    let listsArray = await data;
    setLists(listsArray);
  };

  useEffect(() => {
    getLists();
  }, [lists]);

  return (
    <>
      <Paper key="tasker" className={classes.paper} elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Tasker
            </Typography>
          </Grid>
          {errors && <div style={{ color: "red"}} >{errors}</div>}
          <Grid item xs={12}>
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Lists
            </Typography>
          </Grid>
          {lists &&
            lists
              .filter((list) =>
                list.title.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((filteredList) => (
                <Grid item key={filteredList.id} xs={12} md={6}>
                  <ListCard key={filteredList.id} list={filteredList} setOpenPopup={setOpenPopup} setErrors={setErrors} />
                </Grid>
              ))}
          <Grid item xs={12}>
            <AddNewCard path="/createNewList" />
          </Grid>
        </Grid>
      </Paper>
      <Popup
        title="Update List Title"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateList listId={localStorage.getItem("list_id")} setOpenPopup={setOpenPopup}/>
      </Popup>
    </>
  );
};

export default withRouter(Tasker);
