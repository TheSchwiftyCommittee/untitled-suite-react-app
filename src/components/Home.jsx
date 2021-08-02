import React from 'react';
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
    width: '70%',
    maxWidth: '70ch',
    padding: '1rem',
  },
  container: {
    margin: '1rem 0rem',
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
      <h1>Untitled Suite</h1>
      <h2>Lorem ipsum dolor sit amet.</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, impedit commodi ea, est quas asperiores nam quisquam, ipsam tempora modi voluptates sit quibusdam tenetur maiores. Sapiente consequatur sequi fuga doloribus rerum! Laudantium ipsum ipsam nostrum voluptatibus temporibus, quae culpa dolorem, pariatur nesciunt quos asperiores explicabo quidem ad ducimus. Cumque, veniam.</p>
    
      {!user &&
        <Grid container className={classes.container}>
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

