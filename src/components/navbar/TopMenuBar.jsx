import React from 'react';
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export const TopMenuBar = (props) => {
  const { admin } = props;

  return (
    <>
      <Button component={NavLink} to="/tasker">Tasker</Button>
      <Button component={NavLink} to="#">Calendar</Button>
      <Button component={NavLink} to="#">Pricing</Button>
      {admin &&
        <Button component={NavLink} to="#">Users</Button>
      }
    </>
  )
}
