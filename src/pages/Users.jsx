import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

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
import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";

import useTable from "../components/users/useTable";
import Controls from "../components/controls/Controls";
import AdminButtons from "../components/users/AdminButtons";

import getUsersAdmin from "../utils/getUsers/getUsersAdmin";
import getUsersAdminDirectors from "../utils/getUsers/getUsersAdminDirectors";
import deleteData from "../utils/deleteData";
import putData from "../utils/putData";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    width: "80%",
    maxWidth: "100ch",
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
  { id: "admin", label: "Administrator" },
  { id: "admin_director", label: "Lead Administrator" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Users = (props) => {
  const { admin, adminDirector } = props;

  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const [users, setUsers] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const getUsers = async () => {
    let usersArray;
    if (admin) {
      usersArray = await getUsersAdmin();
    }
    if (adminDirector) {
      usersArray = await getUsersAdminDirectors();
    }
    console.log(usersArray);
    setUsers(usersArray);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const { TblContainer, TblHead, TblPagination, usersAfterSortingAndPaging } =
    useTable(users, headCells, filterFn);

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

  const handleClickDeleteUser = async (id) => {
    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("id", localStorage.getItem("user"));
    formData.append("user_id", id);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: formData,
    };
    try {
      let data;
      if (admin) {
        data = await deleteData("/admins/delete_user", config);
      }
      if (adminDirector) {
        data = await deleteData("/admin_directors/delete_user", config);
      }
      console.log(data);
      setTimeout(() => {
        history.push("/tasker");
        history.push("/users");
      }, 100);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleClickDeleteAdmin = async (id) => {
    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("id", localStorage.getItem("user"));
    formData.append("user_id", id);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: formData,
    };
    try {
      const data = await deleteData("/admin_directors/delete_admin", config);
      console.log(data);
      setTimeout(() => {
        history.push("/tasker");
        history.push("/users");
      }, 100);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleClickAssign = async (id) => {
    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("id", localStorage.getItem("user"));
    formData.append("user_id", id);

    try {
      const data = await putData("/admin_directors/assign_admin", formData);
      console.log(data);
      setTimeout(() => {
        history.push("/tasker");
        history.push("/users");
      }, 1000);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleClickUnassign = async (id) => {
    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("id", localStorage.getItem("user"));
    formData.append("user_id", id);

    try {
      const data = await putData("/admin_directors/unassign_admin", formData);
      console.log(data);
      setTimeout(() => {
        history.push("/tasker");
        history.push("/users");
      }, 1000);
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <>
      <Paper className={classes.paper} elevation={5}>
        <Typography data-testid="title" variant="h4" component="h1" gutterBottom>
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
        {errors && <div style={{ color: "red" }}>{errors}</div>}
        <TblContainer>
          <TblHead />
          <TableBody>
            {users &&
              usersAfterSortingAndPaging().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {/* {item.id} */}
                    {item.username}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.admin ? "✅" : "❌"}</TableCell>
                  <TableCell>{item.admin_director ? "✅" : "❌"}</TableCell>
                  <TableCell>
                    {adminDirector && item.admin && <AdminButtons handleDelete={handleClickDeleteAdmin} handleUpdate={handleClickUnassign} id={item.id} admin={item.admin} />}
                    {adminDirector && !item.admin && <AdminButtons handleDelete={handleClickDeleteUser} handleUpdate={handleClickAssign} id={item.id} admin={item.admin}/>}
                    {admin && (
                      <Controls.ActionButton
                        color="error"
                        onClick={() => handleClickDeleteUser(item.id)}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
};

export default withRouter(Users);
