import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { USuiteApi } from '../api/USuiteApi';

export const SignUp = (props) => {
  const { setAdmin, setUser } = props

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [registrationErrors, setRegistrationErrors] = useState("")

  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setRegistrationErrors("")

    try {
      const { data } = await USuiteApi.post("/users/users", {
        username,
        email,
        password,
        "password_confirmation": passwordConfirmation
      })
      localStorage.getItem('jwt', data.token)
      if (data.user.admin === true) {
        setAdmin(true)
      }
      setUser(true)
      setLoading(false)

      setTimeout(() => {
        history.push("/")
      }, 2000);
    } catch (error) {
      setRegistrationErrors(error.message)
      setLoading(false)
    }

  }

  return (
    <>
      <div>
        <h1>Sign Up</h1>
        {registrationErrors && <div style={{ color: "red"}} >{registrationErrors}</div>}
        {loading && <h2>Loading ... </h2> }
        <form onSubmit={handleOnSubmit} >
          <label>
            Username:
            <input type="text" name="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            New Password:
            <input type="password" name="email" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Password Confirmation:
            <input type="password" name="email" placeholder="Confirm Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
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

