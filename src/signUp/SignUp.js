import React, { useState } from 'react'
import { Link, redirectTo} from '@reach/router'
import styles from './SignUp.module.css'
import firebase from '../Firebase/firebase'



const SignUp = props => {
  // These are state hooks - https://reactjs.org/docs/hooks-state.html
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [zipcode, setZipcode] = useState('')

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
          onChange={(e) => handleFirstNameChange(e)}
        />
        <input
          className={styles.input}
          value={lastName}
          type="text"
          placeholder="Last Name"
          onChange={e => handleLastNameChange(e)}
        />
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
        <input
          className={styles.input}
          value={zipcode}
          type="text"
          placeholder="Zipcode"
          onChange={(e) => handleZipcodeChange(e)}
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

  //Method for someone signing up
  async function handleSignUp() {
    try {
      await firebase.register(name, email, password)
      await firebase.addFirstName(firstName)
      await firebase.addLastName(lastName)
      await firebase.addPassword(password)
      await firebase.addEmail(email)
      await firebase.addZipCode(zipCode)
      redirectTo('/')
    } catch(error) {
      alert(error.message)
    }

  }
}

export default SignUp
