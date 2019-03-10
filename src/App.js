import React, {useEffect, useState} from 'react'
import { Router } from '@reach/router'
import styles from './App.module.css'
import SignUp from './signUp/SignUp'
import SignIn from './signIn/SignIn'
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
        <SignIn path="signin"  />
        <SignUp path="signup" />
      </Router>
    ) : ( <div className={styles.load_container}> <div className={styles.loader}></div> </div>)
 
}

