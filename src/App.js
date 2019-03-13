import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import styles from './App.module.css'
import SignUp from './signUp/SignUp'
import SignIn from './signIn/SignIn'
import Home from './home/Home'
import Questionnaire from './questionnaire/Questionnaire'
import Results from './results/Results'

class App extends Component {
  render() {
    return (
      <Router>
        <Results path="/" />
        <Questionnaire path="/questionnaire" />
        {/* <Home path="/" /> */}
        <SignUp path="signup" />
      </Router>
    )
  }
}

export default hot(module)(App)
