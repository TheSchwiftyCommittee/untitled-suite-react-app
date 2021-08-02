import React from 'react';
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  paper: {
    width: '80%',
    maxWidth: '100ch',
    padding: '1rem',
  },
  btncontainer: {
    margin: '1rem 0rem',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    },
  },
  btn: {
    marginTop: '1rem',
  },
}));

export const Home = (props) => {
  const { user, setUser } = props

  const classes = useStyles();

  const handleLogoutClick = () => {
    setUser(false)
  }

  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography variant="h3" component="h1" gutterBottom>{"<Untitled Suite/>"}</Typography>
      <Typography variant="h4" component="h2" gutterBottom>Lorem ipsum dolor sit amet.</Typography>
      <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, impedit commodi ea, est quas asperiores nam quisquam, ipsam tempora modi voluptates sit quibusdam tenetur maiores. Sapiente consequatur sequi fuga doloribus rerum! Laudantium ipsum ipsam nostrum voluptatibus temporibus, quae culpa dolorem, pariatur nesciunt quos asperiores explicabo quidem ad ducimus. Cumque, veniam.</Typography>
    
      {!user &&
        <Grid container className={classes.btncontainer}>
          <Grid item sm={6}>
            <Button className={classes.btn} variant="contained" color="secondary" size="large" component={NavLink} to="/signup">Sign Up</Button>
          </Grid>
          <Grid item sm={6}>
            <Button className={classes.btn} variant="contained" color="secondary" size="large" component={NavLink} to="/signin">Sign In</Button>
          </Grid>
        </Grid>
      }
      {user &&
        <button onClick={handleLogoutClick} >Sign Out</button>
      }
    </Paper>
  )
}

