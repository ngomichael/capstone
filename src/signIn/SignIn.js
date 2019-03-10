import React, { useState } from 'react'
import { Link, Redirect } from '@reach/router'
import styles from './SignIn.module.css'
import firebase from '../Firebase/firebase'


const SignIn = props => {
  // These are state hooks - https://reactjs.org/docs/hooks-state.html
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loggedIn, SetLoggedIn] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function login() {
    try {
      await firebase.login(email, password);
      SetLoggedIn(true);
    } catch(error) {
      alert(error.message);
    }
  }

  return (
    <div className={styles.container}>
    <div className={styles.image}>
    Image Placeholder
    </div>
    <div className={styles.content}>
    { (loggedIn) ? <Redirect noThrow to='/confirmation' from='/' /> : null}
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
        <button type='button' className={styles.button} onClick={login} >Log In</button>
      </form>
      <Link to="signup">Sign Up</Link>
      </div>
    </div>
  )

  

}

export default SignIn
