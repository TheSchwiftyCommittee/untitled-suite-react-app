import React from 'react';
import { NavLink } from 'react-router-dom'

export const Home = (props) => {
  const { user, setUser } = props

  const handleLogoutClick = () => {
    setUser(false)
  }

  return (
    <>
      <div style={{width: "50%"}}>
        <h1>Untitled Suite</h1>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, impedit commodi ea, est quas asperiores nam quisquam, ipsam tempora modi voluptates sit quibusdam tenetur maiores. Sapiente consequatur sequi fuga doloribus rerum! Laudantium ipsum ipsam nostrum voluptatibus temporibus, quae culpa dolorem, pariatur nesciunt quos asperiores explicabo quidem ad ducimus. Cumque, veniam.</p>
      
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
          <button onClick={handleLogoutClick} >Sign Out</button>
        }
      </div>
    </>
  )
}

