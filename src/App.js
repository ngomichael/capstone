import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import styles from './App.module.css'
import SignUp from './signUp/SignUp'
import SignIn from './signIn/SignIn'

class App extends Component {
  render() {
    return (
      <Router className={styles.app}>
        <SignIn path="/" />
        <SignUp path="/signup" />
      </Router>
    )
  }
}

export default hot(module)(App)
