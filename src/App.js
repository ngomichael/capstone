import React, {useEffect, useState} from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import styles from './App.module.css'
import SignUp from './signUp/SignUp'
import SignIn from './signIn/SignIn'
import Confirmation from './confirmation/Confirmation'
import firebase from './Firebase/firebase'


export default function App() {
 const[firebaseInitialized, setFirebaseInitialized] = useState(false)

 useEffect(() => {
   firebase.isInitialized().then(val => {
        setFirebaseInitialized(val)
   })
 })
  
    return firebaseInitialized !== false ? (
      <Router className={styles.app}>
        <SignIn path="/"  />
        <SignUp path="signup" />
        <Confirmation path='confirmation' email={firebase.getCurrentEmail()}/>
      </Router>
    ) : <div id='loader'> LOADING </div>
 
}

