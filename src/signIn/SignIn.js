import React, { useState } from 'react'
import { Link } from '@reach/router'
import styles from './SignIn.module.css'

const SignIn = props => {
  // These are state hooks - https://reactjs.org/docs/hooks-state.html
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Log into your PearCare Account</p>
      <form className={styles.form}>
        <input
          className={styles.input}
          value={email}
          type="text"
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <input
          className={styles.input}
          value={password}
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <button className={styles.button}>Log In</button>
      </form>
      <Link to="/signup">Sign Up</Link>
    </div>
  )
}

export default SignIn
