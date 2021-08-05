import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TodayIcon from '@material-ui/icons/Today';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const MobileMenu = (props) => {
  const {admin, user, handleLogoutClick} = props

  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component={NavLink} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={NavLink} to="/tasker">
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Tasker" />
        </ListItem>
        <ListItem button component={NavLink} to="#">
          <ListItemIcon><TodayIcon /></ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        {admin && 
          <ListItem button component={NavLink} to="#">
            <ListItemIcon><PeopleAltIcon /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        }
        <ListItem button component={NavLink} to="#">
          <ListItemIcon><LocalOfferIcon /></ListItemIcon>
          <ListItemText primary="Pricing" />
        </ListItem>
        {!user &&
          <div>
            <ListItem button component={NavLink} to="/signup">
              <ListItemIcon />
              <ListItemText primary="Sign Up" />
            </ListItem>
            <ListItem button component={NavLink} to="/signin">
              <ListItemIcon />
              <ListItemText primary="Sign In" />
            </ListItem>
          </div>
        }
        {user &&
          <ListItem button onClick={handleLogoutClick}>
            <ListItemIcon />
            <ListItemText primary="Sign Out" />
          </ListItem>
        }
      </List>
    </div>
  );

  return (
    <Box>
      <Button onClick={toggleDrawer('left', true)} ><MenuIcon /></Button>
      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
        {list('left')}
      </Drawer>
    </Box>
  );
}
