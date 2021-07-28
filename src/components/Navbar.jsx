import React from 'react';
import {NavLink} from "react-router-dom";

export const Navbar = (props) => {

  const {admin, user} = props

  return (
    <>
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <NavLink to="/" style={{color: "white"}}>Home</NavLink>
            </li>
            <li>
              <NavLink to="#" style={{color: "white"}}>Tasker</NavLink>
            </li>
            <li>
              <NavLink to="#" style={{color: "white"}}>Calendar</NavLink>
            </li>
            <li>
              <NavLink to="#" style={{color: "white"}}>Pricing</NavLink>
            </li>
            {admin && 
              <li>
                <NavLink to="#" style={{color: "white"}}>Users</NavLink>
              </li>
            }
            {!user &&
              <div>
                <li>
                  <NavLink to="/signup" style={{color: "white"}}>Sign Up</NavLink>
                </li>
                <li>
                  <NavLink to="/signin" style={{color: "white"}}>Sign In</NavLink>
                </li>
              </div>
            }
            {user &&
              <li>
              <NavLink to="/" style={{color: "white"}}>Sign Out</NavLink>
              </li>
            }
          </ul>
        </nav>
      </header>
    </>
  )
}