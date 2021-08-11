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
    backgroundColor: orange[600],
  },
  heading: {
    textAlign: "left",
  },
  cardActions: {
    justifyContent: "flex-end",
  },
}));

export const ListCard = (props) => {
  const { list, setOpenPopup, setErrors, match } = props;
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickUpdateList = (item) => {
    localStorage.setItem("list_id", item);
    setOpenPopup(true);
    setAnchorEl(null);
  };

  const handleClickDeleteList = async (id) => {
    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("id", id);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: formData,
    };
    try {
      const data = await deleteData(`/lists/${id}`, config);
      console.log(data);
      setAnchorEl(null);
      setTimeout(() => {
        history.push('/tasker');
      }, 10);
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <Card className={classes.card} elevation={2}>
      <CardHeader
        avatar={
          <Avatar aria-label="list" className={classes.avatar}>
            {list.title[0].toUpperCase()}
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
        title={
          <Link
            to={`${match.url}/${list.id}`}
            style={{ color: "black", textDecoration: "none" }}
            onClick={() =>
              setTimeout(() => {
                history.go();
              }, 50)
            }
          >
            {list.title}
          </Link>
        }
        titleTypographyProps={{ variant: "h6" }}
        className={classes.heading}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleClickUpdateList(list.id)}>
          Update List
        </MenuItem>
        <MenuItem onClick={() => handleClickDeleteList(list.id)}>
          Delete List
        </MenuItem>
      </Menu>
    </Card>
  );
};
