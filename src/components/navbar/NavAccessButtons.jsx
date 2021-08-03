import React from 'react';
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export const AccessButtons = () => {
  return (
    <>
      <Button component={NavLink} to="/signup">Sign Up</Button>
      <Button component={NavLink} to="/signin">Sign In</Button>
    </>
  )
}