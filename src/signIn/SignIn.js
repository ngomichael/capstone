import React, { useState } from 'react'
import { Link, redirectTo } from '@reach/router'
import styles from './SignIn.module.css'
import firebase from '../Firebase/firebase'


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
          onChange={(e) => handleEmailChange(e)}
        />
        <input
          className={styles.input}
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => handlePasswordChange(e)}
        />
        <button className={styles.button} onClick={login} >Log In</button>
      </form>
      <Link to="signup">Sign Up</Link>
    </div>
  )

  async function login() {
    try {
      await firebase.login(email, password)
      redirectTo('/')
    } catch(error) {
      alert(error.message)
    }
  }
}

export default SignIn
