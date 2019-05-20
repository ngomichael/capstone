import React, { useState } from 'react'
import { Link, Redirect } from '@reach/router'
import styles from './sign-in.module.css'
import { Button, TYPES, SIZES } from '../common/button'
import firebase from '../firebase/firebase'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false)

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  async function handleSignIn() {
    try {
      await firebase.signIn(email, password)
      setIsSignedIn(true)
      return <Redirect noThrow to="/getStarted" />
    } catch (err) {
      console.error(err)
    }
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
        <Button
          type="button"
          buttonType={TYPES.PRIMARY}
          buttonSize={SIZES.MEDIUM}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </form>
      {isSignedIn ? <Redirect noThrow to="/getStarted" /> : null}

      <Link to="/signup">Sign Up</Link>
    </div>
  )
}
