import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import styles from './App.module.css'
import SignUp from './signUp/SignUp'
import SignIn from './signIn/SignIn'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <SignIn />
      </div>
    )
  }
}

export default hot(module)(App)
