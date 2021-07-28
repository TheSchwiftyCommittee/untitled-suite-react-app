import React from 'react';
import { Link } from 'react-router-dom'

export const SignIn = () => {
  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <label>
          Username/Email:
          <input type="text" placeholder="Enter Username or Email" />
        </label>
        <label>
          Password:
          <input type="text" name="password" placeholder="Enter Password" />
        </label>
        <input type="submit" value="Sign In" />
        <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
          <input type="button" value="Sign Up" />
        </Link>
      </form>
    </div>
  )
}

