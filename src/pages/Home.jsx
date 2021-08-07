import React from 'react';
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    width: '80%',
    maxWidth: '100ch',
    padding: theme.spacing(3),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
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
  const { user } = props

  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Container maxWidth="sm" component="div" className={classes.heroContent}>
        <Typography variant="h3" component="h1" gutterBottom>{"<Untitled Suite/>"}</Typography>
        <Typography variant="h4" component="h2" gutterBottom>Lorem ipsum dolor sit amet.</Typography>
        <Typography 
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
          >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, impedit commodi ea, est quas asperiores nam quisquam, 
          ipsam tempora modi voluptates sit quibusdam tenetur maiores. Sapiente consequatur sequi fuga doloribus rerum! 
          Laudantium ipsum ipsam nostrum voluptatibus temporibus, quae culpa dolorem, pariatur nesciunt quos asperiores explicabo quidem ad ducimus. Cumque, veniam.
        </Typography>
      </Container>
    
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
    </Paper>
  )
}

