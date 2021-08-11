import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getData from "../../utils/getData";
import Popup from "../Popup";
import { AddNewCard } from "./AddNewCard";
import { TaskCard } from "./TaskCard";
import { UpdateTask } from "./UpdateTask";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    marginTop: theme.spacing(2)
  }
}));

export const ListTasks = () => {
  let { listId } = useParams();
  const classes = useStyles();
  const [tasks, setTasks] = useState(null);
  const [errors, setErrors] = useState("");
  const [openTaskPopup, setOpenTaskPopup] = useState(false)

  const getTasks = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      params: {
        username: localStorage.getItem("username"),
        list_id: listId
      },
    };

    try {
      const data = await getData("/tasks", config);
      console.log(data);
      let tasksArray = await data;
      setTasks(tasksArray);
    } catch (error) {
      setErrors(error.message)
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Tasks
          </Typography>
        </Grid>
        {errors && <div style={{ color: "red" }}>{errors}</div>}
        {tasks && tasks.map((task) => (
            <Grid item key={task.id} xs={12} md={6}>
              <TaskCard key={task.id} listId={listId} task={task} setOpenPopup={setOpenTaskPopup} setErrors={setErrors}/>
            </Grid>
          ))
        }
        <Grid item xs={12}>
          <AddNewCard path={`/createNewTask/${listId}`} title="Add New Task"/>
        </Grid>
      </Grid>
      <Popup
        title="Update Task Details"
        openPopup={openTaskPopup}
        setOpenPopup={setOpenTaskPopup}
      >
        <UpdateTask taskId={localStorage.getItem("task_id")} setOpenPopup={setOpenTaskPopup}/>
      </Popup>
    </>
  );
};
