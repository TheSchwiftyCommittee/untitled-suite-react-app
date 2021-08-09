import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";

import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import Popup from "../components/Popup";
import getData from "../utils/getData";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    width: '80%',
    maxWidth: '100ch',
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "username", label: "Employee Username" },
  { id: "email", label: "Email Address" },
  { id: "admin", label: "Adminstrator" },
  { id: "admin_director", label: "Lead Administrator" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const getUsers = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      params: {
        username: localStorage.getItem("username"),
        id: localStorage.getItem("user"),
      },
    };

    const data = await getData("/admins/user_index", config);
    console.log(data);
    let usersArray = await data;
    setUsers(usersArray);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const { 
    TblContainer, 
    TblHead, 
    TblPagination, 
    usersAfterSortingAndPaging
  } = useTable(users, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((item) =>
            item.username.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const openInPopup = (item) => {
    setOpenPopup(true);
  };

  return (
    <>
      <Paper className={classes.paper} elevation={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Toolbar>
          <Controls.Input
            label="Search Employee Usernames"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {usersAfterSortingAndPaging().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.admin ? "✅": "❌"}</TableCell>
                <TableCell>{item.admin_director ? "✅": "❌"}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton color="error">
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Set Admin"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></Popup>
    </>
  );
};

export default withRouter(Users);
