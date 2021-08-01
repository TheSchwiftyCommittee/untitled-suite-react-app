import React from 'react';
import { NavLink } from "react-router-dom";
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Hamburger } from './Hamburger';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navbar = (props) => {
  const { admin, setAdmin, user, setUser } = props
  const classes = useStyles();

  const handleLogoutClick = () => {
    setUser(false)
    setAdmin(false)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Hamburger admin={admin} user={user} handleLogoutClick={handleLogoutClick}/>
          <Typography variant="h6" className={classes.title}>
            {'<Untitled Suite/>'}
          </Typography>
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <NavLink to="/" style={{color: "white"}}>Home</NavLink>
            </li>
            <li>
              <NavLink to="#" style={{color: "white"}}>Tasker</NavLink>
            </li>
            <li>
              <NavLink to="#" style={{color: "white"}}>Calendar</NavLink>
            </li>
            <li>
              <NavLink to="#" style={{color: "white"}}>Pricing</NavLink>
            </li>
            {admin &&
              <li>
                <NavLink to="#" style={{color: "white"}}>Users</NavLink>
              </li>
            }
            {!user &&
              <>
                <li>
                  <NavLink to="/signup" style={{color: "white"}}>Sign Up</NavLink>
                </li>
                <li>
                  <NavLink to="/signin" style={{color: "white"}}>Sign In</NavLink>
                </li>
              </>
            }
            {user &&
              <button onClick={handleLogoutClick} >Sign Out</button>
            }
          </ul>
        </nav>
      </header>
    </>
  )
}