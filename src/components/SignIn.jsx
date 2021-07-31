import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { USuiteApi } from "../api/USuiteApi";

export const SignIn = (props) => {
  const { setAdmin, setUser } = props

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const history = useHistory()

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    try {
      const { data } = await USuiteApi.post("/users/login", {
        username,
        password
      })
      localStorage.setItem('jwt', data.jwt)

      if (data.user.admin === true) {
        setAdmin(true)
      }
      setUser(true)
      setLoading(false)

      setTimeout(() => {
        history.push("/")
      }, 2000);
      
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      {errorMessage && <div style={{ color: "red"}} >{errorMessage}</div>}
      {loading && <h2>Loading ... </h2> }
      <form onSubmit={signIn}>
        <label>
          Username:
          <input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} value={username} />
        </label>
        <label>
          Password:
          <input type="text" name="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        </label>
        <input type="submit" value="Sign In" />
        <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
          <input type="button" value="Sign Up" />
        </Link>
      </form>
    </div>
  )
}

