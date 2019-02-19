import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import {config} from './Authentication/config.js'

  // Initialize Firebase
firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'))

