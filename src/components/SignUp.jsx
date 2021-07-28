import React from 'react';
import { Link } from 'react-router-dom'


export const SignUp = () => {
  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <form>
          <label>
            Username :
            <input type="text" name="username" placeholder="Enter Username" />
          </label>
          <label>
            Email:
            <input type="text" name="email" placeholder="Enter Email" />
          </label>
          <label>
            New Password:
            <input type="text" name="email" placeholder="Enter Password" />
          </label>
          <label>
            Password Confirmation:
            <input type="text" name="email" placeholder="Confirm Password" />
          </label>
          <input type="submit" value="Sign Up" />
          <Link to="/signin" style={{ color: "white", textDecoration: "none" }}>
            <input type="button" value="Sign In" />
          </Link>
        </form>
      </div>
    </>
  )
}

