import React, { useState } from 'react'
import { Link, Redirect } from '@reach/router'
import firebase from '../firebase/firebase'
import styles from './sign-up.module.css'
import { Button, TYPES, SIZES } from '../common/button'

export const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [createdAccount, setCreatedAccount] = useState(false)

  function handleFirstNameChange(e) {
    setFirstName(e.target.value)
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleZipcodeChange(e) {
    setZipcode(e.target.value)
  }

  async function handleSignUp() {
    try {
      await firebase.register(name, email, password)
      await firebase.addInformation(
        firstName,
        lastName,
        password,
        email,
        zipcode
      )
      setCreatedAccount(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Create your PearCare Account</p>
      <p className={styles.description}>
        Before you start searching, please create an account! It only takes a
        few seconds and will help us save your information for next time!
      </p>
      <form className={styles.form}>
        <input
          className={styles.input}
          value={firstName}
          type="text"
          placeholder="First Name"
          onChange={handleFirstNameChange}
        />
        <input
          className={styles.input}
          value={lastName}
          type="text"
          placeholder="Last Name"
          onChange={handleLastNameChange}
        />
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
        <input
          className={styles.input}
          value={zipcode}
          type="text"
          placeholder="Zipcode"
          onChange={handleZipcodeChange}
        />
        <Button
          type="button"
          buttonType={TYPES.PRIMARY}
          buttonSize={SIZES.MEDIUM}
          onClick={handleSignUp}
        >
          Create Account
        </Button>
      </form>
      {createdAccount ? <Redirect noThrow to="/getStarted" /> : null}
      <Link to="/">Sign In</Link>
    </div>
  )
}
