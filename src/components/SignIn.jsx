import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'

import { USuiteApi } from "../api/USuiteApi";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem 0rem',
  },
  btn: {
    marginTop: '1rem',
  },
}));

export const SignIn = (props) => {
  const { setAdmin, setUser } = props
  const [loading, setLoading] = useState(false)
  const [loginErrors, setLoginErrors] = useState("")
  const history = useHistory()

  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoginErrors("")

    try {
      const { data } = await USuiteApi.post("/users/login", {
        "username": values.username,
        "password": values.password
      })
      localStorage.setItem('jwt', data.token)

      if (data.user.admin === true) {
        setAdmin(true)
      }
      setUser(true)
      setLoading(false)

      setTimeout(() => {
        history.push("/")
      }, 2000);
      
    } catch (error) {
      setLoginErrors(error.error)
      setLoading(false)
    }
  }

  return (
    <Paper className={classes.paper} elevation={5}>
      <h1>Sign In</h1>
      {loginErrors && <div style={{ color: "red"}} >{loginErrors}</div>}
      {loading && <h2>Loading ... </h2> }
      <Grid container className={classes.container}>
        <form onSubmit={signIn} autoComplete="off">
          <Grid item>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
              <InputLabel required htmlFor="filled-adornment-username" color="secondary">Username</InputLabel>
              <FilledInput
                required
                id="filled-adornment-username"
                color="secondary"
                type='text'
                value={values.username}
                onChange={handleChange('username')}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
              <InputLabel required htmlFor="filled-adornment-password" color="secondary">Password</InputLabel>
              <FilledInput
                required
                id="filled-adornment-password"
                color="secondary"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Grid item >
              <Button className={classes.btn} type="submit" variant="contained" color="secondary" >Sign In</Button>
            </Grid>
            <Grid item>
              <Button className={classes.btn} variant="contained" color="secondary" component={NavLink} to="/signup">Sign Up</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  )
}

