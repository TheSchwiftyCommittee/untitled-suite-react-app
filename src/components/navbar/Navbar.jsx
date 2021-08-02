import React from 'react';
import { useViewport } from '../viewport/ViewportProvider';
import { NavLink } from "react-router-dom";
import { AppBar, Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textDecoration: 'none',
    color: 'inherit'
  },
}));

export const Navbar = (props) => {
  const { width } = useViewport();
  const breakpoint = 640;

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
          <Box display="flex" flexGrow="1" justifyContent="space-between" m={1} p={1}>
            {width < breakpoint && <MobileMenu admin={admin} user={user} handleLogoutClick={handleLogoutClick}/>}
            <Typography variant="h6" className={classes.title} component={NavLink} to="/">
              {'<Untitled Suite/>'}
            </Typography>
            {width > breakpoint && <DesktopMenu admin={admin} user={user} handleLogoutClick={handleLogoutClick}/>}     
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}