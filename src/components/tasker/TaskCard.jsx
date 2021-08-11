import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import deleteData from "../../utils/deleteData";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
  avatar: {
    color: theme.palette.getContrastText(orange[900]),
    backgroundColor: orange[200],
  },
  heading: {
    textAlign: "left",
  },
  cardActions: {
    justifyContent: "flex-end",
  },
}));

export const TaskCard = (props) => {
  const { listId, task, setOpenPopup, setErrors } = props;
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickUpdateTask = (item) => {
    localStorage.setItem("task_id", item);
    setOpenPopup(true);
    setAnchorEl(null);
  };

  const handleClickDeleteTask = async (id) => {
    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("list_id", listId);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: formData,
    };
    try {
      const data = await deleteData(`/tasks/${id}`, config);
      console.log(data);
      setAnchorEl(null);
      setTimeout(() => {
        history.push("/tasker");
      }, 100);
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <Card className={classes.card} elevation={2}>
      <CardHeader
        avatar={
          <Avatar aria-label="list" className={task.completed ? classes.completed : classes.avatar}>
            {task.title[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={task.title}
        titleTypographyProps={{ variant: "h6" }}
        className={classes.heading}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleClickUpdateTask(task.id)}>
          Update Card
        </MenuItem>
        <MenuItem onClick={() => handleClickDeleteTask(task.id)}>
          Delete Card
        </MenuItem>
      </Menu>
    </Card>
  );
};
