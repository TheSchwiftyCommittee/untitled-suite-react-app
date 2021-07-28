import React from 'react';
import {Link} from "react-router-dom";

export const Navbar = () => {

  return (
    <>
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#">Tasker</Link>
            </li>
            <li>
              <Link to="#">Calendar</Link>
            </li>
            <li>
              <Link to="#">Pricing</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}