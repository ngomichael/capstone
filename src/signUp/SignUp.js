import React, { useState } from 'react'
import { Link } from '@reach/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import styles from './SignUp.module.css'

const SignUp = props => {
  // These are state hooks - https://reactjs.org/docs/hooks-state.html
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [email, setEmail] = useState(props.email)
  const [password, setPassword] = useState(props.password)
  const [zipcode, setZipcode] = useState(props.zipCode)
  const [user, setUser] = useState(props.user)

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
  //Method for someone signing up
  function handleSignUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log('user created')
      })
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
          onChange={ handleEmailChange}
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
        <button
          className={styles.button}
          onClick={ handleSignUp }
        >
          Create Account
        </button>
      </form>
      <Link to="/">Sign In</Link>
    </div>
  )
}

export default SignUp
