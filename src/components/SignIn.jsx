import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

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
    <div>
      <h1>Sign In</h1>
      {loginErrors && <div style={{ color: "red"}} >{loginErrors}</div>}
      {loading && <h2>Loading ... </h2> }
      <form onSubmit={signIn} autoComplete="off">
       <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel required htmlFor="filled-adornment-username">Username</InputLabel>
          <FilledInput
            required
            id="filled-adornment-username"
            type='text'
            value={values.username}
            onChange={handleChange('username')}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel required htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            required
            id="filled-adornment-password"
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
        <input type="submit" value="Sign In" />
        <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
          <input type="button" value="Sign Up" />
        </Link>
      </form>
    </div>
  )
}

