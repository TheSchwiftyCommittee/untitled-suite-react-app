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
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";

import useTable from "../components/users/useTable";
import Controls from "../components/controls/Controls";
import Popup from "../components/Popup";

import getUsersAdmin from "../utils/getUsers/getUsersAdmin";
import getUsersAdminDirectors from "../utils/getUsers/getUsersAdminDirectors";
import deleteData from "../utils/deleteData";

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
  { id: "admin", label: "Administrator" },
  { id: "admin_director", label: "Lead Administrator" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Users = (props) => {
  const { admin, adminDirector } = props;

  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState("")
  const [users, setUsers] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const getUsers = async () => {
    let usersArray;
    if (admin) {
      usersArray = await getUsersAdmin();
    }
    if (adminDirector) {
      usersArray = await getUsersAdminDirectors();
    }
    console.log(usersArray)
    setUsers(usersArray);
  } 
  
  useEffect(() => {
    getUsers()
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

  const openInPopup = () => {
    setOpenPopup(true);
  };

  const adminCheck = () => {
    return admin || adminDirector ? true : false
  } 

  const updateAdmin = () => {
    
  }

  const handleClickDeleteUser = async (id) => {
    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"))
    formData.append("id", localStorage.getItem("user"))
    formData.append("user_id", id)

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      data: formData
    };
    try {
      let data;
      if (admin) {
        data = await deleteData("/admins/delete_user", config)
      }
      if (adminDirector) {
        data = await deleteData("/admin_directors/delete_user", config)
      }
      console.log(data)
      setTimeout(() => {
        history.push("/tasker");
      }, 1000);
    } catch (error) {
      setErrors(error.message);
    }

  }

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
        {errors && <div style={{ color: "red" }}>{errors}</div>}
        <TblContainer>
          <TblHead />
          <TableBody>
            {users && usersAfterSortingAndPaging().map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {/* {item.id} */}
                  {item.username}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.admin ? "✅": "❌"}</TableCell>
                <TableCell>{item.admin_director ? "✅": "❌"}</TableCell>
                <TableCell>
                  {adminDirector && 
                    <Controls.ActionButton
                      onClick={() => {
                        openInPopup();
                      }}
                      >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                  }
                  {adminCheck() && 
                    <Controls.ActionButton color="error" onClick={() => handleClickDeleteUser(item.id)}>
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  }
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
