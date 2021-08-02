import React from 'react'
import { NavLink } from 'react-router-dom'

import { Button, ButtonGroup, makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  features: {
    
  },
  signOn: {

  },
})

export const DesktopMenu = (props) => {
  const classes = useStyles()
  const { admin, user, handleLogoutClick } = props

  return (
    <>
      <ButtonGroup color="inherit" aria-label="outlined primary button group">
        <div>
          <Button component={NavLink} to="#">Tasker</Button>
          <Button component={NavLink} to="#">Calendar</Button>
          <Button component={NavLink} to="#">Pricing</Button>
          {admin &&
            <Button component={NavLink} to="#">Users</Button>
          }
        </div>
      </ButtonGroup>

      <ButtonGroup color="inherit" aria-label="outlined primary button group">
        {!user &&
          <div>
            <Button component={NavLink} to="/signup">Sign Up</Button>
            <Button component={NavLink} to="/signin">Sign In</Button>
          </div>
        }
        {user &&
          <Button component={NavLink} to="/" onClick={handleLogoutClick}>Sign Out</Button>
        }
      </ButtonGroup>
    </>
  )
}