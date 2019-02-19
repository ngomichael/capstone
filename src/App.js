import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import styles from './App.module.css'
import SignUp from './signUp/SignUp'
import SignIn from './signIn/SignIn'
import firebase from 'firebase/app';
import 'firebase/auth';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      email: '',
      password: '',
      username: '',
      errorMessage: '',
    }
  }

  ComponentDidMount() {
    //Listen for authentication state change
    firebase.auth().onAuthStateChanged(user => {
      if (user) { //if there is user, set state of user
        this.setState({
          user: user,
          email:"",
          password:"",
          username:"",
          firstName:"",
          lastName:"",
          zipCode:"",

        })
      } else {
        this.setState({user:null });
      }
    })
  }

  render() {
    return (
      <Router className={styles.app}>
        <SignIn path="/" user={this.state.user} email={this.state.email} password={this.state.password} />
        <SignUp path="signup" user={this.state.user} email={this.state.email} password={this.state.password} firstName={this.state.firstName} lastName={this.state.lastName} username={this.state.username} zipCode={this.state.zipCode} />
      </Router>
    )
  }
}

export default hot(module)(App)
