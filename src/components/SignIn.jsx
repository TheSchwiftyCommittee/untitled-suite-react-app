import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { USuiteApi } from "../api/USuiteApi";

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const history = useHistory()

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    try {
      const { data } = await USuiteApi.post("/users/sign_in", {
        email,
        password,
      })
      localStorage.setItem('jwt', data.jwt)
      history.push("/")
      setLoading(false)
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
          Email:
          <input type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
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

